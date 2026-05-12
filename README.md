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

## ☁️ Deployment (Render)

This application can be easily deployed using **Render**. You will deploy the backend as a **Web Service** and the three frontends as **Static Sites**.

### 1. Backend Deployment (Web Service)
1. In Render, create a new **Web Service** and connect your GitHub repository.
2. **Root Directory:** `backend`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start` (or `node index.js`)
5. Under **Environment Variables**, add all the variables from your local `.env` file (e.g., `MONGO_URI`, `JWT_SECRET`, Cloudinary keys, Admin credentials).
6. Deploy the service and copy the generated URL (e.g., `https://recruitment-backend.onrender.com`).

### 2. Frontend Deployments (Static Sites)
You will repeat this process three times—once for each frontend (`frontend`, `prof-frontend`, `admin-frontend`).

1. In Render, create a new **Static Site** and connect your repository.
2. **Root Directory:** `frontend` (change to `prof-frontend` or `admin-frontend` respectively).
3. **Build Command:** `npm install && npm run build`
4. **Publish Directory:** `dist`
5. **Environment Variables:** Add the following key to link it to your deployed backend:
   ```env
   VITE_API_URL=https://<your-deployed-backend-url>/api
   ```
6. **Routing (Important for React Router):** In the Render settings for each Static Site, go to **Redirects/Rewrites** and add a rule to catch all routes to avoid 404s on refresh:
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Action:** `Rewrite`
7. Deploy! Your frontends will now securely talk to your Render backend.
