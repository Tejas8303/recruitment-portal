# 🎓 3-Panel Recruitment Portal

A comprehensive, role-based MERN stack application designed to streamline the recruitment and application process for academic institutions. The system features a decoupled, 3-panel architecture offering specialized dashboards for **Students**, **Professors**, and **Super Admins**.

---

## 🌐 Live Links

- **Student Portal:** [https://recruitment-portal-frontend-95iq.onrender.com](https://recruitment-portal-frontend-95iq.onrender.com)
- **Professor Portal:** [https://recruitment-portal-prof.onrender.com](https://recruitment-portal-prof.onrender.com)
- **Super Admin Portal:** [https://recruitment-portal-1-c7lh.onrender.com/](https://recruitment-portal-1-c7lh.onrender.com/)

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
- **File Storage:** Local Server Storage (Multer) with files served as static assets.

---

## 📂 Architecture & Directory Structure

This project uses a monolithic repository structure with decoupled frontends communicating with a single unified backend API.

```text
/recruitment-portal
├── /backend            # Express API, Mongoose Models, Controllers, Auth Middleware, File Uploads
├── /frontend           # Vite + React (Student Facing App)
├── /prof-frontend      # Vite + React (Professor Facing App)
└── /admin-frontend     # Vite + React (Super Admin Facing App)
```

---

## 🔑 Environment Variables

Create a `.env` file in the `/backend` directory and add the following keys:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/recruitment
JWT_SECRET=your_super_secret_jwt_key

# Super Admin Credentials
ADMIN_EMAIL=admin@test.com
ADMIN_PASSWORD=admin123
```

---

## 🚀 Local Setup & Installation

### Option A: Standard Manual Installation

#### 1. Clone the repository
```bash
git clone <repository-url>
cd recruitment-portal
```

#### 2. Install Dependencies
You must install the `node_modules` for the backend and all three frontends.
```bash
# Backend
cd backend && npm install

# Frontends
cd ../frontend && npm install
cd ../prof-frontend && npm install
cd ../admin-frontend && npm install
```

#### 3. Seed Database & Create Admin
Ensure your local MongoDB instance is running, then run the seed scripts from the `/backend` folder:
```bash
cd ../backend

# Create a Super Admin account (admin@test.com / admin123)
node createadmin.js

# Seed database with dummy projects and applications
node seed.js
```

#### 4. Run the Application
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

### Option B: Quick Setup with Docker Compose

A pre-configured `docker-compose.yml` is provided at the root level to launch all 4 components (backend + 3 frontends) in containers.

#### 1. Environment Configuration
Ensure you have created the backend `.env` file at `/backend/.env`.
> [!NOTE]
> When running inside Docker, the backend container cannot access MongoDB on `localhost:27017` of your host machine.
> To connect to a local MongoDB running on your host, update the `MONGO_URI` in `/backend/.env` to:
> - **Windows/Mac:** `mongodb://host.docker.internal:27017/recruitment`
> - **Linux:** `mongodb://172.17.0.1:27017/recruitment`
>
> Alternatively, you can use a remote MongoDB Atlas URI.

#### 2. Launch Services
From the root directory of the project, run:
```bash
docker-compose up --build
```
This will build the Docker images and start the services at the following local ports:
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **Student Portal:** [http://localhost:3000](http://localhost:3000)
- **Super Admin Portal:** [http://localhost:3001](http://localhost:3001)
- **Professor Portal:** [http://localhost:3002](http://localhost:3002)

---

## 📁 File Uploads & Persistence

All candidate application files (photos, certificates, etc.) are handled locally on the backend server:
- Files are saved dynamically inside the `/backend/uploads` directory.
- Path structure: `backend/uploads/<projectCode>/<applicantName_serialNumber>/`
- Statically served via Express at: `http://localhost:5000/uploads/...`

> [!WARNING]
> Since uploads are stored on the server's local disk, files will be lost if the container/server instance is destroyed without persistent storage.
> - **Docker:** A named volume `uploads_data` is configured in `docker-compose.yml` to persist uploads across container restarts.
> - **Render / Production:** Attach a persistent disk/volume to the Backend Web Service mount point at `/app/uploads` to prevent data loss.

---

## ☁️ Deployment (Render)

This application can be deployed using **Render**. You will deploy the backend as a **Web Service** and the three frontends as **Static Sites**.

### 1. Backend Deployment (Web Service)
1. In Render, create a new **Web Service** and connect your GitHub repository.
2. **Root Directory:** `backend`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start` (or `node index.js`)
5. Under **Environment Variables**, add all keys from your `.env` (e.g., `MONGO_URI`, `JWT_SECRET`, Admin credentials).
6. Under **Disks**, add a Persistent Disk with Mount Path `/app/uploads` to store and persist uploaded applicant files.
7. Deploy the service and copy the generated URL (e.g., `https://recruitment-backend.onrender.com`).

### 2. Frontend Deployments (Static Sites)
Repeat this process for each frontend (`frontend`, `prof-frontend`, `admin-frontend`).

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
