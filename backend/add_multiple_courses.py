#!/usr/bin/env python3
"""
Script to add multiple sample courses to the database
"""
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.database import get_db
from datetime import datetime

def add_multiple_courses():
    """Add multiple sample courses"""
    print("Adding multiple courses...")
    try:
        # Create Flask app context
        app = create_app()
        with app.app_context():
            db = get_db()
            courses_collection = db.courses
            
            # Multiple agricultural courses
            courses = [
                {
                    "title": "Sustainable Rice Farming",
                    "description": "Master traditional and modern rice farming techniques specific to Liberian conditions. Learn water management, pest control, and harvesting methods to maximize your rice yield.",
                    "category": "Crop Production",
                    "level": "Beginner",
                    "duration_hours": 12,
                    "language": "English",
                    "modules": [
                        {
                            "module_number": 1,
                            "title": "Introduction to Rice Farming",
                            "content": "Basic rice farming concepts and variety selection",
                            "duration_minutes": 45,
                            "video_url": ""
                        },
                        {
                            "module_number": 2,
                            "title": "Land Preparation and Planting",
                            "content": "Proper land preparation techniques and planting methods",
                            "duration_minutes": 60,
                            "video_url": ""
                        },
                        {
                            "module_number": 3,
                            "title": "Water Management",
                            "content": "Irrigation and drainage systems for rice farming",
                            "duration_minutes": 45,
                            "video_url": ""
                        },
                        {
                            "module_number": 4,
                            "title": "Pest and Disease Control",
                            "content": "Identifying and managing rice pests and diseases",
                            "duration_minutes": 50,
                            "video_url": ""
                        }
                    ],
                    "is_published": True,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                },
                {
                    "title": "Cassava Cultivation Excellence",
                    "description": "Comprehensive guide to growing high-yield cassava crops. Learn about soil preparation, variety selection, planting techniques, and post-harvest processing.",
                    "category": "Crop Production",
                    "level": "Intermediate",
                    "duration_hours": 8,
                    "language": "English",
                    "modules": [
                        {
                            "module_number": 1,
                            "title": "Cassava Varieties and Selection",
                            "content": "Understanding different cassava varieties and their characteristics",
                            "duration_minutes": 40,
                            "video_url": ""
                        },
                        {
                            "module_number": 2,
                            "title": "Soil Preparation and Planting",
                            "content": "Optimal soil conditions and planting techniques",
                            "duration_minutes": 45,
                            "video_url": ""
                        },
                        {
                            "module_number": 3,
                            "title": "Crop Management",
                            "content": "Fertilization, weeding, and pest management",
                            "duration_minutes": 50,
                            "video_url": ""
                        },
                        {
                            "module_number": 4,
                            "title": "Harvesting and Processing",
                            "content": "When and how to harvest, and basic processing techniques",
                            "duration_minutes": 45,
                            "video_url": ""
                        }
                    ],
                    "is_published": True,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                },
                {
                    "title": "Poultry Farming Fundamentals",
                    "description": "Start your poultry business with confidence. Learn about housing, feeding, health management, and business planning for successful chicken farming.",
                    "category": "Livestock",
                    "level": "Beginner",
                    "duration_hours": 10,
                    "language": "English",
                    "modules": [
                        {
                            "module_number": 1,
                            "title": "Poultry Housing and Setup",
                            "content": "Designing and building proper chicken coops",
                            "duration_minutes": 50,
                            "video_url": ""
                        },
                        {
                            "module_number": 2,
                            "title": "Breed Selection and Acquisition",
                            "content": "Choosing the right chicken breeds for your goals",
                            "duration_minutes": 40,
                            "video_url": ""
                        },
                        {
                            "module_number": 3,
                            "title": "Feeding and Nutrition",
                            "content": "Proper nutrition and feeding schedules",
                            "duration_minutes": 45,
                            "video_url": ""
                        },
                        {
                            "module_number": 4,
                            "title": "Health Management",
                            "content": "Disease prevention and treatment",
                            "duration_minutes": 55,
                            "video_url": ""
                        },
                        {
                            "module_number": 5,
                            "title": "Business Planning",
                            "content": "Creating a profitable poultry business",
                            "duration_minutes": 40,
                            "video_url": ""
                        }
                    ],
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
                    "modules": [
                        {
                            "module_number": 1,
                            "title": "Principles of Organic Farming",
                            "content": "Understanding organic farming philosophy and methods",
                            "duration_minutes": 60,
                            "video_url": ""
                        },
                        {
                            "module_number": 2,
                            "title": "Soil Health and Composting",
                            "content": "Building healthy soil through natural methods",
                            "duration_minutes": 70,
                            "video_url": ""
                        },
                        {
                            "module_number": 3,
                            "title": "Natural Pest Control",
                            "content": "Biological and organic pest management strategies",
                            "duration_minutes": 65,
                            "video_url": ""
                        },
                        {
                            "module_number": 4,
                            "title": "Crop Rotation and Companion Planting",
                            "content": "Maximizing yield through strategic planting",
                            "duration_minutes": 55,
                            "video_url": ""
                        },
                        {
                            "module_number": 5,
                            "title": "Certification and Marketing",
                            "content": "Getting organic certification and marketing organic products",
                            "duration_minutes": 50,
                            "video_url": ""
                        }
                    ],
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
                    "modules": [
                        {
                            "module_number": 1,
                            "title": "Business Planning and Strategy",
                            "content": "Creating a comprehensive farm business plan",
                            "duration_minutes": 75,
                            "video_url": ""
                        },
                        {
                            "module_number": 2,
                            "title": "Financial Management",
                            "content": "Budgeting, cash flow, and financial analysis",
                            "duration_minutes": 80,
                            "video_url": ""
                        },
                        {
                            "module_number": 3,
                            "title": "Marketing and Sales",
                            "content": "Finding customers and selling your products",
                            "duration_minutes": 70,
                            "video_url": ""
                        },
                        {
                            "module_number": 4,
                            "title": "Risk Management",
                            "content": "Insurance, contracts, and risk mitigation",
                            "duration_minutes": 60,
                            "video_url": ""
                        },
                        {
                            "module_number": 5,
                            "title": "Technology Integration",
                            "content": "Using technology to improve farm efficiency",
                            "duration_minutes": 55,
                            "video_url": ""
                        },
                        {
                            "module_number": 6,
                            "title": "Scaling Your Operation",
                            "content": "Growth strategies and expansion planning",
                            "duration_minutes": 65,
                            "video_url": ""
                        }
                    ],
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
                    "modules": [
                        {
                            "module_number": 1,
                            "title": "Planning Your Vegetable Garden",
                            "content": "Site selection and garden layout design",
                            "duration_minutes": 45,
                            "video_url": ""
                        },
                        {
                            "module_number": 2,
                            "title": "Crop Selection and Seasonal Planning",
                            "content": "Choosing profitable vegetables for your climate",
                            "duration_minutes": 50,
                            "video_url": ""
                        },
                        {
                            "module_number": 3,
                            "title": "Intensive Growing Methods",
                            "content": "Maximizing yield in small spaces",
                            "duration_minutes": 55,
                            "video_url": ""
                        },
                        {
                            "module_number": 4,
                            "title": "Harvest and Post-Harvest Handling",
                            "content": "Proper harvesting and storage techniques",
                            "duration_minutes": 40,
                            "video_url": ""
                        },
                        {
                            "module_number": 5,
                            "title": "Marketing Your Vegetables",
                            "content": "Finding customers and pricing your produce",
                            "duration_minutes": 40,
                            "video_url": ""
                        }
                    ],
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
                    "modules": [
                        {
                            "module_number": 1,
                            "title": "Introduction to Aquaculture",
                            "content": "Understanding fish farming systems and opportunities",
                            "duration_minutes": 50,
                            "video_url": ""
                        },
                        {
                            "module_number": 2,
                            "title": "Pond Construction and Setup",
                            "content": "Building and preparing fish ponds",
                            "duration_minutes": 70,
                            "video_url": ""
                        },
                        {
                            "module_number": 3,
                            "title": "Fish Species Selection",
                            "content": "Choosing the right fish for your environment",
                            "duration_minutes": 45,
                            "video_url": ""
                        },
                        {
                            "module_number": 4,
                            "title": "Water Quality Management",
                            "content": "Maintaining optimal water conditions",
                            "duration_minutes": 55,
                            "video_url": ""
                        },
                        {
                            "module_number": 5,
                            "title": "Fish Nutrition and Feeding",
                            "content": "Proper feeding practices and nutrition",
                            "duration_minutes": 50,
                            "video_url": ""
                        },
                        {
                            "module_number": 6,
                            "title": "Disease Prevention and Treatment",
                            "content": "Keeping your fish healthy",
                            "duration_minutes": 45,
                            "video_url": ""
                        },
                        {
                            "module_number": 7,
                            "title": "Harvesting and Marketing",
                            "content": "Harvesting fish and finding buyers",
                            "duration_minutes": 45,
                            "video_url": ""
                        }
                    ],
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
                    "modules": [
                        {
                            "module_number": 1,
                            "title": "Understanding Climate Change Impact",
                            "content": "How climate change affects agriculture",
                            "duration_minutes": 60,
                            "video_url": ""
                        },
                        {
                            "module_number": 2,
                            "title": "Drought-Resistant Farming",
                            "content": "Techniques for farming in dry conditions",
                            "duration_minutes": 70,
                            "video_url": ""
                        },
                        {
                            "module_number": 3,
                            "title": "Water Conservation Techniques",
                            "content": "Efficient water use and conservation methods",
                            "duration_minutes": 65,
                            "video_url": ""
                        },
                        {
                            "module_number": 4,
                            "title": "Crop Diversification",
                            "content": "Building resilience through crop diversity",
                            "duration_minutes": 55,
                            "video_url": ""
                        },
                        {
                            "module_number": 5,
                            "title": "Soil Conservation",
                            "content": "Protecting soil from erosion and degradation",
                            "duration_minutes": 60,
                            "video_url": ""
                        },
                        {
                            "module_number": 6,
                            "title": "Alternative Energy for Farms",
                            "content": "Solar and renewable energy on the farm",
                            "duration_minutes": 50,
                            "video_url": ""
                        }
                    ],
                    "is_published": True,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                }
            ]
            
            # Insert courses, avoiding duplicates
            courses_added = 0
            for course in courses:
                existing = courses_collection.find_one({"title": course["title"]})
                if not existing:
                    result = courses_collection.insert_one(course)
                    print(f"Added course: {course['title']} (ID: {result.inserted_id})")
                    courses_added += 1
                else:
                    print(f"Course already exists: {course['title']}")
            
            print(f"\nTotal courses added: {courses_added}")
            print(f"Total courses in database: {courses_collection.count_documents({})}")
            
    except Exception as e:
        print(f"Error adding courses: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    add_multiple_courses()
