import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Applications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await API.get("/applications");
        setApps(res.data);
      } catch (err) {
        alert("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const downloadAll = async () => {
    try {
      const res = await API.get("/applications/download/all", {
        responseType: "blob"
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "recruitment.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
      alert("Download failed");
    }
  };

  const exportCSV = async () => {
    try {
      const res = await API.get("/applications/export/csv", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "applications.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
      alert("CSV export failed");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/applications/${id}/status`, { status });
      // update UI instantly
      setApps(prev =>
        prev.map(app =>
          app._id === id ? { ...app, status } : app
        )
      );
    } catch (error) {
      alert("Error updating status");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar Area */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm z-10">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Applications
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Candidate Data</h2>
                <p className="text-sm text-slate-500">Review, update, and export all submitted applications.</p>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={exportCSV}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold rounded-xl border border-emerald-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export CSV
                </button>

                <button
                  onClick={downloadAll}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 text-white hover:bg-slate-900 font-semibold rounded-xl shadow-sm transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Docs
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center justify-center p-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
                  <p className="text-slate-500 font-medium">Loading applications...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <th className="px-6 py-4">Candidate</th>
                        <th className="px-6 py-4">Project</th>
                        <th className="px-6 py-4">Submitted</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Update Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {apps.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                            No applications found.
                          </td>
                        </tr>
                      ) : (
                        apps.map((a) => (
                          <tr key={a._id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-semibold text-slate-800">{a?.student?.name || "Unknown"}</div>
                              <div className="text-sm text-slate-500">{a?.student?.email || "No Email"}</div>
                            </td>

                            <td className="px-6 py-4">
                              <div className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                {a?.project?.projectCode || "N/A"}
                              </div>
                            </td>

                            <td className="px-6 py-4 text-sm text-slate-500">
                              {a?.createdAt ? new Date(a.createdAt).toLocaleDateString() : "Unknown"}
                            </td>

                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${a.status === "Qualified"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : a.status === "Rejected"
                                  ? "bg-rose-50 text-rose-700 border-rose-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                                }`}>
                                {a.status || "Pending"}
                              </span>
                            </td>

                            <td className="px-6 py-4">
                              <select
                                value={a.status || "Pending"}
                                onChange={(e) => updateStatus(a._id, e.target.value)}
                                className="block py-1.5 px-1.5 text-sm font-medium border-slate-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </td>

                            <td className="px-6 py-4 text-right text-sm font-medium">
                              <button
                                onClick={() => navigate(`/applications/${a._id}`)}
                                className="text-emerald-600 hover:text-emerald-900 hover:underline transition-colors font-semibold"
                              >
                                View Profile
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Applications;
