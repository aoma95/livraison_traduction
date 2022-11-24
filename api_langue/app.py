from flask import Flask
from flask_cors import CORS
from routers.GttsRouters import gtts_bp
from routers.TextBlobRouter import TextBlop_bp
from routers.googleTrans import googletrans_bp
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)
app.register_blueprint(gtts_bp, url_prefix='/gtts')
app.register_blueprint(TextBlop_bp, url_prefix='/textblop')
app.register_blueprint(googletrans_bp, url_prefix='/googletrans')

@app.route('/')
def index():
    return "API_Python"
if __name__ == '__main__':
    app.debug = False
    app.run(host='0.0.0.0', port=5000)