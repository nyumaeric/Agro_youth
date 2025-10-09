# Agro Youth 

Demo Video; https://www.loom.com/share/16c3748a27dd46c880737dfa7f5c8e5c?sid=0a4ea2f5-9f14-426a-bf40-4712c87dfc68
Figma Link; https://www.figma.com/design/MLe3TzDbubFDHaSZDckYUW/Untitled?node-id=0-1&t=Y6L7EhqdSGUjvZzy-0
Repo:


A digital platform connecting young farmers, agricultural knowledge keepers, and buyers to facilitate knowledge sharing and agricultural commerce.

## 🌾 Overview

Agro Youth is a full-stack web application designed to empower young farmers and agricultural communities by providing:

- **Knowledge Sharing** - Access traditional and modern agricultural practices shared by elders and experienced farmers
- **Marketplace** - Buy and sell agricultural products directly, connecting farmers with buyers
- **Community Building** - Create a network of agricultural stakeholders for collaboration and growth
- **Multi-language Support** - Share knowledge in local languages to preserve indigenous farming practices

## ✨ Features

### Authentication & User Management
- User registration with role-based access (Farmer, Elder, Buyer, Admin)
- Secure JWT-based authentication
- User profiles with location and contact information

### Knowledge Base
- Create and browse agricultural knowledge entries
- Filter by crop type, season, and region
- Multi-language content support
- Contributions from experienced farmers and elders
- Best practices, traditional wisdom, and modern techniques

### Agricultural Marketplace
- List crops and products for sale
- Specify quantity, price, and location
- Browse available listings
- Connect buyers directly with farmers
- Real-time availability status

### User Roles
- **Farmers** - List products, share farming experiences
- **Elders** - Share traditional knowledge and best practices
- **Buyers** - Browse and purchase agricultural products
- **Admin** - Manage platform content and users

## 🛠️ Technology Stack

### Backend
- **Framework**: Flask (Python 3.11)
- **Database**: MongoDB
- **Authentication**: JWT (Flask-JWT-Extended)
- **API**: RESTful API with JSON responses
- **Security**: Password hashing with Werkzeug

### Frontend
- **Framework**: React 19.2 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **UI Components**: Custom component library

## 📋 Prerequisites

Before running this project, ensure you have:

- **Python 3.11+** installed
- **Node.js 16+** and npm installed
- **MongoDB** installed and running (local or Atlas)
- **Git** for version control

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Agro_youth-main
```

### 2. Backend Setup

#### Install Python Dependencies

```bash
cd backend
pip install flask flask-cors flask-jwt-extended pymongo python-dotenv werkzeug certifi
```

#### Configure Environment Variables

Create or edit `backend/.env`:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/dagri_talk

# Security Keys (Change these in production!)
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here

# Flask Environment
FLASK_ENV=development
FLASK_DEBUG=True

# Server Configuration
PORT=5000
```

#### Start MongoDB

```bash
# On Linux/Mac
sudo systemctl start mongod

# On Windows
net start MongoDB

# Verify MongoDB is running
mongosh --eval "db.version()"
```

#### Run the Backend Server

```bash
cd backend
python3.11 run.py
```

The backend API will be available at `http://localhost:5000`

### 3. Frontend Setup

#### Install Node Dependencies

```bash
cd frontend
npm install
```

#### Configure Frontend Environment

Create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

#### Start the Frontend Development Server

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_farmer",
  "email": "john@example.com",
  "password": "securepass123",
  "user_type": "farmer",
  "location": "Monrovia"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "john_farmer",
  "password": "securepass123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user_id": "68e58c4240a0b35b6ad158fd",
  "username": "john_farmer"
}
```

#### Get User Profile
```http
GET /auth/profile
Authorization: Bearer <access_token>
```

### Market Endpoints

#### Get All Market Listings
```http
GET /market/
Query Parameters:
  - available_only: true/false (default: true)
```

#### Create Market Listing
```http
POST /market/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "crop_name": "Rice",
  "quantity": 100,
  "unit": "kg",
  "price_per_unit": 2.50,
  "location": "Monrovia",
  "description": "Fresh rice from my farm"
}
```

### Knowledge Endpoints

#### Get All Knowledge Entries
```http
GET /knowledge/
Query Parameters:
  - crop_type: filter by crop
  - region: filter by region
  - season: filter by season
