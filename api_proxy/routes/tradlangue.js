const express = require('express')
const router = express.Router()
const needle = require('needle')
require('dotenv').config()

const API_PYTHON = process.env.URL_API_PYTHON + "/googletrans"

router.post('/', async (req, res) => {

        if (req.body.code_src && req.body.texte && req.body.code_dest) {
            let data_lang = {
                "code_src": req.body.code_src,
                "code_dest": req.body.code_dest,
                "texte": req.body.texte
            }
            const apiRes = await needle('post', `${API_PYTHON}`,data_lang)
            const data = apiRes.body
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Origin', '*');
            res.status(200).json(data) 
        }
        else{
            res.status(404).json( {err:"Impossible de de traduire"})
        }

})
module.exports = router
