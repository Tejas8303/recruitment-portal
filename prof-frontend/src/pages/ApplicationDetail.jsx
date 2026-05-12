import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/applications/${id}`)
      .then(res => setApp(res.data))
      .catch(err => {
        console.log(err);
        alert("Failed to load application details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-8 text-slate-500">
          Application not found.
        </div>
      </div>
    );
  }

  const formatKey = (key) => {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm z-10 gap-4">
          <button 
            onClick={() => navigate('/applications')}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Candidate Profile
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Overview Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl font-bold shrink-0">
                  {app.applicantName?.charAt(0).toUpperCase() || "C"}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">{app.applicantName}</h2>
                  <p className="text-slate-500 flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {app.student?.email}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      Project: {app.project?.projectCode}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                      app.status === "Qualified"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : app.status === "Rejected"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      Status: {app.status || "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Form Data */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-800">Application Details</h3>
              </div>
              <div className="p-6">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                  {Object.entries(app.formData || {}).map(([key, value]) => (
                    <div key={key} className="border-b border-slate-100 pb-4 last:border-0">
                      <dt className="text-sm font-medium text-slate-500 mb-1">
                        {formatKey(key)}
                      </dt>
                      <dd className="text-base font-medium text-slate-900 break-words">
                        {value || <span className="text-slate-300 italic">Not provided</span>}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default ApplicationDetail;
