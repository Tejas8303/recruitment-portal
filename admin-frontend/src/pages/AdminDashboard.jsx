import { useState, useEffect } from "react";
import API from "../api/axios";

function AdminDashboard() {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New Professor form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");

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
        name, email, password, department, designation
      });
      alert("Professor created successfully!");
      fetchProfessors();
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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Professor Form */}
        <div className="glass-card p-6 border border-slate-200 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-slate-700 mb-4">Create Professor</h2>
          <form onSubmit={handleCreateProfessor} className="space-y-4">
            <input type="text" placeholder="Name" required className="input-field" onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" required className="input-field" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" required className="input-field" onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="Department" required className="input-field" onChange={(e) => setDepartment(e.target.value)} />
            <input type="text" placeholder="Designation" required className="input-field" onChange={(e) => setDesignation(e.target.value)} />
            <button type="submit" className="btn-primary mt-2">Add Professor</button>
          </form>
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
                      <td className="py-3">
                        <button
                          onClick={() => handleToggleBlock(prof._id)}
                          className={`text-sm font-semibold ${prof.isBlocked ? 'text-emerald-600' : 'text-rose-600'}`}
                        >
                          {prof.isBlocked ? 'Unblock' : 'Block'}
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
