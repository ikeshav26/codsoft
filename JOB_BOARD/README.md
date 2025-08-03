# Job Board Platform

A modern, full-stack job board application built with React, Node.js, and MongoDB. This platform connects job seekers with employers, providing a seamless experience for posting jobs, applying to positions, and managing applications.

## 🚀 Features

### For Job Seekers
- **User Registration & Authentication** - Secure signup and login system
- **Browse Jobs** - Search and filter through available job listings
- **Apply to Jobs** - Submit applications with resume and cover letter uploads
- **Application Tracking** - Monitor application status in personal dashboard
- **Profile Management** - Manage personal information and application history

### For Employers
- **Employer Registration** - Dedicated signup process for hiring managers
- **Post Jobs** - Create detailed job listings with comprehensive information
- **Application Management** - Review, accept, or decline job applications
- **Dashboard Analytics** - Track job posting performance and application metrics
- **Document Access** - View applicant resumes and cover letters

### General Features
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Professional UI/UX** - Modern, clean interface with intuitive navigation
- **Real-time Updates** - Live status updates for applications
- **File Upload** - Secure document handling via Cloudinary
- **Email Notifications** - Automated email system for important updates

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **React Router** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Axios** - HTTP client for API communication
- **React Hot Toast** - Elegant toast notifications
- **Vite** - Fast development build tool

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling
- **Cloudinary** - Cloud-based file storage and management
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing and security

## 📁 Project Structure

```
JOB_BOARD/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── cloudinary.js
│   │   │   └── connectDb.js
│   │   ├── controller/
│   │   │   ├── job.controller.js
│   │   │   └── user.controller.js
│   │   ├── middlewares/
│   │   │   └── userAuth.js
│   │   ├── models/
│   │   │   ├── application.model.js
│   │   │   ├── job.model.js
│   │   │   ├── otp.model.js
│   │   │   └── user.model.js
│   │   └── routes/
│   │       ├── job.routes.js
│   │       └── user.routes.js
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── pages/
│   │   │   ├── ApplyJob.jsx
│   │   │   ├── Applications.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── CreateJob.jsx
│   │   │   ├── EmployerDashboard.jsx
│   │   │   ├── ExploreJobs.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── UserDashboard.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Cloudinary account for file uploads

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ikeshav26/codsoft.git
   cd codsoft/JOB_BOARD
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```

   Create `.env` file in the frontend directory:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

5. **Start the Application**
   
   Backend (from backend directory):
   ```bash
   npm start
   ```
   
   Frontend (from frontend directory):
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend:https://job.ikeshav.tech
- Backend: https://codsoft-k86o.onrender.com

## 📱 Key Pages & Features

### 🏠 Home Page
- Hero section with call-to-action
- Featured job categories
- Platform statistics
- User testimonials

### 🔍 Explore Jobs
- Job search and filtering
- Responsive job cards
- Apply button integration
- Professional job listings

### 📝 Job Application
- Comprehensive application form
- Resume and cover letter upload
- Real-time file upload feedback
- Form validation

### 👤 User Dashboard
- Application tracking
- Status monitoring (Applied, Accepted, Declined)
- Job details and history
- Profile management

### 🏢 Employer Dashboard
- Job posting management
- Application analytics
- Candidate review system
- Performance metrics

### 📊 Application Management
- Detailed applicant profiles
- Document viewing (resume/cover letter)
- Accept/decline functionality
- Application status tracking

## 🔐 Authentication & Security

- **JWT-based Authentication** - Secure token-based user sessions
- **Password Hashing** - Bcrypt encryption for user passwords
- **Role-based Access** - Separate access levels for users and employers
- **Protected Routes** - Route protection based on authentication status
- **File Upload Security** - Secure document handling via Cloudinary

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers (1024px and above)
- Tablets (768px - 1023px)
- Mobile devices (below 768px)

## 🎨 UI/UX Features

- **Modern Design** - Clean, professional interface
- **Gradient Backgrounds** - Attractive visual design
- **Interactive Elements** - Hover effects and smooth transitions
- **Loading States** - User feedback during data loading
- **Toast Notifications** - Real-time success/error messages
- **Form Validation** - Client-side and server-side validation

## 🚀 Deployment

### Backend Deployment (Render)
1. Create a new project on your hosting platform
2. Connect your GitHub repository
3. Set environment variables
4. Deploy the backend

### Frontend Deployment (Vercel)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set environment variables
4. Deploy the frontend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

For questions or support, please contact:
- **Email**:keshavgilhotra26@gmail.com
- **GitHub**: [@ikeshav26](https://github.com/ikeshav26)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- MongoDB for reliable data storage
- Cloudinary for seamless file management
- All contributors and testers

---

**Made with ❤️ by [Keshav](https://github.com/ikeshav26)**
