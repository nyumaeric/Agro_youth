#!/usr/bin/env python3
"""
Test script for certificate API endpoints
"""
import requests
import json
from pymongo import MongoClient
from bson import ObjectId

# Configuration
BASE_URL = "http://localhost:5000"
MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "agro_youth"

def test_certificate_endpoints():
    """Test all certificate-related endpoints"""
    
    # Connect to MongoDB to get test data
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    
    print("🧪 Testing Certificate API Endpoints")
    print("=" * 50)
    
    # Test 1: Get a test user and enrollment
    print("\n1. Setting up test data...")
    
    # Find a test user
    test_user = db.users.find_one({"email": "test@agro.com"})
    if not test_user:
        print("❌ No test user found. Creating one...")
        # You can create a test user here if needed
        return
    
    user_id = str(test_user["_id"])
    print(f"✅ Found test user: {test_user['email']}")
    
    # Find an enrollment for this user
    enrollment = db.enrollments.find_one({"user_id": ObjectId(user_id)})
    if not enrollment:
        print("❌ No enrollment found for test user")
        return
    
    enrollment_id = str(enrollment["_id"])
    print(f"✅ Found enrollment: {enrollment_id}")
    
    # Test 2: Complete course and generate certificate
    print("\n2. Testing course completion and certificate generation...")
    
    try:
        response = requests.post(
            f"{BASE_URL}/enrollments/{enrollment_id}/complete",
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Course completion successful!")
            print(f"Certificate ID: {data.get('certificate_id')}")
            certificate_id = data.get('certificate_id')
        else:
            print(f"❌ Course completion failed: {response.text}")
            return
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to server. Make sure the Flask app is running on port 5000")
        return
    except Exception as e:
        print(f"❌ Error: {e}")
        return
    
    # Test 3: Get certificate details
    print("\n3. Testing certificate retrieval...")
    
    try:
        response = requests.get(f"{BASE_URL}/certificates/{certificate_id}")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            certificate_data = response.json()
            print("✅ Certificate retrieved successfully!")
            print(f"Certificate for: {certificate_data.get('student_name')}")
            print(f"Course: {certificate_data.get('course_title')}")
            print(f"Issue Date: {certificate_data.get('issue_date')}")
        else:
            print(f"❌ Certificate retrieval failed: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 4: Verify certificate
    print("\n4. Testing certificate verification...")
    
    try:
        response = requests.post(
            f"{BASE_URL}/certificates/{certificate_id}/verify",
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            verification_data = response.json()
            print("✅ Certificate verification successful!")
            print(f"Valid: {verification_data.get('valid')}")
            print(f"Student: {verification_data.get('student_name')}")
        else:
            print(f"❌ Certificate verification failed: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 5: Get user's certificates (requires authentication)
    print("\n5. Testing user certificates endpoint...")
    
    try:
        # This would require authentication in a real scenario
        response = requests.get(f"{BASE_URL}/my-certificates")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            certificates = response.json()
            print(f"✅ Retrieved {len(certificates)} certificates")
        else:
            print(f"❌ User certificates retrieval failed: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print("\n" + "=" * 50)
    print("🎉 Certificate API testing completed!")

def check_database_status():
    """Check if database has the required collections and data"""
    try:
        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
        
        print("📊 Database Status Check")
        print("=" * 30)
        
        # Check collections
        collections = ["users", "courses", "enrollments", "certificates"]
        for collection in collections:
            count = db[collection].count_documents({})
            print(f"{collection}: {count} documents")
        
        # Check for test data
        test_user = db.users.find_one({"email": "test@agro.com"})
        if test_user:
            enrollments = db.enrollments.count_documents({"user_id": test_user["_id"]})
            print(f"Test user enrollments: {enrollments}")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Database connection error: {e}")

if __name__ == "__main__":
    check_database_status()
    print()
    test_certificate_endpoints()
