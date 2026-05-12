import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white">
      {/* LEFT SIDE - IMAGE */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 overflow-hidden">
        <img
          src="/auth_hero_bg.png"
          alt="Abstract 3D Background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-indigo-900/40 to-transparent"></div>
        <div className="absolute bottom-20 left-16 right-16 text-white z-10">
          <h1 className="text-5xl font-bold mb-6 leading-tight text-white drop-shadow-md">
            Welcome to the <br /> Recruitment Portal
          </h1>
          <p className="text-lg text-indigo-100 max-w-md drop-shadow">
            Discover exciting career opportunities and take the next step in your professional journey with us.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-slate-50">
        <div className="w-full max-w-md glass-card p-10 animate-fade-in">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 mb-6 shadow-inner transform rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 -rotate-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Sign In</h2>
            <p className="text-slate-500 mt-3 text-sm">Please enter your details to access your dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="label-text" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
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
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-center mt-8 text-slate-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors focus:outline-none"
            >
              Create one now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
