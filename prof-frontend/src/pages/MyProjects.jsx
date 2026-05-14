import { useState, useEffect } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);

  // Edit form state
  const [editTitle, setEditTitle] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const [editDocs, setEditDocs] = useState([]);

  const allDocs = [
    "photo",
    "10th_certificate",
    "12th_certificate",
    "ug_certificate",
    "gate_score",
    "payment_receipt"
  ];

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects/professor");
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
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await API.delete(`/projects/professor/${id}`);
        fetchProjects();
      } catch (err) {
        alert("Failed to delete project");
      }
    }
  };

  const exportProjectCSV = async (id, projectCode) => {
    try {
      const res = await API.get(`/applications/export/csv/${id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${projectCode}_applications.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
      alert("CSV export failed");
    }
  };

  const startEditing = (project) => {
    setEditingProject(project._id);
    setEditTitle(project.projectTitle);
    setEditDeadline(project.deadline ? project.deadline.substring(0, 10) : "");
    setEditDocs(project.requiredDocuments || []);
  };

  const cancelEditing = () => {
    setEditingProject(null);
  };

  const handleEditCheckbox = (doc) => {
    if (editDocs.includes(doc)) {
      setEditDocs(editDocs.filter(d => d !== doc));
    } else {
      setEditDocs([...editDocs, doc]);
    }
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      await API.put(`/projects/professor/${id}`, {
        projectTitle: editTitle,
        deadline: editDeadline,
        requiredDocuments: editDocs
      });
      alert("Project updated successfully");
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      alert("Failed to update project");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm z-10">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            My Projects
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          {loading ? (
            <p>Loading projects...</p>
          ) : projects.length === 0 ? (
            <div className="glass-card p-10 text-center">
              <p className="text-slate-500">You haven't created any projects yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="glass-card p-6 border border-slate-200 shadow-sm relative group">
                  {editingProject === project._id ? (
                    <form onSubmit={(e) => handleUpdate(e, project._id)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="label-text">Project Title</label>
                          <input 
                            required 
                            className="input-field" 
                            value={editTitle} 
                            onChange={(e) => setEditTitle(e.target.value)} 
                          />
                        </div>
                        <div>
                          <label className="label-text">Deadline</label>
                          <input 
                            required 
                            type="date" 
                            className="input-field" 
                            value={editDeadline} 
                            onChange={(e) => setEditDeadline(e.target.value)} 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="label-text mb-2">Required Documents</label>
                        <div className="flex flex-wrap gap-2">
                          {allDocs.map(doc => (
                            <label key={doc} className="flex items-center gap-2 p-2 border rounded-md cursor-pointer text-sm">
                              <input 
                                type="checkbox" 
                                checked={editDocs.includes(doc)} 
                                onChange={() => handleEditCheckbox(doc)}
                              />
                              <span className="capitalize">{doc.replace("_", " ")}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-4 pt-2">
                        <button type="submit" className="btn-primary flex-1">Save Changes</button>
                        <button type="button" onClick={cancelEditing} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-bold transition-colors">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-xl font-bold text-slate-800">{project.projectTitle}</h2>
                          <span className="inline-block mt-1 px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-md">
                            {project.projectCode}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => exportProjectCSV(project._id, project.projectCode)}
                            className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-md hover:bg-emerald-100 text-sm font-semibold transition-colors"
                          >
                            Export CSV
                          </button>
                          <button 
                            onClick={() => startEditing(project)}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 text-sm font-semibold transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(project._id)}
                            className="px-3 py-1 bg-rose-50 text-rose-600 rounded-md hover:bg-rose-100 text-sm font-semibold transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600 mb-4">
                        <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
                        <p className="mt-1"><strong>Required Docs:</strong> {project.requiredDocuments.join(', ').replace(/_/g, " ")}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default MyProjects;
