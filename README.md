# Mini LinkedIn-like Community Platform

A modern, full-stack social media platform built with React, Node.js, and MongoDB. This application allows users to register, create posts, view profiles, and interact with a community feed - similar to LinkedIn's core functionality.

## 🚀 Live Demo

- **Frontend**: [Deployed on Vercel](https://your-app.vercel.app)
- **Backend**: [Deployed on Render](https://your-api.render.com)
- **GitHub Repository**: [https://github.com/Mukulraj109/LinkedIn-like-Community-Platform.git](https://github.com/Mukulraj109/LinkedIn-like-Community-Platform.git)

## 📋 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## ✨ Features

### 🔐 Authentication
- User registration with name, email, password, and bio
- Secure login with JWT tokens
- Password hashing with bcrypt
- Protected routes and middleware
- Persistent login sessions

### 📝 Post Management
- Create text-only posts
- View all posts in chronological order (latest first)
- Edit and delete your own posts
- Real-time post updates

### 👤 User Profiles
- View user profile details (name, email, bio, join date)
- See all posts by a specific user
- Edit your own profile information
- Professional profile layout

### 🎨 UI/UX
- Responsive design for mobile, tablet, and desktop
- Clean, professional LinkedIn-inspired design
- Smooth animations and hover effects
- Loading states and error handling
- Intuitive navigation

## 🏗️ Project Structure

```
mini-linkedin/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Layout.tsx
│   │   │   ├── PostCard.tsx
│   │   │   ├── CreatePost.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── context/        # React context providers
│   │   │   └── AuthContext.tsx
│   │   ├── pages/          # Route components
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Feed.tsx
│   │   │   └── Profile.tsx
│   │   ├── services/       # API services
│   │   │   └── api.ts
│   │   ├── types/          # TypeScript definitions
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tailwind.config.js
└── server/                 # Node.js backend
    ├── controllers/        # Route handlers
    │   ├── authController.js
    │   ├── userController.js
    │   └── postController.js
    ├── middleware/         # Custom middleware
    │   ├── auth.js
    │   └── validation.js
    ├── models/             # Mongoose schemas
    │   ├── User.js
    │   └── Post.js
    ├── routes/             # API routes
    │   ├── auth.js
    │   ├── users.js
    │   └── posts.js
    ├── config/             # Configuration files
    │   └── database.js
    ├── server.js           # Main server file
    └── package.json
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mini-linkedin.git
   cd mini-linkedin/server
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install 
   ```

3. **Create environment variables**
   ```bash
   # Create .env file in server directory
   touch .env
   ```
   
   Add the following to `.env`:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mini-linkedin(or mongodb atlas)
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   ```

8. **Start the server**
   ```bash
   npm run start
   # or
   node server.js
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd ../src
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**
   ```bash
   # Create .env file in client directory
   echo "VITE_API_URL=http://localhost:5000/api" > .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user profile
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get post by ID
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `GET /api/posts/user/:userId` - Get posts by user

## 🚀 Deployment

### Frontend (Vercel)

1. **Connect GitHub repository to Vercel**
2. **Set environment variables in Vercel dashboard:**
   ```
   VITE_API_URL=https://your-api.render.com/api
   ```
3. **Deploy automatically on push to main branch**

### Backend (Render)

1. **Create a new Web Service on Render**
2. **Connect your GitHub repository**
3. **Set environment variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-production-jwt-secret
   CLIENT_URL=https://your-app.vercel.app
   ```
4. **Build command:** `npm install`
5. **Start command:** `node server.js`

## 🧪 Demo Credentials

For testing purposes, you can use these demo credentials:

- **Email:** admin@demo.com
- **Password:** password123


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your backend CORS configuration includes your frontend URL
2. **MongoDB Connection**: Verify your MongoDB URI and ensure the database is accessible
3. **JWT Errors**: Check that your JWT_SECRET is set in environment variables
4. **Build Errors**: Ensure all dependencies are installed correctly

### Support

If you encounter any issues, please:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure both frontend and backend servers are running
4. Check the GitHub issues for similar problems

## 🎯 Future Enhancements

- [ ] Like and comment system for posts
- [ ] User connections/following
- [ ] Image upload for posts and profiles
- [ ] Real-time notifications
- [ ] Search functionality
- [ ] Post categories/tags
- [ ] Admin dashboard
- [ ] Mobile app with React Native