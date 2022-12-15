import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config()

const API_URL = process.env.VUE_APP_API ;


export class translangueService {
    translangue(texte,src,dest,token) {
        return axios
            .post(API_URL + '/tradlangue', {
                texte: texte,
                code_dest:dest,
                code_src:src
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                return response.data
            });
    }
}

export default new translangueService();
