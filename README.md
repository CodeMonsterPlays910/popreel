# Popreel.lol - Video Sharing Platform

A modern, Gen Z-oriented video sharing platform built with Node.js, Express, PostgreSQL, and modern web technologies.

## 🚀 Features

- **Video Upload & Playback**: Upload and watch videos with custom player
- **Real-time Interactions**: Like, comment, and share videos
- **Search & Filter**: Search videos and filter by categories
- **Modern UI**: Glassmorphism design with custom cursor and animations
- **Responsive Design**: Works on all devices
- **Database Driven**: PostgreSQL backend with full CRUD operations

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **File Upload**: Multer
- **Styling**: Custom CSS with Glassmorphism effects

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd popreel-video-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup

#### Option A: Using the provided script (Recommended)
```bash
npm run init-db
```

#### Option B: Manual Setup
1. Open PostgreSQL and create a new database:
```sql
CREATE DATABASE popreel_db;
```

2. Connect to the database and run the SQL commands from `init-database.js`

### 4. Configure Database Connection

Edit `server.js` and update the database connection settings:
```javascript
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'popreel_db',
  password: 'your_password_here', // Change this
  port: 5432,
});
```

### 5. Start the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
popreel-video-platform/
├── n9g4awi9ekip.html    # Main frontend file
├── server.js             # Express server
├── init-database.js      # Database initialization script
├── package.json          # Dependencies and scripts
├── uploads/              # Video upload directory (created automatically)
└── README.md            # This file
```

## 🗄️ Database Schema

### Videos Table
```sql
CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) DEFAULT 'general',
  creator VARCHAR(100) DEFAULT 'Anonymous',
  video_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  likes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Comments Table
```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  video_id INTEGER REFERENCES videos(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  author VARCHAR(100) DEFAULT 'Anonymous',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Users Table (for future authentication)
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 API Endpoints

### Videos
- `GET /api/videos` - Get all videos (with optional category and search filters)
- `GET /api/videos/:id` - Get specific video
- `POST /api/videos/upload` - Upload new video
- `POST /api/videos/:id/like` - Like/unlike video

### Comments
- `GET /api/videos/:id/comments` - Get comments for a video
- `POST /api/videos/:id/comments` - Add comment to video

### Categories
- `GET /api/categories` - Get all available categories

## 🎨 Features

### Frontend Features
- **Custom Cursor**: Animated gradient cursor with hover effects
- **Glassmorphism Design**: Modern glass-like UI elements
- **Responsive Grid**: Auto-adjusting video grid layout
- **Search & Filter**: Real-time search with category filtering
- **Upload Modal**: Drag-and-drop video upload interface
- **Like System**: Interactive like buttons with real-time updates
- **Smooth Animations**: CSS transitions and hover effects

### Backend Features
- **File Upload**: Multer middleware for video file handling
- **Database Integration**: PostgreSQL with connection pooling
- **RESTful API**: Clean API design with proper error handling
- **CORS Support**: Cross-origin resource sharing enabled
- **Error Handling**: Comprehensive error handling and logging

## 🔒 Security Features

- File type validation (video files only)
- File size limits (100MB max)
- SQL injection prevention with parameterized queries
- CORS configuration for cross-origin requests
- Input validation and sanitization

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment
1. Set environment variables:
   ```bash
   export PORT=3000
   export NODE_ENV=production
   ```

2. Start the application:
   ```bash
   npm start
   ```

### Docker Deployment (Optional)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check database credentials in `server.js`
   - Ensure database `popreel_db` exists

2. **Upload Directory Error**
   - The `uploads/` directory is created automatically
   - Ensure the application has write permissions

3. **Port Already in Use**
   - Change the port in `server.js` or set the `PORT` environment variable

4. **File Upload Issues**
   - Check file size (max 100MB)
   - Ensure file is a valid video format
   - Verify upload directory permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by popular video sharing platforms
- Designed for Gen Z audience with vibrant aesthetics

## 📞 Support

For support or questions, please open an issue in the repository.

---

**Made with ❤️ for the Gen Z community**
