from flask import Blueprint
from controllers.TextBlopController import detectLang

TextBlop_bp = Blueprint('textblop', __name__)


TextBlop_bp.route('/', strict_slashes=False, methods=['POST'])(detectLang)