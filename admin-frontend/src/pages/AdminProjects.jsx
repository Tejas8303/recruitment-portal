import { useState, useEffect } from "react";
import API from "../api/axios";

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/admin/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("WARNING: This will delete the project and ALL associated applications. Continue?")) {
      try {
        await API.delete(`/admin/projects/${id}`);
        fetchProjects();
      } catch (err) {
        alert("Failed to delete project");
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">All Projects Overview</h1>
      
      <div className="glass-card p-6 border border-slate-200 shadow-sm">
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-slate-500">No projects found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-sm">
                  <th className="pb-3">Project Code</th>
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Professor</th>
                  <th className="pb-3">Deadline</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((project) => (
                  <tr key={project._id} className="text-slate-700 hover:bg-slate-50">
                    <td className="py-3 font-semibold text-emerald-600">{project.projectCode}</td>
                    <td className="py-3">{project.projectTitle}</td>
                    <td className="py-3 text-sm">
                      {project.professor ? `${project.professor.name} (${project.professor.department})` : "N/A"}
                    </td>
                    <td className="py-3 text-sm">{new Date(project.deadline).toLocaleDateString()}</td>
                    <td className="py-3">
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="px-3 py-1 bg-rose-100 text-rose-600 rounded-md hover:bg-rose-200 text-sm font-semibold transition-colors"
                      >
                        Delete
                      </button>
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

export default AdminProjects;
