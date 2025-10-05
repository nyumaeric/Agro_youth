import os
from flask import Flask, jsonify, redirect, url_for, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from app.config import config
from app.extensions import jwt

def create_app(config_name=os.getenv('FLASK_ENV', 'default')):
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    @app.before_request
    def log_request_info():
        print(f"Received {request.method} request to {request.path}")
        print(f"Headers: {dict(request.headers)}")
    app.config.from_object(config[config_name])
    
    # Initialize direct MongoDB connection
    from app import database
    database.init_app(app)
    
    jwt.init_app(app)
    
    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.knowledge import knowledge_bp
    from app.routes.market import market_bp
    from app.routes.api_root import api_root_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(knowledge_bp, url_prefix='/api/knowledge')
    app.register_blueprint(market_bp, url_prefix='/api/market')
    app.register_blueprint(api_root_bp, url_prefix='/api')
    
    # Root route
    @app.route('/')
    def index():
        return redirect(url_for('api_root.index'))
    
    # Health check route
    @app.route('/api/health')
    def health_check():
        try:
            # Check if MongoDB connection works
            db = database.get_db()
            db.command('ping')
            return jsonify({
                'status': 'healthy', 
                'message': 'Database connection successful'
            }), 200
        except Exception as e:
            return jsonify({
                'status': 'unhealthy', 
                'message': f'Database connection failed: {str(e)}'
            }), 500
        

    @app.route('/api/test-cors', methods=['GET', 'OPTIONS'])
    def test_cors():
        return jsonify({'message': 'CORS is working!'}), 200
    
    return app