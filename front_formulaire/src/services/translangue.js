import axios from 'axios';

const API_URL = process.env.VUE_APP_API ;


export class translangueService {
    translangue(texte,src,dest) {
        return axios
            .post(API_URL + '/tradlangue', {
                texte: texte,
                code_dest:dest,
                code_src:src
            })
            .then(response => {
                return response.data
            });
    }
}

export default new translangueService();
