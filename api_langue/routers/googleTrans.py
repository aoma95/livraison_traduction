from flask import Blueprint
from controllers.GoogleTransConroller import send_list_lang


googletrans_bp = Blueprint('googletrans', __name__)

googletrans_bp.route('/', strict_slashes=False, methods=['POST'])(send_list_lang)