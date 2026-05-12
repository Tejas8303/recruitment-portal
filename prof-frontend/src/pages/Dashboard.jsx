import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar Area (optional, can just be a header) */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm z-10">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Dashboard Overview
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          
          <div className="max-w-5xl">
            <p className="text-slate-500 text-lg mb-8">
              Welcome back. Here is a quick overview of your recruitment portal.
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link
                to="/create-project"
                className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
                  Create Project
                </h2>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Set up a new recruitment project, define required documents, and set deadlines.
                </p>
              </Link>

              <Link
                to="/my-projects"
                className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-purple-600 transition-colors">
                  My Projects
                </h2>
                <p className="text-slate-500 leading-relaxed text-sm">
                  View, edit, and delete your active recruitment projects.
                </p>
              </Link>

              <Link
                to="/applications"
                className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  View Applications
                </h2>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Review submitted applications, download documents, and update statuses.
                </p>
              </Link>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;
