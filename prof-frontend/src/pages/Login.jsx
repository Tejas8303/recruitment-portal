import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/professor/login", { email, password });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-900">
      {/* LEFT SIDE - IMAGE */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden border-r border-slate-800">
        <img
          src="/admin_hero_bg.png"
          alt="Control Center Background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        <div className="absolute bottom-20 left-16 right-16 text-emerald-50 z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-semibold mb-6 border border-emerald-500/30">
            Secure Access
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight drop-shadow-md">
            Professor <br /> Dashboard
          </h1>
          <p className="text-lg text-emerald-100/80 max-w-md drop-shadow">
            Manage projects, review applications, and oversee your recruitment pipeline from one unified dashboard.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-slate-50">
        <div className="w-full max-w-md glass-card p-10 animate-fade-in border border-slate-200">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mb-6 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Professor Login</h2>
            <p className="text-slate-500 mt-3 text-sm font-medium">Please authenticate to access the control panel.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label-text" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="professor@university.edu"
                className="input-field"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="label-text" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="input-field"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-8 flex justify-center items-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "Authenticate"}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 font-medium">
              &copy; {new Date().getFullYear()} Recruitment Portal. Protected System.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
