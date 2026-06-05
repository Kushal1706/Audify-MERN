# 📚 Audify - Audiobook Streaming Platform

A modern, full-stack audiobook streaming application built with the MERN stack (MongoDB, Express.js, React, Node.js). Audify allows users to discover, upload, and listen to audiobooks with AI-powered summaries and personalized recommendations.

**Live Demo:** [https://audify-mern.vercel.app](https://audify-app.vercel.app/login)

---

## ✨ Features

### 🎧 Core Features
- **User Authentication**: Secure registration and login with JWT token-based authentication
- **Browse Audiobooks**: Discover audiobooks across 18+ categories
- **Audio Player**: Built-in audio player with playback controls
- **Upload Audiobooks**: Upload your own audiobooks with metadata (title, author, description, cover image)
- **Search & Filter**: Full-text search functionality for books and authors
- **Like System**: Like and track your favorite audiobooks
- **Play Counter**: Track how many times each book has been played
- **User Dashboard**: Manage uploaded audiobooks and view statistics

### 🤖 AI Features
- **AI-Powered Summaries**: Generate intelligent book summaries using Google's Generative AI
- **Smart Recommendations**: Get personalized audiobook suggestions

### 💾 Technical Features
- **Cloud Storage**: Cloudinary integration for secure image and audio uploads
- **JWT Authentication**: Secure token-based authentication
- **Password Security**: Bcrypt encryption for password hashing
- **Responsive Design**: Tailwind CSS for mobile-first responsive UI
- **State Management**: React Context API for global state management

---

## 🏗️ Project Structure

```
Audify-MERN/
├── Frontend/
│   └── Audify/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Navbar.jsx              # Navigation component
│       │   │   ├── AudioPlayer.jsx         # Audio playback controls
│       │   │   ├── BookCard.jsx            # Book display card
│       │   │   ├── AISummaryModel.jsx      # AI summary modal
│       │   │   └── ProtectedRoute.jsx      # Route protection
│       │   ├── pages/
│       │   │   ├── LoginPage.jsx           # Auth page
│       │   │   ├── HomePage.jsx            # Landing page
│       │   │   ├── BrowsePage.jsx          # Book browsing
│       │   │   ├── UploadPage.jsx          # Audiobook upload
│       │   │   └── DashboardPage.jsx       # User dashboard
│       │   ├── services/
│       │   │   ├── authService.js          # Auth API calls
│       │   │   ├── bookService.js          # Book API calls
│       │   │   └── aiService.js            # AI API calls
│       │   ├── context/
│       │   │   └── AuthContext.jsx         # Auth state context
│       │   ├── App.jsx                     # Main app component
│       │   ├── main.jsx                    # React entry point
│       │   └── index.css                   # Global styles
│       ├── package.json
│       ├── vite.config.js
│       ├── tailwind.config.js
│       └── postcss.config.js
│
├── server/
│   ├── models/
│   │   ├── User.js                         # User schema
│   │   └── Book.js                         # Book schema
│   ├── controllers/
│   │   ├── authController.js               # Auth logic
│   │   ├── bookController.js               # Book logic
│   │   ├── uploadController.js             # File upload logic
│   │   └── aiController.js                 # AI summary logic
│   ├── routes/
│   │   ├── authRoutes.js                   # Auth endpoints
│   │   ├── bookRoutes.js                   # Book endpoints
│   │   ├── uploadRoutes.js                 # Upload endpoints
│   │   └── aiRoutes.js                     # AI endpoints
│   ├── middleware/
│   │   └── authMiddleware.js               # JWT verification
│   ├── config/
│   ├── index.js                            # Server entry point
│   └── package.json
│
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.4** - UI library
- **React Router v7** - Client-side routing
- **Tailwind CSS 4.2** - Utility-first CSS framework
- **Axios 1.13** - HTTP client
- **Font Awesome 7.2** - Icon library
- **Vite 8** - Build tool

### Backend
- **Node.js & Express 5.2** - Server framework
- **MongoDB & Mongoose 9.3** - Database and ODM
- **JWT** - Authentication
- **Bcryptjs 3.0** - Password hashing
- **Cloudinary 2.9** - Cloud storage for images and audio
- **Google Generative AI 0.24** - AI summaries
- **Multer 2.1** - File upload handling
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variables

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Google Generative AI API key

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/Kushal1706/Audify-MERN.git
cd Audify-MERN
```

#### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GOOGLE_AI_API_KEY=your_google_generative_ai_key
```

Run the server:
```bash
npm run dev
```

The backend will start on `http://localhost:5000`

#### 3. Setup Frontend

```bash
cd Frontend/Audify
npm install
```

Create a `.env` file in the Frontend/Audify directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Books
- `GET /api/books` - Get all books with pagination and filtering
- `GET /api/books/search?q=query` - Search books
- `POST /api/books` - Create new book (requires auth)
- `PUT /api/books/:id` - Update book details
- `DELETE /api/books/:id` - Delete book
- `POST /api/books/:id/like` - Like/unlike book
- `GET /api/books/:id/details` - Get book details

### Upload
- `POST /api/upload/cloudinary` - Upload file to Cloudinary

### AI Features
- `POST /api/ai/summary` - Generate AI-powered book summary

---

## 📱 Application Pages

### 🔐 Login Page
- User registration and login
- Form validation
- Error handling
- Responsive design

### 🏠 Home Page
- Welcome screen
- Featured audiobooks
- Quick navigation

### 📖 Browse Page
- Grid view of all audiobooks
- Category filtering
- Search functionality
- Book cards with metadata
- Play and like buttons

### ⬆️ Upload Page
- Upload audiobook with cover image
- Manage metadata (title, author, description, duration, category)
- Progress tracking
- Error handling

### 📊 Dashboard
- View uploaded audiobooks
- Statistics (total uploads, plays, likes)
- Manage audiobooks

### 🎧 Audio Player
- Global audio player (persistent across pages)
- Playback controls (play, pause, forward, backward)
- Progress bar
- Volume control

---

## 🔐 Security Features

- **Password Hashing**: Bcrypt with 10 salt rounds
- **JWT Authentication**: Secure token-based auth with 7-day expiry
- **Protected Routes**: ProtectedRoute component prevents unauthorized access
- **CORS Configuration**: Restricted to authorized origins
- **Input Validation**: Server-side validation on all endpoints
- **Environment Variables**: Sensitive data stored in .env files

---

## 📦 Book Categories

The platform supports 18 book categories:
- Psychology
- Science
- Self Help
- Finance
- Business
- Technology
- Fiction
- Non-Fiction
- Science Fiction
- Fantasy
- Mystery
- Biography
- History
- Children's
- Young Adult
- Romance
- Thriller
- Horror

---

## 🎨 UI/UX Highlights

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Theme**: Modern dark interface for comfortable listening
- **Intuitive Navigation**: Clear navigation with persistent navbar
- **Loading States**: User feedback during uploads and API calls
- **Error Messages**: Clear, actionable error handling
- **Audio Player**: Persistent player that stays accessible while browsing

---

## 🚀 Deployment

### Backend (Vercel/Railway)
```bash
# Deploy server to your hosting platform
# Ensure environment variables are set in deployment platform
npm run dev
```

### Frontend (Vercel)
```bash
# Deploy frontend to Vercel
npm run build
# Vercel automatically handles deployment
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the ISC License.

---

## 🙋 Support & Contact

For support, questions, or feedback:
- GitHub Issues: [Create an issue](https://github.com/Kushal1706/Audify-MERN/issues)
- contact: [Connect via GitHub Profile](https://github.com/Kushal1706)
- email: [Kushal](kushal17062004@gmail.com)

---

## 🙌 Acknowledgments

- React & React Router for the amazing frontend framework
- Express.js for the robust backend framework
- MongoDB for the flexible database
- Tailwind CSS for the beautiful styling
- Cloudinary for reliable cloud storage
- Google Generative AI for AI-powered features

---

**Made with ❤️ by [Kushal1706](https://github.com/Kushal1706)**

---

## 📊 Stats

- **Language Composition**: JavaScript (74.8%), CSS (24.7%), HTML (0.5%)
- **Total Repository Size**: 125 KB
- **Created**: March 19, 2026
- **Live Since**: April 2026
