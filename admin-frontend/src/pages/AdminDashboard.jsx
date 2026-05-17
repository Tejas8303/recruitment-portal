import { useState, useEffect } from "react";
import API from "../api/axios";

function AdminDashboard() {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New Professor form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Bulk Upload state
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSummary, setUploadSummary] = useState(null);

  const fetchProfessors = async () => {
    try {
      const res = await API.get("/admin/professors");
      setProfessors(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessors();
  }, []);

  const handleCreateProfessor = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin/professors", {
        name, email, password
      });
      alert("Professor created successfully!");
      fetchProfessors();
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert("Failed to create professor");
    }
  };

  const handleToggleBlock = async (id) => {
    try {
      await API.put(`/admin/professors/${id}/block`);
      fetchProfessors();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDeleteProfessor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this professor? This will also delete all their projects and applications.")) return;
    try {
      await API.delete(`/admin/professors/${id}`);
      fetchProfessors();
    } catch (err) {
      alert("Failed to delete professor");
    }
  };

  const handleDownloadSampleCSV = () => {
    const csvContent = "name,email,password\nProf Sharma,sharma@gmail.com,sharma123\nProf Verma,verma@gmail.com,verma123";
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "sample_professors.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a CSV file first.");
      return;
    }
    setUploading(true);
    setUploadSummary(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/admin/professors/bulk-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setUploadSummary(res.data);
      fetchProfessors();
      setFile(null);
      e.target.reset();
    } catch (err) {
      alert("Failed to upload CSV. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="flex flex-col gap-8">
          {/* Create Professor Form */}
          <div className="glass-card p-6 border border-slate-200 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-slate-700 mb-4">Create Professor</h2>
            <form onSubmit={handleCreateProfessor} className="space-y-4">
              <input type="text" placeholder="Name" required value={name} className="input-field" onChange={(e) => setName(e.target.value)} />
              <input type="email" placeholder="Email" required value={email} className="input-field" onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" required value={password} className="input-field" onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" className="btn-primary mt-2 w-full">Add Professor</button>
            </form>
          </div>

          {/* Bulk Upload Form */}
          <div className="glass-card p-6 border border-slate-200 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-slate-700 mb-4">Bulk Upload</h2>
            <p className="text-sm text-slate-500 mb-4">Upload a CSV file to add multiple professors at once.</p>
            <button 
              type="button" 
              onClick={handleDownloadSampleCSV} 
              className="btn-secondary w-full mb-4 text-sm py-2 border border-gray-400 rounded-lg "
            >
              Download Sample CSV
            </button>
            <form onSubmit={handleBulkUpload} className="space-y-4">
              <input 
                type="file" 
                accept=".csv" 
                required 
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <button type="submit" disabled={uploading} className="btn-primary w-full mt-2">
                {uploading ? "Uploading..." : "Upload CSV"}
              </button>
            </form>

            {uploadSummary && (
              <div className="mt-4 p-4 rounded-md bg-slate-50 border border-slate-200 text-sm">
                <h3 className="font-semibold text-slate-700 mb-2">Upload Summary</h3>
                <ul className="space-y-1 text-slate-600">
                  <li>Total Processed: <span className="font-medium">{uploadSummary.total}</span></li>
                  <li>Successfully Created: <span className="font-medium text-emerald-600">{uploadSummary.created}</span></li>
                  <li>Skipped Duplicates: <span className="font-medium text-amber-600">{uploadSummary.duplicates}</span></li>
                  <li>Failed: <span className="font-medium text-rose-600">{uploadSummary.failed}</span></li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Professors List */}
        <div className="lg:col-span-2 glass-card p-6 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-700 mb-4">Manage Professors</h2>
          
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-sm">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Department</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {professors.map((prof) => (
                    <tr key={prof._id} className="text-slate-700 hover:bg-slate-50">
                      <td className="py-3 font-medium">{prof.name}</td>
                      <td className="py-3 text-sm text-slate-500">{prof.email}</td>
                      <td className="py-3 text-sm">{prof.department}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${prof.isBlocked ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                          {prof.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="py-3 flex gap-3">
                        <button
                          onClick={() => handleToggleBlock(prof._id)}
                          className={`text-sm font-semibold ${prof.isBlocked ? 'text-emerald-600' : 'text-amber-600'}`}
                        >
                          {prof.isBlocked ? 'Unblock' : 'Block'}
                        </button>
                        <button
                          onClick={() => handleDeleteProfessor(prof._id)}
                          className="text-sm font-semibold text-rose-600 hover:text-rose-800"
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
    </div>
  );
}

export default AdminDashboard;
