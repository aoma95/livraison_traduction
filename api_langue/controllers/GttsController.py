#from flask import render_template, redirect, url_for, request, abort
from flask import Flask , Response, jsonify,render_template, request
# import json
from pydub import AudioSegment
# import subprocess
# import ffmpeg
# from pathlib import Path
# import os, sys
from gtts import gTTS
import base64
# import simpleaudio as sa




def send_audio():
    if request.method == 'POST':
        try :
            myobj = gTTS(text=request.form["texte"], lang=request.form["language"], slow=False)  
            myobj.save("file.mp3")
            sound = AudioSegment.from_mp3("file.mp3")
            sound.export("file.wav", format="wav")
            file = open("file.mp3", "rb").read()
            sound = AudioSegment.from_mp3('file.mp3')
            sound.export("file.wav", format="wav")
            binary = base64.b64encode(file)
            data_ascii = binary.decode('ascii')
            filetwo = open("file.wav", "rb").read()
            binarytwo = base64.b64encode(filetwo)
            data_asciitwo = binarytwo.decode('ascii')
            return jsonify({
                'mp3':str(data_ascii),
                'wav':str(data_asciitwo)
            }), 200
        except:
            return jsonify(error="Error with audio"), 404
            