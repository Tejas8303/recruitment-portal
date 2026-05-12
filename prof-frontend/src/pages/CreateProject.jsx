import { useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

function CreateProject() {
  const [projectCode, setProjectCode] = useState("");
  const [deadline, setDeadline] = useState("");
  const [documents, setDocuments] = useState([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const docs = [
    "photo",
    "10th_certificate",
    "12th_certificate",
    "ug_certificate",
    "gate_score",
    "payment_receipt"
  ];

  const handleCheckbox = (doc) => {
    if (documents.includes(doc)) {
      setDocuments(documents.filter(d => d !== doc));
    } else {
      setDocuments([...documents, doc]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/projects/professor", {
        projectCode,
        projectTitle,
        deadline,
        requiredDocuments: documents
      });
      alert("Project Created Successfully");
      setProjectCode("");
      setDeadline("");
      setDocuments([]);
      setProjectTitle("");
    } catch (err) {
      console.log("ERROR:", err.response?.data);
      alert("Error creating project");
    } finally {
      setLoading(false);
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
            Create Project
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          
          <div className="max-w-3xl">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-800">Project Configuration</h2>
                <p className="text-sm text-slate-500 mt-1">Setup a new recruitment project by defining its core details and document requirements.</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Project Info Section */}
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="label-text">Project Code</label>
                      <input
                        required
                        value={projectCode}
                        placeholder="e.g. AI-2024-01"
                        className="input-field"
                        onChange={(e) => setProjectCode(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label-text">Application Deadline</label>
                      <input
                        required
                        type="date"
                        value={deadline}
                        className="input-field"
                        onChange={(e) => setDeadline(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-text">Project Title</label>
                    <input
                      required
                      value={projectTitle}
                      placeholder="e.g. Senior Machine Learning Researcher"
                      className="input-field"
                      onChange={(e) => setProjectTitle(e.target.value)}
                    />
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Documents Section */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Required Documents</h3>
                    <p className="text-sm text-slate-500">Select the documents candidates must upload to apply for this project.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {docs.map(doc => {
                      const isChecked = documents.includes(doc);
                      return (
                        <label
                          key={doc}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none ${
                            isChecked
                              ? "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm"
                              : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div className="relative flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleCheckbox(doc)}
                              className="peer sr-only"
                            />
                            <div className={`w-5 h-5 rounded border ${isChecked ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-300'} transition-colors flex items-center justify-center`}>
                              {isChecked && (
                                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="capitalize text-sm font-medium">
                            {doc.replaceAll("_", " ")}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Project...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create Project
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default CreateProject;
