#!/usr/bin/env python3
"""
Script to populate the database with sample courses
"""
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.database import get_db
from datetime import datetime
import pymongo

def populate_courses():
    """Add sample courses to the database"""
    try:
        # Create Flask app context
        app = create_app()
        with app.app_context():
            db = get_db()
        
        # Sample courses
        courses = [
            {
                "title": "Sustainable Rice Farming",
                "description": "Learn traditional and modern rice farming techniques specific to Liberian conditions. Master water management, pest control, and harvesting methods.",
                "category": "Crop Production",
                "level": "Beginner",
                "duration_hours": 8,
                "language": "English",
                "modules": [
                    {
                        "module_number": 1,
                        "title": "Introduction to Rice Farming",
                        "content": "<h2>Welcome to Rice Farming</h2><p>Rice is one of Liberia's most important crops. In this module, you'll learn the basics of rice cultivation, including variety selection and land preparation.</p><h3>Learning Objectives:</h3><ul><li>Understand different rice varieties</li><li>Learn land preparation techniques</li><li>Identify optimal planting conditions</li></ul>",
                        "video_url": "",
                        "duration_minutes": 45
                    },
                    {
                        "module_number": 2,
                        "title": "Water Management",
                        "content": "<h2>Managing Water for Rice</h2><p>Proper water management is crucial for successful rice farming. Learn traditional irrigation methods and modern water conservation techniques.</p><h3>Key Topics:</h3><ul><li>Irrigation systems</li><li>Water conservation</li><li>Drainage management</li></ul>",
                        "video_url": "",
                        "duration_minutes": 60
                    },
                    {
                        "module_number": 3,
                        "title": "Pest and Disease Control",
                        "content": "<h2>Protecting Your Rice Crop</h2><p>Learn to identify common pests and diseases affecting rice in Liberia. Discover both traditional and modern control methods.</p><h3>What You'll Learn:</h3><ul><li>Common rice pests</li><li>Disease identification</li><li>Natural pest control methods</li><li>Integrated pest management</li></ul>",
                        "video_url": "",
                        "duration_minutes": 50
                    },
                    {
                        "module_number": 4,
                        "title": "Harvesting and Post-Harvest",
                        "content": "<h2>Maximizing Your Harvest</h2><p>Master the timing and techniques for harvesting rice, plus learn proper storage and processing methods to maximize quality and profits.</p><h3>Module Content:</h3><ul><li>Determining harvest time</li><li>Harvesting techniques</li><li>Drying and storage</li><li>Quality control</li></ul>",
                        "video_url": "",
                        "duration_minutes": 55
                    }
                ],
                "is_published": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "title": "Cassava Cultivation and Processing",
                "description": "Master cassava farming from planting to processing. Learn traditional techniques and modern innovations for this vital Liberian crop.",
                "category": "Crop Production",
                "level": "Beginner",
                "duration_hours": 6,
                "language": "English",
                "modules": [
                    {
                        "module_number": 1,
                        "title": "Cassava Varieties and Planting",
                        "content": "<h2>Getting Started with Cassava</h2><p>Cassava is a drought-resistant crop perfect for Liberian conditions. Learn about different varieties and proper planting techniques.</p><h3>In This Module:</h3><ul><li>Cassava varieties suitable for Liberia</li><li>Soil preparation</li><li>Planting techniques</li><li>Spacing and timing</li></ul>",
                        "video_url": "",
                        "duration_minutes": 45
                    },
                    {
                        "module_number": 2,
                        "title": "Crop Management",
                        "content": "<h2>Managing Your Cassava Farm</h2><p>Learn essential management practices for healthy cassava growth, including weeding, fertilization, and disease prevention.</p><h3>Topics Covered:</h3><ul><li>Weeding techniques</li><li>Organic fertilization</li><li>Disease prevention</li><li>Growth monitoring</li></ul>",
                        "video_url": "",
                        "duration_minutes": 40
                    },
                    {
                        "module_number": 3,
                        "title": "Harvesting and Processing",
                        "content": "<h2>From Harvest to Market</h2><p>Master the art of cassava harvesting and traditional processing methods to create various products for local and regional markets.</p><h3>Learn About:</h3><ul><li>Optimal harvest timing</li><li>Traditional processing methods</li><li>Value-added products</li><li>Storage techniques</li></ul>",
                        "video_url": "",
                        "duration_minutes": 55
                    }
                ],
                "is_published": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "title": "Small-Scale Poultry Farming",
                "description": "Start your poultry farming journey with this comprehensive course on raising chickens, ducks, and other birds for eggs and meat production.",
                "category": "Livestock",
                "level": "Beginner",
                "duration_hours": 5,
                "language": "English",
                "modules": [
                    {
                        "module_number": 1,
                        "title": "Introduction to Poultry Farming",
                        "content": "<h2>Starting Your Poultry Farm</h2><p>Poultry farming offers excellent opportunities for young farmers. Learn the basics of raising healthy birds for eggs and meat.</p><h3>Course Overview:</h3><ul><li>Types of poultry suitable for Liberia</li><li>Initial investment requirements</li><li>Market opportunities</li><li>Basic housing needs</li></ul>",
                        "video_url": "",
                        "duration_minutes": 40
                    },
                    {
                        "module_number": 2,
                        "title": "Housing and Feeding",
                        "content": "<h2>Creating the Right Environment</h2><p>Learn to build appropriate housing and provide proper nutrition for your birds to ensure healthy growth and maximum productivity.</p><h3>Key Areas:</h3><ul><li>Coop construction</li><li>Ventilation requirements</li><li>Feeding schedules</li><li>Local feed sources</li></ul>",
                        "video_url": "",
                        "duration_minutes": 50
                    },
                    {
                        "module_number": 3,
                        "title": "Health Management and Marketing",
                        "content": "<h2>Keeping Birds Healthy and Profitable</h2><p>Prevent diseases, manage health issues, and learn effective marketing strategies for your poultry products.</p><h3>Module Content:</h3><ul><li>Common poultry diseases</li><li>Vaccination schedules</li><li>Marketing strategies</li><li>Record keeping</li></ul>",
                        "video_url": "",
                        "duration_minutes": 50
                    }
                ],
                "is_published": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "title": "Agricultural Business Fundamentals",
                "description": "Transform your farming knowledge into a profitable business. Learn planning, budgeting, marketing, and financial management for agricultural ventures.",
                "category": "Business",
                "level": "Intermediate",
                "duration_hours": 7,
                "language": "English",
                "modules": [
                    {
                        "module_number": 1,
                        "title": "Business Planning for Farmers",
                        "content": "<h2>Building Your Agricultural Business</h2><p>Every successful farm starts with a solid business plan. Learn to create realistic plans that set you up for success.</p><h3>Planning Elements:</h3><ul><li>Market research techniques</li><li>Setting realistic goals</li><li>Resource assessment</li><li>Risk management</li></ul>",
                        "video_url": "",
                        "duration_minutes": 60
                    },
                    {
                        "module_number": 2,
                        "title": "Financial Management",
                        "content": "<h2>Managing Farm Finances</h2><p>Master the financial aspects of farming including budgeting, cost tracking, profit analysis, and accessing credit.</p><h3>Financial Skills:</h3><ul><li>Budget creation</li><li>Cost-benefit analysis</li><li>Record keeping</li><li>Accessing agricultural loans</li></ul>",
                        "video_url": "",
                        "duration_minutes": 55
                    },
                    {
                        "module_number": 3,
                        "title": "Marketing and Sales",
                        "content": "<h2>Getting Your Products to Market</h2><p>Develop effective marketing strategies to reach customers and maximize profits from your agricultural products.</p><h3>Marketing Topics:</h3><ul><li>Identifying target markets</li><li>Pricing strategies</li><li>Building customer relationships</li><li>Digital marketing basics</li></ul>",
                        "video_url": "",
                        "duration_minutes": 65
                    }
                ],
                "is_published": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        
        # Insert courses
        result = db.courses.insert_many(courses)
        print(f"Successfully inserted {len(result.inserted_ids)} courses")
        
        # Print course titles and IDs
        for i, course_id in enumerate(result.inserted_ids):
            print(f"Course {i+1}: {courses[i]['title']} (ID: {course_id})")
            
    except Exception as e:
        print(f"Error populating courses: {e}")

if __name__ == "__main__":
    populate_courses()
