import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/";
  };

  return (
    <div className="w-72 bg-slate-900 text-slate-300 flex flex-col min-h-screen border-r border-slate-800 shadow-2xl z-20">
      
      {/* Brand Header */}
      <div className="h-20 flex items-center px-8 border-b border-slate-800 bg-slate-950/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white font-bold shadow-lg">
            S
          </div>
          <div>
            <span className="block font-bold text-lg text-white tracking-tight">Super Admin</span>
            <span className="block text-xs text-rose-400 font-medium">Control Center</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        <div className="px-4 mb-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Menu
        </div>
        
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${location.pathname === '/dashboard' ? 'bg-rose-500/10 text-rose-400 font-medium border border-rose-500/20 shadow-inner' : 'hover:bg-slate-800 hover:text-white'}`}
        >
          <svg className={`w-5 h-5 transition-colors ${location.pathname === '/dashboard' ? 'text-rose-400' : 'text-slate-500 group-hover:text-rose-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Manage Professors
        </Link>

        <Link
          to="/projects"
          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${location.pathname === '/projects' ? 'bg-rose-500/10 text-rose-400 font-medium border border-rose-500/20 shadow-inner' : 'hover:bg-slate-800 hover:text-white'}`}
        >
          <svg className={`w-5 h-5 transition-colors ${location.pathname === '/projects' ? 'text-rose-400' : 'text-slate-500 group-hover:text-rose-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          All Projects
        </Link>

        <Link
          to="/applications"
          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${location.pathname === '/applications' ? 'bg-rose-500/10 text-rose-400 font-medium border border-rose-500/20 shadow-inner' : 'hover:bg-slate-800 hover:text-white'}`}
        >
          <svg className={`w-5 h-5 transition-colors ${location.pathname === '/applications' ? 'text-rose-400' : 'text-slate-500 group-hover:text-rose-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          All Applications
        </Link>
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors group border border-transparent hover:border-rose-500/20"
        >
          <svg className="w-5 h-5 group-hover:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
