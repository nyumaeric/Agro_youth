from flask import Blueprint, jsonify

api_root_bp = Blueprint('api_root', __name__)

@api_root_bp.route('/', methods=['GET'])
def index():
    return jsonify({
        'message': 'Welcome to AgroYouth API',
        'version': '1.0',
        'endpoints': {
            'auth': '/api/auth',
            'courses': '/api/courses',
            'market': '/api/market'
        }
    }), 200