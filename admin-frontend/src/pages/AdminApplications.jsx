import { useState, useEffect } from "react";
import API from "../api/axios";

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/admin/applications");
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">All Applications Oversight</h1>
      
      <div className="glass-card p-6 border border-slate-200 shadow-sm">
        {loading ? (
          <p>Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-slate-500">No applications found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-sm">
                  <th className="pb-3">Applicant Name</th>
                  <th className="pb-3">Project Code</th>
                  <th className="pb-3">Professor</th>
                  <th className="pb-3">Submitted At</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app._id} className="text-slate-700 hover:bg-slate-50">
                    <td className="py-3 font-medium">{app.applicantName}</td>
                    <td className="py-3 font-semibold text-emerald-600">
                      {app.project?.projectCode || "N/A"}
                    </td>
                    <td className="py-3 text-sm">{app.professor?.name || "N/A"}</td>
                    <td className="py-3 text-sm">{new Date(app.submittedAt).toLocaleDateString()}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        app.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        app.status === 'Qualified' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminApplications;
