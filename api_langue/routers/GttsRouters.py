from flask import Blueprint
from controllers.GttsController import send_audio


gtts_bp = Blueprint('gtts', __name__)

gtts_bp.route('/', strict_slashes=False, methods=['POST'])(send_audio)

