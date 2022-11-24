import axios from 'axios';

const API_URL = process.env.VUE_APP_API ;


export class TextBlopService {
    detectLangue(texte) {
        return axios
            .post(API_URL + '/detectlanguage', {
                texte: texte,
            })
            .then(response => {
                return response.data
            });
    }
}

export default new TextBlopService();
