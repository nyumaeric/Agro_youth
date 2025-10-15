#!/usr/bin/env python3
from app import create_app
from app.database import get_db
from datetime import datetime

app = create_app()
with app.app_context():
    db = get_db()
    courses_collection = db.courses
    
    courses = [
        {
            "title": "Poultry Farming Fundamentals",
            "description": "Start your poultry business with confidence. Learn about housing, feeding, health management, and business planning for successful chicken farming.",
            "category": "Livestock",
            "level": "Beginner",
            "duration_hours": 10,
            "language": "English",
            "modules": [{"module_number": 1, "title": "Poultry Housing", "content": "Housing setup", "duration_minutes": 50, "video_url": ""}],
            "is_published": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "title": "Organic Farming Practices",
            "description": "Learn sustainable and organic farming methods that protect the environment while producing healthy crops. Perfect for eco-conscious farmers.",
            "category": "Sustainable Agriculture",
            "level": "Intermediate",
            "duration_hours": 15,
            "language": "English",
            "modules": [{"module_number": 1, "title": "Organic Principles", "content": "Organic basics", "duration_minutes": 60, "video_url": ""}],
            "is_published": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "title": "Farm Business Management",
            "description": "Transform your farming operation into a profitable business. Learn financial planning, record keeping, marketing strategies, and business growth techniques.",
            "category": "Agribusiness",
            "level": "Advanced",
            "duration_hours": 18,
            "language": "English",
            "modules": [{"module_number": 1, "title": "Business Planning", "content": "Business basics", "duration_minutes": 75, "video_url": ""}],
            "is_published": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "title": "Vegetable Gardening for Profit",
            "description": "Start a profitable vegetable garden business. Learn about crop selection, seasonal planning, intensive growing methods, and local market sales.",
            "category": "Crop Production",
            "level": "Beginner",
            "duration_hours": 9,
            "language": "English",
            "modules": [{"module_number": 1, "title": "Garden Planning", "content": "Planning basics", "duration_minutes": 45, "video_url": ""}],
            "is_published": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "title": "Fish Farming (Aquaculture) Basics",
            "description": "Dive into fish farming with this comprehensive course. Learn pond construction, fish species selection, feeding, and water quality management.",
            "category": "Livestock",
            "level": "Intermediate",
            "duration_hours": 14,
            "language": "English",
            "modules": [{"module_number": 1, "title": "Aquaculture Intro", "content": "Fish farming basics", "duration_minutes": 50, "video_url": ""}],
            "is_published": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "title": "Climate-Smart Agriculture",
            "description": "Adapt your farming practices to climate change. Learn resilient farming techniques, drought management, and sustainable practices for changing weather patterns.",
            "category": "Sustainable Agriculture",
            "level": "Advanced",
            "duration_hours": 16,
            "language": "English",
            "modules": [{"module_number": 1, "title": "Climate Impact", "content": "Climate change effects", "duration_minutes": 60, "video_url": ""}],
            "is_published": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    
    added = 0
    for course in courses:
        existing = courses_collection.find_one({"title": course["title"]})
        if not existing:
            result = courses_collection.insert_one(course)
            print(f"Added: {course['title']}")
            added += 1
        else:
            print(f"Exists: {course['title']}")
    
    print(f"Added {added} new courses")
    print(f"Total courses: {courses_collection.count_documents({})}")
