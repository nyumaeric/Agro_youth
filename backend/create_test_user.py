#!/usr/bin/env python3
"""
Script to create a test user for testing
"""
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.database import get_db
from werkzeug.security import generate_password_hash
from datetime import datetime

def create_test_user():
    """Create a test user"""
    print("Starting test user creation...")
    try:
        # Create Flask app context
        print("Creating Flask app...")
        app = create_app()
        with app.app_context():
            print("Getting database connection...")
            db = get_db()
            users_collection = db.users
            
            print("Checking if user exists...")
            # Check if user already exists
            existing_user = users_collection.find_one({"username": "farmer_mary"})
            if existing_user:
                print("Test user 'farmer_mary' already exists!")
                return
            
            print("Creating test user...")
            # Create test user
            test_user = {
                "username": "farmer_mary",
                "email": "mary@farmer.com",
                "password": generate_password_hash("farmer123", method='pbkdf2:sha256'),
                "first_name": "Mary",
                "last_name": "Farmer",
                "phone": "+231-123-456789",
                "county": "Montserrado",
                "district": "Greater Monrovia",
                "community": "Paynesville",
                "farm_size": "2 acres",
                "crops": ["rice", "cassava"],
                "farming_experience": "5 years",
                "preferred_language": "English",
                "education_level": "High School",
                "created_at": datetime.utcnow(),
                "is_active": True,
                "role": "farmer"
            }
            
            print("Inserting user into database...")
            result = users_collection.insert_one(test_user)
            print(f"Test user created successfully with ID: {result.inserted_id}")
            
    except Exception as e:
        print(f"Error creating test user: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    create_test_user()
