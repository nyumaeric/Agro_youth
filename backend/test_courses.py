import requests
import json

BASE_URL = "http://localhost:5000/api"

def test_courses():
    # Test getting all courses
    response = requests.get(f"{BASE_URL}/courses")
    print("Courses:", json.dumps(response.json(), indent=2))
    
    # Test login
    login_data = {
        "username": "farmer_mary",
        "password": "farmer123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    token = response.json()['access_token']
    print("Login successful, token received")
    
    # Test getting user courses
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/my-courses", headers=headers)
    print("My Courses:", json.dumps(response.json(), indent=2))

if __name__ == "__main__":
    test_courses()
