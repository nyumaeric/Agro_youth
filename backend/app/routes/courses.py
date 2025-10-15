from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime
import secrets
from app.models.course import Course, Enrollment
from app.database import get_db

courses_bp = Blueprint('courses', __name__)

# Collection helpers
def get_courses_collection():
    return get_db().courses

def get_enrollments_collection():
    return get_db().enrollments

def get_certificates_collection():
    return get_db().certificates

@courses_bp.route('/courses', methods=['GET'])
def get_courses():
    try:
        category = request.args.get('category')
        level = request.args.get('level')
        language = request.args.get('language')
        
        filters = {}
        if category:
            filters['category'] = category
        if level:
            filters['level'] = level
        if language:
            filters['language'] = language
            
        courses = Course.get_all_courses(filters)
        
        # Convert ObjectId to string for JSON serialization
        for course in courses:
            course['_id'] = str(course['_id'])
            if 'instructor_id' in course:
                course['instructor_id'] = str(course['instructor_id'])
            
        return jsonify(courses), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@courses_bp.route('/courses/<course_id>', methods=['GET'])
def get_course(course_id):
    try:
        course = Course.get_course_by_id(course_id)
        if not course:
            return jsonify({"error": "Course not found"}), 404
            
        course['_id'] = str(course['_id'])
        if 'instructor_id' in course:
            course['instructor_id'] = str(course['instructor_id'])
        
        return jsonify(course), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@courses_bp.route('/courses/<course_id>/enroll', methods=['POST'])
