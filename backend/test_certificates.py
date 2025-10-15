#!/usr/bin/env python3
"""
Script to test certificate API endpoints
"""
import requests
import json

BASE_URL = "http://localhost:5000/api"

def test_certificate_apis():
    print("🧪 Testing Certificate API Endpoints")
    print("=" * 50)
    
    # Test login first
    print("\n1. Testing login...")
    login_data = {
        "username": "farmer_mary",
        "password": "farmer123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    if response.status_code == 200:
        token = response.json()['access_token']
        headers = {"Authorization": f"Bearer {token}"}
        print("✅ Login successful")
    else:
        print("❌ Login failed")
        return
    
    # Test getting user courses
    print("\n2. Testing user courses...")
    response = requests.get(f"{BASE_URL}/my-courses", headers=headers)
    if response.status_code == 200:
        courses = response.json()
        print(f"✅ Found {len(courses)} enrolled courses")
        
        if courses:
            enrollment_id = courses[0]['enrollment_id']
            course_title = courses[0]['course_title']
            print(f"📚 Testing with course: {course_title}")
        else:
            print("⚠️ No enrolled courses found, enrolling in a course first...")
            # Get available courses
            courses_response = requests.get(f"{BASE_URL}/courses")
            if courses_response.status_code == 200:
                available_courses = courses_response.json()
                if available_courses:
                    course_id = available_courses[0]['_id']
                    enroll_response = requests.post(f"{BASE_URL}/courses/{course_id}/enroll", headers=headers)
                    if enroll_response.status_code == 201:
                        print("✅ Enrolled in course successfully")
                        # Get updated courses
                        response = requests.get(f"{BASE_URL}/my-courses", headers=headers)
                        courses = response.json()
                        enrollment_id = courses[0]['enrollment_id']
                        course_title = courses[0]['course_title']
                    else:
                        print("❌ Failed to enroll in course")
                        return
    else:
        print("❌ Failed to get user courses")
        return
    
    # Test enrollment status
    print(f"\n3. Testing enrollment status for {enrollment_id}...")
    response = requests.get(f"{BASE_URL}/enrollments/{enrollment_id}/status", headers=headers)
    if response.status_code == 200:
        status = response.json()
        print("✅ Enrollment status retrieved successfully")
        print(f"   Progress: {status['completed_modules']}/{status['total_modules']} modules")
        print(f"   Completed: {status['is_completed']}")
        print(f"   Certificate issued: {status['certificate_issued']}")
    else:
        print("❌ Failed to get enrollment status")
    
    # Test completing course (if not already completed)
    print(f"\n4. Testing course completion...")
    response = requests.post(f"{BASE_URL}/enrollments/{enrollment_id}/complete", headers=headers)
    if response.status_code == 201:
        completion_data = response.json()
        print("✅ Course completed and certificate generated")
        print(f"   Certificate ID: {completion_data['certificate_id']}")
        certificate_id = completion_data['certificate_id']
    elif response.status_code == 200:
        completion_data = response.json()
        print("✅ Course already completed")
        certificate_id = completion_data.get('certificate_id')
    else:
        error_data = response.json()
        print(f"⚠️ Course completion: {error_data.get('error', 'Unknown error')}")
        
        # Try to get existing certificate from status
        status_response = requests.get(f"{BASE_URL}/enrollments/{enrollment_id}/status", headers=headers)
        if status_response.status_code == 200:
            status_data = status_response.json()
            certificate_id = status_data.get('certificate_id')
            if certificate_id:
                print(f"📜 Found existing certificate: {certificate_id}")
            else:
                print("❌ No certificate found")
                return
        else:
            return
    
    # Test getting certificate
    if certificate_id:
        print(f"\n5. Testing certificate retrieval for {certificate_id}...")
        response = requests.get(f"{BASE_URL}/certificates/{certificate_id}")
        if response.status_code == 200:
            certificate = response.json()
            print("✅ Certificate retrieved successfully")
            print(f"   Student: {certificate.get('student_name', 'N/A')}")
            print(f"   Course: {certificate.get('course_title', 'N/A')}")
            print(f"   Level: {certificate.get('course_level', 'N/A')}")
            print(f"   Issue Date: {certificate.get('issue_date', 'N/A')}")
            
            verification_code = certificate.get('verification_code')
        else:
            print("❌ Failed to retrieve certificate")
            return
    
    # Test getting user's certificates
    print(f"\n6. Testing user certificates list...")
    response = requests.get(f"{BASE_URL}/my-certificates", headers=headers)
    if response.status_code == 200:
        certificates = response.json()
        print(f"✅ Found {len(certificates)} certificates")
        for cert in certificates:
            print(f"   📜 {cert['course_title']} - {cert['certificate_id']}")
    else:
        print("❌ Failed to get user certificates")
    
    # Test certificate verification
    if certificate_id and verification_code:
        print(f"\n7. Testing certificate verification...")
        verify_data = {"verification_code": verification_code}
        response = requests.post(f"{BASE_URL}/certificates/{certificate_id}/verify", json=verify_data)
        if response.status_code == 200:
            verify_result = response.json()
            if verify_result.get('valid'):
                print("✅ Certificate verification successful")
                print(f"   Valid: {verify_result['valid']}")
                print(f"   Student: {verify_result.get('student_name', 'N/A')}")
                print(f"   Course: {verify_result.get('course_title', 'N/A')}")
            else:
                print("❌ Certificate verification failed")
                print(f"   Message: {verify_result.get('message', 'Unknown error')}")
        else:
            print("❌ Verification request failed")
    
    print(f"\n🎉 Certificate API testing completed!")
    print("=" * 50)

if __name__ == "__main__":
    try:
        test_certificate_apis()
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        import traceback
        traceback.print_exc()
