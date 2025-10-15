from flask import current_app
from bson import ObjectId
from datetime import datetime
from app.database import get_db

def get_courses_collection():
    return get_db().courses

def get_enrollments_collection():
    return get_db().enrollments

def get_certificates_collection():
    return get_db().certificates

class Course:
    @staticmethod
    def create_course(course_data):
        courses = get_courses_collection()
        course_data['created_at'] = datetime.utcnow()
        course_data['updated_at'] = datetime.utcnow()
        result = courses.insert_one(course_data)
        return str(result.inserted_id)

    @staticmethod
    def get_all_courses(filters=None):
        courses = get_courses_collection()
        query = {"is_published": True}
        
        if filters:
            if filters.get('category'):
                query['category'] = filters['category']
            if filters.get('level'):
                query['level'] = filters['level']
            if filters.get('language'):
                query['language'] = filters['language']
                
        return list(courses.find(query))

    @staticmethod
    def get_course_by_id(course_id):
        courses = get_courses_collection()
        return courses.find_one({"_id": ObjectId(course_id)})

class Enrollment:
    @staticmethod
    def create_enrollment(enrollment_data):
        enrollments = get_enrollments_collection()
        enrollment_data['enrolled_at'] = datetime.utcnow()
        enrollment_data['progress'] = []
        enrollment_data['completed_at'] = None
        enrollment_data['certificate_issued'] = False
        result = enrollments.insert_one(enrollment_data)
        return str(result.inserted_id)

    @staticmethod
    def get_user_enrollments(user_id):
        enrollments = get_enrollments_collection()
        return list(enrollments.find({"user_id": ObjectId(user_id)}))

    @staticmethod
    def update_progress(enrollment_id, module_data):
        enrollments = get_enrollments_collection()
        enrollments.update_one(
            {"_id": ObjectId(enrollment_id)},
            {"$push": {"progress": module_data}}
        )

    @staticmethod
    def mark_course_completed(enrollment_id):
        enrollments = get_enrollments_collection()
        enrollments.update_one(
            {"_id": ObjectId(enrollment_id)},
            {
                "$set": {
                    "completed_at": datetime.utcnow(),
                    "certificate_issued": True
                }
            }
        )