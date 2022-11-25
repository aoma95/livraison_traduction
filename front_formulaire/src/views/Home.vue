<template>
    <v-layout row justify-center="">
        <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Information
        </v-card-title>
        <v-card-text>{{text_info}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
        <v-container fluid>
            <v-container mt-1>
                <h1 class="title"><b>Translated text to speech</b></h1>
            </v-container>
                <v-layout row justify-space-around="">
                    <v-flex xs8 md4>
                        <v-text-field label="langue détecté" v-model="label_lang_detecte.name" disabled>langue détecté</v-text-field>
                        <span>{{ text_init.length }} / 1000</span>
                        <v-textarea
                            name="input-7-1"
                            maxlength="1000"
                            clear-icon="mdi-close-circle"
                            filled
                            color="black"
                            label="Texte à traduire"
                            auto-grow
                            v-on:keydown="inputKeydown"
                            v-model="text_init"
                            text
                        ></v-textarea>
                        
                    </v-flex>
                    <v-flex xs8 md4 v-if="this.label_lang_detecte != ''">
                        <v-autocomplete
                            filled
                            @change="selectLang"
                            v-model="lang_to_trad"
                            return-object
                            label="Langue de traduction"
                            :items="items_lang"
                            item-text=name
                            rounded
                            solo
                        ></v-autocomplete>
                        <v-textarea
                            disabled
                            name="input-7-1"
                            filled
                            label="Texte traduit"
                            auto-grow
                            v-model="text_traduct"
                        ></v-textarea>
                        <p v-if="loading==true">Chargement audio</p>
                        <v-progress-circular
                            v-if="loading==true"
                            indeterminate
                            color="dark"
                        >
                        </v-progress-circular>
                        <vuetify-audio v-if="this.audiopreview != ''" :file=this.audiopreview color="success" :ended="audioFinish" ></vuetify-audio>
                        <v-btn v-if="this.text_traduct && this.audiodownload != ''" block @click="onClick()">DownLoad MP3</v-btn>
                    </v-flex>
                </v-layout>
        </v-container>
    </v-layout>

    
    
</template>

<script>
    import axios from 'axios';
    import { TextBlopService } from '../services/detectlangue'
    import { translangueService } from '../services/translangue'
    import dotenv from 'dotenv'

    dotenv.config()
    export default {
        components: {
        VuetifyAudio: () => import('vuetify-audio'),
    },
        data(){
          return{
            dialog:false,
            loading:false,
            text_info:"",
            audiopreview:"",
            audiodownload:"",
            lang_to_trad:"",
            text_traduct:'',
            textblop: new TextBlopService(),
            traduction_langue: new translangueService(),
            label_lang_detecte:"",
            text_init: "",
            items_lang: [{'code': 'af', 'name': 'afrikaans'}, {'code': 'sq', 'name': 'albanian'}, {'code': 'am', 'name': 'amharic'}, {'code': 'ar', 'name': 'arabic'}, {'code': 'hy', 'name': 'armenian'}, {'code': 'az', 'name': 'azerbaijani'}, {'code': 'eu', 'name': 'basque'}, {'code': 'be', 'name': 'belarusian'}, {'code': 'bn', 'name': 'bengali'}, {'code': 'bs', 'name': 'bosnian'}, {'code': 'bg', 'name': 'bulgarian'}, {'code': 'ca', 'name': 'catalan'}, {'code': 'ceb', 'name': 'cebuano'}, {'code': 'ny', 'name': 'chichewa'}, {'code': 'zh-cn', 'name': 'chinese (simplified)'}, {'code': 'zh-tw', 'name': 'chinese (traditional)'}, {'code': 'co', 'name': 'corsican'}, {'code': 'hr', 'name': 'croatian'}, {'code': 'cs', 'name': 'czech'}, {'code': 'da', 'name': 'danish'}, {'code': 'nl', 'name': 'dutch'}, {'code': 'en', 'name': 'english'}, {'code': 'eo', 'name': 'esperanto'}, {'code': 'et', 'name': 'estonian'}, {'code': 'tl', 'name': 'filipino'}, {'code': 'fi', 'name': 'finnish'}, {'code': 'fr', 'name': 'french'}, {'code': 'fy', 'name': 'frisian'}, {'code': 'gl', 'name': 'galician'}, {'code': 'ka', 'name': 'georgian'}, {'code': 'de', 'name': 'german'}, {'code': 'el', 'name': 'greek'}, {'code': 'gu', 'name': 'gujarati'}, {'code': 'ht', 'name': 'haitian creole'}, {'code': 'ha', 'name': 'hausa'}, {'code': 'haw', 'name': 'hawaiian'}, {'code': 'iw', 'name': 'hebrew'}, {'code': 'he', 'name': 'hebrew'}, {'code': 'hi', 'name': 'hindi'}, {'code': 'hmn', 'name': 'hmong'}, {'code': 'hu', 'name': 'hungarian'}, {'code': 'is', 'name': 'icelandic'}, {'code': 'ig', 'name': 'igbo'}, {'code': 'id', 'name': 'indonesian'}, {'code': 'ga', 'name': 'irish'}, {'code': 'it', 'name': 'italian'}, {'code': 'ja', 'name': 'japanese'}, {'code': 'jw', 'name': 'javanese'}, {'code': 'kn', 'name': 'kannada'}, {'code': 'kk', 'name': 'kazakh'}, {'code': 'km', 'name': 'khmer'}, {'code': 'ko', 'name': 'korean'}, {'code': 'ku', 'name': 'kurdish (kurmanji)'}, {'code': 'ky', 'name': 'kyrgyz'}, {'code': 'lo', 'name': 'lao'}, {'code': 'la', 'name': 'latin'}, {'code': 'lv', 'name': 'latvian'}, {'code': 'lt', 'name': 'lithuanian'}, {'code': 'lb', 'name': 'luxembourgish'}, {'code': 'mk', 'name': 'macedonian'}, {'code': 'mg', 'name': 'malagasy'}, {'code': 'ms', 'name': 'malay'}, {'code': 'ml', 'name': 'malayalam'}, {'code': 'mt', 'name': 'maltese'}, {'code': 'mi', 'name': 'maori'}, {'code': 'mr', 'name': 'marathi'}, {'code': 'mn', 'name': 'mongolian'}, {'code': 'my', 'name': 'myanmar (burmese)'}, {'code': 'ne', 'name': 'nepali'}, {'code': 'no', 'name': 'norwegian'}, {'code': 'or', 'name': 'odia'}, {'code': 'ps', 'name': 'pashto'}, {'code': 'fa', 'name': 'persian'}, {'code': 'pl', 'name': 'polish'}, {'code': 'pt', 'name': 'portuguese'}, {'code': 'pa', 'name': 'punjabi'}, {'code': 'ro', 'name': 'romanian'}, {'code': 'ru', 'name': 'russian'}, {'code': 'sm', 'name': 'samoan'}, {'code': 'gd', 'name': 'scots gaelic'}, {'code': 'sr', 'name': 'serbian'}, {'code': 'st', 'name': 'sesotho'}, {'code': 'sn', 'name': 'shona'}, {'code': 'sd', 'name': 'sindhi'}, {'code': 'si', 'name': 'sinhala'}, {'code': 'sk', 'name': 'slovak'}, {'code': 'sl', 'name': 'slovenian'}, {'code': 'so', 'name': 'somali'}, {'code': 'es', 'name': 'spanish'}, {'code': 'su', 'name': 'sundanese'}, {'code': 'sw', 'name': 'swahili'}, {'code': 'sv', 'name': 'swedish'}, {'code': 'tg', 'name': 'tajik'}, {'code': 'ta', 'name': 'tamil'}, {'code': 'te', 'name': 'telugu'}, {'code': 'th', 'name': 'thai'}, {'code': 'tr', 'name': 'turkish'}, {'code': 'uk', 'name': 'ukrainian'}, {'code': 'ur', 'name': 'urdu'}, {'code': 'ug', 'name': 'uyghur'}, {'code': 'uz', 'name': 'uzbek'}, {'code': 'vi', 'name': 'vietnamese'}, {'code': 'cy', 'name': 'welsh'}, {'code': 'xh', 'name': 'xhosa'}, {'code': 'yi', 'name': 'yiddish'}, {'code': 'yo', 'name': 'yoruba'}, {'code': 'zu', 'name': 'zulu'}],
          }
        },
        methods : {
            onClick() {
                    var fileLink = document.createElement('a');
                    fileLink.href = this.audiodownload;
                    fileLink.setAttribute('download', 'audio.mp3');
                    document.body.appendChild(fileLink);   
                    fileLink.click();
            },
            inputKeydown() {
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                this.timer = setTimeout(() => {
                    if(this.text_init!="") {
                        this.textblop.detectLangue(this.text_init).then(response => {
                            if(!response.error){
                            this.label_lang_detecte=response
                            }
                            else{
                            this.label_lang_detecte=""
                            }
                        })
                    }
                    else{
                        this.label_lang_detecte=""
                        this.lang_to_trad=""
                    }
                }, 800);
            },
            selectLang(){
                this.audiodownload =""
                this.audiopreview =""
                if (this.text_init != ""){
                    this.traduction_langue.translangue(this.text_init,this.label_lang_detecte.code,this.lang_to_trad.code).then(response =>{
                        this.text_traduct=response
                        let data={
                    'language':this.lang_to_trad.code,
                    'texte':this.text_traduct
                }
                this.loading=true

                axios({
                    // url: 'http://localhost:5002/audiolangue',
                    url: process.env.VUE_APP_API + "/audiolangue",
                    method: 'POST',data
                }).then((response) => {
                    console.log(response)
                    if(response.data["mp3"]){
                    this.text_info="Audio disponible pour le "+ this.lang_to_trad.name
                    this.dialog=true
                    this.audiodownload ="data:audio/mpeg3;charset=utf-8;base64,"+response.data["mp3"]
                    this.audiopreview ="data:audio/wav;charset=utf-8;base64,"+response.data["wav"]
                    this.loading=false
                    }
                    else{
                    this.text_info="Pas d'audio disponible pour le "+ this.lang_to_trad.name
                    this.dialog=true
                    this.audiodownload =""
                    this.audiopreview =""
                    this.loading=false
                    }
                });                        
                    })
                }
            }
        }
    }
</script>
<style>

</style>
