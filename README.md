# 🎓 3-Panel Recruitment Portal

A comprehensive, role-based MERN stack application designed to streamline the recruitment and application process for academic institutions. The system features a decoupled, 3-panel architecture offering specialized dashboards for **Students**, **Professors**, and **Super Admins**.

---

## 🌟 Features

### 🧑‍🎓 Student Portal (`/frontend`)
- **Authentication**: Secure registration and login.
- **Project Discovery**: View available recruitment projects posted by various professors.
- **Application Submission**: Apply to projects by uploading required documents (Photos, Certificates, Scorecards, etc.).
- **Status Tracking**: Monitor the real-time status of submitted applications.

### 👨‍🏫 Professor Portal (`/prof-frontend`)
- **Authentication**: Secure login (Accounts are provisioned by the Super Admin).
- **Project Management**: Create, edit, and delete recruitment projects.
- **Application Review**: View only the applications submitted specifically to their own projects.
- **Candidate Management**: Update application statuses (Pending, Qualified, Rejected).
- **Data Export**: Export candidate data to CSV and download all applicant documents as a ZIP archive.

### 🛡️ Super Admin Portal (`/admin-frontend`)
- **Authentication**: Secure environment-based login.
- **Professor Management**: Provision new professor accounts and toggle block/active statuses.
- **Platform Oversight**: View every project and application across the entire platform.
- **Moderation**: Delete projects globally if necessary.

---

## 🛠️ Technology Stack

- **Database:** MongoDB (Mongoose)
- **Backend:** Node.js, Express.js
- **Frontends:** React (Vite), Tailwind CSS
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **File Storage:** Cloudinary (for document uploads)

---

## 📂 Architecture & Directory Structure

This project uses a monolithic repository structure with decoupled frontends communicating with a single unified backend API.

```text
/recruitment-portal
├── /backend            # Express API, Mongoose Models, Controllers, Auth Middleware
├── /frontend           # Vite + React (Student Facing App)
├── /prof-frontend      # Vite + React (Professor Facing App)
└── /admin-frontend     # Vite + React (Super Admin Facing App)
```

---

## 🚀 Local Setup & Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd recruitment-portal
```

### 2. Install Dependencies
You must install the `node_modules` for the backend and all three frontends.
```bash
# Backend
cd backend && npm install

# Frontends
cd ../frontend && npm install
cd ../prof-frontend && npm install
cd ../admin-frontend && npm install
```

### 3. Environment Variables
Create a `.env` file in the `/backend` directory and add the following keys:

```env
PORT=5000
MONGO_URI=mongodb+srv://sagarshinde:[EMAIL_ADDRESS]/recruitmentPortal?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary Setup (For document uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Super Admin Credentials
ADMIN_EMAIL=[EMAIL_ADDRESS]
ADMIN_PASSWORD=[PASSWORD]
```

### 4. Run the Application
You will need to run the backend and frontends in separate terminal windows.

```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Student Frontend
cd frontend
npm run dev

# Terminal 3: Professor Frontend
cd prof-frontend
npm run dev

# Terminal 4: Admin Frontend
cd admin-frontend
npm run dev
```

---

## ☁️ Deployment (Vercel)

The codebase is pre-configured for serverless deployment on Vercel.

### Backend Deployment
1. Import the `/backend` directory to Vercel.
2. Vercel will automatically detect the `vercel.json` routing configuration and the exported Express app in `index.js`.
3. Add your `.env` variables to the Vercel project settings.

### Frontend Deployment
1. Import `/frontend`, `/prof-frontend`, and `/admin-frontend` as three separate projects in Vercel.
2. For each project, Vercel will automatically detect the Vite framework.
3. In the environment variables for each frontend, add:
   ```env
   VITE_API_URL=https://<your-deployed-backend-url>/api
   ```
   *(This ensures the frontends dynamically route to the deployed backend instead of localhost).*
