const express = require('express')
const router = express.Router()
const needle = require('needle')
require('dotenv').config()

const API_PYTHON = process.env.URL_API_PYTHON + "/textblop"

router.post('/', async (req, res) => {
        if (req.body.texte) {
            let data_lang = {
                "texte": req.body.texte
            }
            const apiRes = await needle('post', `${API_PYTHON}`,data_lang)
            console.log(apiRes)
            const data = apiRes.body
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Origin', '*');
            res.status(200).json(data)
            
        }
        else{
            res.status(404).json( {err:"Impossible de détecter la langue"})
        }

})
module.exports = router