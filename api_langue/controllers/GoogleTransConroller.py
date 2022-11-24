from flask import Flask , Response, jsonify,render_template, request
import json

import googletrans


def send_list_lang():
    try:
        if request.form["code_dest"] and request.form["code_src"] and request.form["texte"]:
            try :
                translator = googletrans.Translator()
                # translator = googletrans.Translator(service_urls=['translate.googleapis.com'])
                lop = translator.translate(str(request.form["texte"]), src=str(request.form["code_src"]),dest=str(request.form["code_dest"]))
                return jsonify(lop.text),200
            except:
                return jsonify(error= "Error de tradcution"), 404
    except:
         return jsonify(error="Error argument"), 404