```

#### Create Knowledge Entry
```http
POST /knowledge/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Best Practices for Rice Farming",
  "content": "Rice farming requires proper water management...",
  "language": "English",
  "crop_type": "Rice",
  "season": "Rainy Season",
  "region": "Monrovia"
}
```

### System Endpoints

#### Health Check
```http
GET /health

Response:
{
  "status": "healthy",
  "message": "Database connection successful"
}
```

## 🗄️ Database Schema

### Collections

#### users
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password_hash: String,
  user_type: String, // 'farmer', 'elder', 'buyer', 'admin'
  location: String,
  created_at: DateTime
}
```

#### market_listings
```javascript
{
  _id: ObjectId,
  crop_name: String,
  quantity: Number,
  unit: String,
  price_per_unit: Number,
  location: String,
  description: String,
  farmer_id: ObjectId,
  is_available: Boolean,
  created_at: DateTime,
  updated_at: DateTime
}
```

#### knowledge_entries
```javascript
{
  _id: ObjectId,
  title: String,
  content: String,
  language: String,
  crop_type: String,
  season: String,
  region: String,
  author_id: ObjectId,
  created_at: DateTime,
  updated_at: DateTime
}
```

## 🧪 Testing

### Test Database Connection

```bash
cd backend
python3.11 test_db.py
```

This will verify:
- MongoDB connection
- User registration
- Password hashing
- User authentication

### Manual API Testing

Use curl, Postman, or any HTTP client:

```bash
# Health check
curl http://localhost:5000/api/health

# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test_user","email":"test@example.com","password":"pass123","user_type":"farmer"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test_user","password":"pass123"}'
```

## 📁 Project Structure

```
Agro_youth-main/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Flask app initialization
│   │   ├── config.py            # Configuration settings
│   │   ├── database.py          # MongoDB connection
│   │   ├── extensions.py        # Flask extensions
│   │   ├── models/              # Data models
│   │   │   ├── user.py
│   │   │   ├── market.py
│   │   │   └── knowledge.py
│   │   └── routes/              # API endpoints
│   │       ├── auth.py
│   │       ├── market.py
│   │       ├── knowledge.py
│   │       └── api_root.py
│   ├── run.py                   # Application entry point
│   ├── test_db.py              # Database test script
│   ├── .env                     # Environment variables
│   └── requirements.txt         # Python dependencies
├── frontend/
│   ├── public/                  # Static files
│   ├── src/
│   │   ├── api/                 # API client
│   │   ├── components/          # React components
│   │   │   ├── common/
│   │   │   └── ui/
│   │   ├── pages/               # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Market.tsx
│   │   │   └── Knowledge.tsx
│   │   ├── services/            # Business logic
│   │   ├── types/               # TypeScript types
│   │   ├── App.tsx              # Main app component
│   │   └── index.tsx            # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── database/
│   └── init.sql                 # Legacy SQL schema (not used)
├── DATABASE_FIX_REPORT.md       # Troubleshooting guide
├── QUICK_START.md               # Quick reference
└── README.md                    # This file
```

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Problem**: Cannot connect to MongoDB

**Solution**:
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

### Port Already in Use

**Problem**: Port 5000 or 3000 already in use

**Solution**:
```bash
# Find process using the port
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change the port in .env file
```

### CORS Issues

**Problem**: Frontend cannot connect to backend

**Solution**: Ensure CORS is properly configured in `backend/app/__init__.py`:
```python
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})
```

### JWT Token Expired

**Problem**: 401 Unauthorized errors

**Solution**: Login again to get a fresh token. Tokens expire after 15 minutes by default.

## 🚀 Deployment

### Production Considerations

1. **Environment Variables**: Use strong, unique secret keys
2. **Database**: Use MongoDB Atlas or a production MongoDB instance
3. **HTTPS**: Enable SSL/TLS for secure communication
4. **CORS**: Restrict origins to your production domain
5. **Error Handling**: Implement comprehensive error logging
6. **Rate Limiting**: Add API rate limiting to prevent abuse

### Deployment Options

- **Backend**: Heroku, AWS EC2, DigitalOcean, Railway
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Database**: MongoDB Atlas (recommended)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Development Team - Initial work

## 🙏 Acknowledgments

- Agricultural communities for their invaluable knowledge
- Open source community for the amazing tools and libraries
- All contributors who help improve this platform

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Contact the development team
- Check the [DATABASE_FIX_REPORT.md](DATABASE_FIX_REPORT.md) for common issues

---

**Built with ❤️ for agricultural communities**