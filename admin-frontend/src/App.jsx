import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjects from "./pages/AdminProjects";
import AdminApplications from "./pages/AdminApplications";
import AdminSidebar from "./components/AdminSidebar";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/projects" element={<PrivateRoute><AdminProjects /></PrivateRoute>} />
        <Route path="/applications" element={<PrivateRoute><AdminApplications /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
