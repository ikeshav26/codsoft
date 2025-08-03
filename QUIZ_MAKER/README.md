# 🧠 QuizMaker - Interactive Quiz Platform

A modern, full-stack web application for creating, managing, and taking interactive quizzes. Built with React.js frontend and Node.js backend, featuring a sleek dark theme and responsive design.

![QuizMaker Banner](https://via.placeholder.com/1200x400/1f2937/60a5fa?text=QuizMaker+-+Create+Amazing+Quizzes)

## 🚀 Features

### 🎯 Core Functionality
- **Quiz Creation** - Create custom quizzes with multiple question types
- **Quiz Management** - Edit, delete, and organize your quizzes
- **Interactive Taking** - Smooth quiz-taking experience with real-time feedback
- **User Dashboard** - Comprehensive overview of your quizzes and performance
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

### 🎨 Design & UX
- **Modern Dark Theme** - Professional gray-scale design with blue-purple gradients
- **Responsive Navigation** - Mobile-first navbar with hamburger menu
- **Toast Notifications** - Real-time feedback with react-hot-toast
- **Smooth Animations** - Hover effects and transitions throughout the app
- **Professional Typography** - Carefully crafted text hierarchy and spacing

### 🔐 Authentication & Security
- **User Registration** - Secure signup with form validation
- **User Login** - Authentication with remember me functionality
- **Protected Routes** - Route guards for authenticated users only
- **Session Management** - Persistent login state with localStorage

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with functional components and hooks
- **React Router** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Hot Toast** - Beautiful toast notifications
- **Context API** - State management for user authentication
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling library
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
QUIZ_MAKER/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Navbar.jsx   # Navigation component
│   │   │   └── Footer.jsx   # Footer component
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx     # Landing page
│   │   │   ├── Login.jsx    # User login
│   │   │   ├── Signup.jsx   # User registration
│   │   │   ├── Dashboard.jsx # User dashboard
│   │   │   ├── CreateQuiz.jsx # Quiz creation
│   │   │   ├── Quizes.jsx   # Quiz listing
│   │   │   ├── About.jsx    # About page
│   │   │   └── Contact.jsx  # Contact page
│   │   ├── context/         # React Context
│   │   │   └── AppContext.jsx # Global state management
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # App entry point
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
└── backend/                 # Node.js backend application
    ├── src/
    │   ├── config/          # Configuration files
    │   │   └── connectDb.js # Database connection
    │   ├── controllers/     # Route controllers
    │   │   ├── user.controller.js # User operations
    │   │   └── quiz.controller.js # Quiz operations
    │   ├── models/          # Mongoose models
    │   │   ├── user.model.js # User schema
    │   │   ├── quiz.model.js # Quiz schema
    │   │   └── application.model.js # Quiz attempts
    │   ├── routes/          # API routes
    │   │   ├── user.routes.js # User endpoints
    │   │   └── quiz.routes.js # Quiz endpoints
    │   └── middlewares/     # Custom middleware
    │       └── userAuth.js  # Authentication middleware
    ├── index.js             # Server entry point
    └── package.json         # Backend dependencies
```

## 🚦 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ikeshav26/codsoft.git
   cd codsoft/QUIZ_MAKER
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/quizmaker
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```

5. **Start the Application**
   
   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📱 Screenshots

### 🏠 Home Page
Modern landing page with hero section, features overview, and call-to-action buttons.

### 🔐 Authentication
Clean login and signup forms with dark theme and gradient styling.

### 📊 Dashboard
Comprehensive user dashboard showing quiz statistics and management options.

### ✏️ Quiz Creation
Intuitive quiz creation interface with real-time preview and validation.

## 🎯 API Endpoints

### Authentication
```
POST /api/users/register    # User registration
POST /api/users/login       # User login
GET  /api/users/profile     # Get user profile
```

### Quiz Management
```
GET    /api/quizzes         # Get all quizzes
POST   /api/quizzes         # Create new quiz
GET    /api/quizzes/:id     # Get specific quiz
PUT    /api/quizzes/:id     # Update quiz
DELETE /api/quizzes/:id     # Delete quiz
```

### Quiz Operations
```
POST /api/quizzes/:id/questions    # Add question to quiz
POST /api/quizzes/:id/submit       # Submit quiz attempt
GET  /api/quizzes/:id/results      # Get quiz results
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) to Purple (#8B5CF6) gradients
- **Background**: Gray-900 (#111827) to Gray-800 (#1F2937)
- **Text**: White (#FFFFFF) and Gray-300 (#D1D5DB)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)

### Typography
- **Headings**: Font weights 600-700 with gradient text effects
- **Body**: Clean, readable fonts with proper line spacing
- **Interactive**: Hover effects and smooth transitions

## 🔧 Development

### Available Scripts

**Frontend:**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

**Backend:**
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Code Style
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Component Structure** - Functional components with hooks
- **File Naming** - PascalCase for components, camelCase for utilities

## 📈 Performance

- **Fast Loading** - Optimized with Vite bundler
- **Responsive Images** - Proper image optimization
- **Code Splitting** - Lazy loading for better performance
- **Caching** - Browser caching for static assets

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Keshav** - [@ikeshav26](https://github.com/ikeshav26)

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **MongoDB** - For the flexible NoSQL database
- **Vite** - For the fast build tool
- **React Hot Toast** - For beautiful notifications

## 📞 Support

For support, email keshav@example.com or create an issue on GitHub.

---

⭐ **Star this repository if you found it helpful!**

![GitHub stars](https://img.shields.io/github/stars/ikeshav26/codsoft?style=social)
![GitHub forks](https://img.shields.io/github/forks/ikeshav26/codsoft?style=social)
![GitHub issues](https://img.shields.io/github/issues/ikeshav26/codsoft)
![GitHub license](https://img.shields.io/github/license/ikeshav26/codsoft)