@jwt_required()
def enroll_course(course_id):
    try:
        user_id = get_jwt_identity()
        
        # Check if already enrolled (you'll need to implement this)
        # existing_enrollment = Enrollment.check_existing_enrollment(user_id, course_id)
        
        enrollment_data = {
            "user_id": ObjectId(user_id),
            "course_id": ObjectId(course_id)
        }
        
        enrollment_id = Enrollment.create_enrollment(enrollment_data)
        return jsonify({
            "message": "Successfully enrolled in course",
            "enrollment_id": enrollment_id
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@courses_bp.route('/my-courses', methods=['GET'])
@jwt_required()
def get_my_courses():
    try:
        user_id = get_jwt_identity()
        enrollments = Enrollment.get_user_enrollments(user_id)
        
        result = []
        for enrollment in enrollments:
            course = Course.get_course_by_id(enrollment['course_id'])
            if course:
                enrollment_data = {
                    "enrollment_id": str(enrollment['_id']),
                    "course_id": str(course['_id']),
                    "course_title": course['title'],
                    "enrolled_at": enrollment['enrolled_at'].isoformat(),
                    "progress": enrollment['progress'],
                    "total_modules": len(course['modules']),
                    "completed": enrollment.get('completed_at') is not None,
                    "certificate_issued": enrollment.get('certificate_issued', False)
                }
                result.append(enrollment_data)
                
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update progress
@courses_bp.route('/enrollments/<enrollment_id>/progress', methods=['PUT'])
@jwt_required()
def update_progress(enrollment_id):
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        enrollment = get_enrollments_collection().find_one({
            "_id": ObjectId(enrollment_id),
            "user_id": ObjectId(user_id)
        })
        
        if not enrollment:
            return jsonify({"error": "Enrollment not found"}), 404
            
        module_progress = {
            "module_number": data['module_number'],
            "completed_at": datetime.utcnow(),
            "quiz_score": data.get('quiz_score')
        }
        
        # Update progress
        get_enrollments_collection().update_one(
            {"_id": ObjectId(enrollment_id)},
            {"$push": {"progress": module_progress}}
        )
        
        return jsonify({"message": "Progress updated"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Generate certificate
@courses_bp.route('/enrollments/<enrollment_id>/certificate', methods=['POST'])
@jwt_required()
def generate_certificate(enrollment_id):
    try:
        user_id = get_jwt_identity()
        
        enrollment = get_enrollments_collection().find_one({
            "_id": ObjectId(enrollment_id),
            "user_id": ObjectId(user_id)
        })
        
        if not enrollment:
            return jsonify({"error": "Enrollment not found"}), 404
            
        course = courses_collection.find_one({"_id": enrollment['course_id']})
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        
        # Check if all modules completed
        if len(enrollment['progress']) < len(course['modules']):
            return jsonify({"error": "Complete all modules to get certificate"}), 400
            
        # Generate certificate
        certificate_id = f"AGRO-{secrets.token_hex(8).upper()}"
        verification_code = secrets.token_urlsafe(16)
        
        certificate = {
            "enrollment_id": ObjectId(enrollment_id),
            "user_id": ObjectId(user_id),
            "course_id": enrollment['course_id'],
            "certificate_id": certificate_id,
            "issue_date": datetime.utcnow(),
            "certificate_url": f"/certificates/{certificate_id}",
            "verification_code": verification_code
        }
        
        get_certificates_collection().insert_one(certificate)
        
        # Update enrollment
        get_enrollments_collection().update_one(
            {"_id": ObjectId(enrollment_id)},
            {
                "$set": {
                    "completed_at": datetime.utcnow(),
                    "certificate_issued": True
                }
            }
        )
        
        return jsonify({
            "message": "Certificate generated",
            "certificate_id": certificate_id,
            "certificate_url": f"/certificates/{certificate_id}"
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get certificate by ID
@courses_bp.route('/certificates/<certificate_id>', methods=['GET'])
def get_certificate(certificate_id):
    try:
        certificates_collection = get_certificates_collection()
        certificate = certificates_collection.find_one({"certificate_id": certificate_id})
        
        if not certificate:
            return jsonify({"error": "Certificate not found"}), 404
        
        # Get course and user details
        course = get_courses_collection().find_one({"_id": certificate['course_id']})
        enrollment = get_enrollments_collection().find_one({"_id": certificate['enrollment_id']})
        
        # Get user details from users collection
        users_collection = get_db().users
        user = users_collection.find_one({"_id": certificate['user_id']})
        
        if not course or not user:
            return jsonify({"error": "Certificate data incomplete"}), 404
        
        certificate_data = {
            "certificate_id": certificate['certificate_id'],
            "course_title": course['title'],
            "course_category": course['category'],
            "course_level": course['level'],
            "course_duration": course['duration_hours'],
            "student_name": f"{user.get('first_name', '')} {user.get('last_name', '')}".strip(),
            "student_email": user.get('email', ''),
            "issue_date": certificate['issue_date'].isoformat(),
            "completion_date": enrollment.get('completed_at', certificate['issue_date']).isoformat(),
            "verification_code": certificate['verification_code'],
            "modules_completed": len(enrollment.get('progress', [])),
            "total_modules": len(course.get('modules', []))
        }
        
        return jsonify(certificate_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get user's certificates
@courses_bp.route('/my-certificates', methods=['GET'])
@jwt_required()
def get_my_certificates():
    try:
        user_id = get_jwt_identity()
        certificates_collection = get_certificates_collection()
        
        certificates = list(certificates_collection.find({"user_id": ObjectId(user_id)}))
        
        result = []
        for cert in certificates:
            course = get_courses_collection().find_one({"_id": cert['course_id']})
            if course:
                cert_data = {
                    "certificate_id": cert['certificate_id'],
                    "course_title": course['title'],
                    "course_category": course['category'],
                    "course_level": course['level'],
                    "issue_date": cert['issue_date'].isoformat(),
                    "certificate_url": f"/api/certificates/{cert['certificate_id']}"
                }
                result.append(cert_data)
        
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Verify certificate
@courses_bp.route('/certificates/<certificate_id>/verify', methods=['POST'])
def verify_certificate(certificate_id):
    try:
        data = request.get_json()
        verification_code = data.get('verification_code')
        
        if not verification_code:
            return jsonify({"error": "Verification code required"}), 400
        
        certificates_collection = get_certificates_collection()
        certificate = certificates_collection.find_one({
            "certificate_id": certificate_id,
            "verification_code": verification_code
        })
        
        if not certificate:
            return jsonify({"valid": False, "message": "Invalid certificate or verification code"}), 200
        
        # Get additional details
        course = get_courses_collection().find_one({"_id": certificate['course_id']})
        users_collection = get_db().users
        user = users_collection.find_one({"_id": certificate['user_id']})
        
        return jsonify({
            "valid": True,
            "certificate_id": certificate['certificate_id'],
            "student_name": f"{user.get('first_name', '')} {user.get('last_name', '')}".strip(),
            "course_title": course['title'],
            "issue_date": certificate['issue_date'].isoformat(),
            "issuer": "Agro Youth Platform"
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Mark course as completed (automatically generates certificate)
@courses_bp.route('/enrollments/<enrollment_id>/complete', methods=['POST'])
@jwt_required()
def complete_course(enrollment_id):
    try:
        user_id = get_jwt_identity()
        
        # Get enrollment
        enrollment = get_enrollments_collection().find_one({
            "_id": ObjectId(enrollment_id),
            "user_id": ObjectId(user_id)
        })
        
        if not enrollment:
            return jsonify({"error": "Enrollment not found"}), 404
        
        # Check if already completed
        if enrollment.get('completed_at'):
            return jsonify({"message": "Course already completed"}), 200
        
        # Get course to check modules
        course = get_courses_collection().find_one({"_id": enrollment['course_id']})
        if not course:
            return jsonify({"error": "Course not found"}), 404
        
        # Check if all modules completed
        if len(enrollment.get('progress', [])) < len(course.get('modules', [])):
            return jsonify({
                "error": "Complete all modules first",
                "completed_modules": len(enrollment.get('progress', [])),
                "total_modules": len(course.get('modules', []))
            }), 400
        
        # Check if certificate already exists
        existing_cert = get_certificates_collection().find_one({
            "enrollment_id": ObjectId(enrollment_id)
        })
        
        if existing_cert:
            return jsonify({
                "message": "Certificate already exists",
                "certificate_id": existing_cert['certificate_id'],
                "certificate_url": f"/api/certificates/{existing_cert['certificate_id']}"
            }), 200
        
        # Generate certificate
        certificate_id = f"AGRO-{secrets.token_hex(8).upper()}"
        verification_code = secrets.token_urlsafe(16)
        
        certificate = {
            "enrollment_id": ObjectId(enrollment_id),
            "user_id": ObjectId(user_id),
            "course_id": enrollment['course_id'],
            "certificate_id": certificate_id,
            "issue_date": datetime.utcnow(),
            "certificate_url": f"/api/certificates/{certificate_id}",
            "verification_code": verification_code
        }
        
        get_certificates_collection().insert_one(certificate)
        
        # Update enrollment
        get_enrollments_collection().update_one(
            {"_id": ObjectId(enrollment_id)},
            {
                "$set": {
                    "completed_at": datetime.utcnow(),
                    "certificate_issued": True
                }
            }
        )
        
        return jsonify({
            "message": "Course completed and certificate generated",
            "certificate_id": certificate_id,
            "certificate_url": f"/api/certificates/{certificate_id}"
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get course progress and completion status
@courses_bp.route('/enrollments/<enrollment_id>/status', methods=['GET'])
@jwt_required()
def get_enrollment_status(enrollment_id):
    try:
        user_id = get_jwt_identity()
        
        enrollment = get_enrollments_collection().find_one({
            "_id": ObjectId(enrollment_id),
            "user_id": ObjectId(user_id)
        })
        
        if not enrollment:
            return jsonify({"error": "Enrollment not found"}), 404
        
        course = get_courses_collection().find_one({"_id": enrollment['course_id']})
        if not course:
            return jsonify({"error": "Course not found"}), 404
        
        # Check for certificate
        certificate = get_certificates_collection().find_one({
            "enrollment_id": ObjectId(enrollment_id)
        })
        
        progress_percentage = (len(enrollment.get('progress', [])) / len(course.get('modules', []))) * 100 if course.get('modules') else 0
        
        status_data = {
            "enrollment_id": enrollment_id,
            "course_id": str(enrollment['course_id']),
            "course_title": course['title'],
            "enrolled_at": enrollment['enrolled_at'].isoformat(),
            "progress": enrollment.get('progress', []),
            "completed_modules": len(enrollment.get('progress', [])),
            "total_modules": len(course.get('modules', [])),
            "progress_percentage": round(progress_percentage, 2),
            "completed_at": enrollment.get('completed_at').isoformat() if enrollment.get('completed_at') else None,
            "is_completed": bool(enrollment.get('completed_at')),
            "certificate_issued": bool(enrollment.get('certificate_issued')),
            "certificate_id": certificate['certificate_id'] if certificate else None,
            "certificate_url": f"/api/certificates/{certificate['certificate_id']}" if certificate else None
        }
        
        return jsonify(status_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500