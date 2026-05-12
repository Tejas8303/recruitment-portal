import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch (error) {
        console.error("Failed to load projects");
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get("/applications/my");
        setApplications(res.data);
      } catch (error) {
        console.log("Error fetching applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleApply = (id) => {
    navigate(`/applicationform/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white font-bold shadow-sm">R</div>
              <span className="font-bold text-xl text-slate-800 tracking-tight">Recruitment Portal</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Sign Out
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Project Dashboard</h1>
              <p className="mt-2 text-slate-500 text-lg">Browse available research projects and track your applications.</p>
            </div>
            <div className="mt-6 md:mt-0">
               <div className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">
                  Total Projects: {projects.length}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* List Header (Hidden on mobile) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
             <div className="col-span-2">Project Code</div>
             <div className="col-span-5">Title</div>
             <div className="col-span-2">Deadline</div>
             <div className="col-span-1">Status</div>
             <div className="col-span-2 text-right">Action</div>
          </div>

          <div className="divide-y divide-slate-100">
            {projects.map((project) => {
              const app = applications.find(
                (a) => a.project.toString() === project._id
              );
              const isClosed = new Date(project.deadline) < new Date();
              const isApplied = !!app;

              return (
                <div
                  key={project._id}
                  className="group flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center px-6 py-5 hover:bg-slate-50 transition-colors duration-150"
                >
                  {/* Code */}
                  <div className="md:col-span-2 w-full md:w-auto flex items-center justify-between md:block">
                     <span className="md:hidden text-xs font-semibold text-slate-400 uppercase">Code</span>
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                       {project.projectCode}
                     </span>
                  </div>

                  {/* Title */}
                  <div className="md:col-span-5 w-full">
                    <span className="md:hidden text-xs font-semibold text-slate-400 uppercase mb-1 block">Title</span>
                    <h2 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {project.projectTitle}
                    </h2>
                  </div>
                  
                  {/* Deadline */}
                  <div className="md:col-span-2 w-full flex items-center justify-between md:block">
                    <span className="md:hidden text-xs font-semibold text-slate-400 uppercase">Deadline</span>
                    <div className="flex items-center text-sm text-slate-600">
                      <svg className="w-4 h-4 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(project.deadline).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="md:col-span-1 w-full flex items-center justify-between md:block">
                     <span className="md:hidden text-xs font-semibold text-slate-400 uppercase">Status</span>
                     {app ? (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          app.status === "Qualified"
                            ? "bg-green-100 text-green-800"
                            : app.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {app.status || "Pending"}
                      </span>
                     ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                         Not Applied
                      </span>
                     )}
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-2 w-full mt-4 md:mt-0 text-right">
                    <button
                      onClick={() => handleApply(project._id)}
                      disabled={isClosed || isApplied}
                      className={`w-full md:w-auto inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                        isClosed
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                          : isApplied
                          ? "bg-green-50 text-green-700 cursor-not-allowed border border-green-200"
                          : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow"
                      }`}
                    >
                      {isClosed ? "Closed" : isApplied ? "Applied" : "Apply Now"}
                    </button>
                  </div>
                </div>
              );
            })}
            
            {projects.length === 0 && (
               <div className="px-6 py-16 text-center">
                  <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                     <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                     </svg>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">No projects available</h3>
                  <p className="mt-1 text-sm text-slate-500">Check back later for new opportunities.</p>
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;