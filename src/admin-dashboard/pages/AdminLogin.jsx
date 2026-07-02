import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../shared/context/useAuth";
import { FaLeaf, FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, admin } = useAuth();
  const navigate = useNavigate();

  if (admin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001E2B] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(#00ED64 1px, transparent 1px), linear-gradient(90deg, #00ED64 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <div className="w-14 h-14 bg-[#00ED64] rounded-2xl flex items-center justify-center shadow-xl shadow-[#00ED64]/30">
            <FaLeaf className="text-[#001E2B] text-2xl" />
          </div>
          <div className="text-center">
            <h1 className="text-white text-2xl font-bold">Timothy CMS </h1>
            <p className="text-[#89979B] text-sm mt-1">Sign in to your admin dashboard</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#0D2137] border border-[#1C3347] rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[#89979B] text-sm font-medium mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com" required autoFocus
                className="w-full bg-[#001E2B] border border-[#1C3347] rounded-xl px-4 py-3 text-white text-sm placeholder-[#89979B] focus:outline-none focus:border-[#00ED64]/50 transition-colors" />
            </div>

            <div>
              <label className="block text-[#89979B] text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                  className="w-full bg-[#001E2B] border border-[#1C3347] rounded-xl px-4 py-3 pr-11 text-white text-sm placeholder-[#89979B] focus:outline-none focus:border-[#00ED64]/50 transition-colors" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89979B] hover:text-white transition-colors">
                  {showPass ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#00ED64] hover:bg-[#00ED64]/90 active:scale-[0.98] text-[#001E2B] font-bold py-3 rounded-xl transition-all text-sm disabled:opacity-50 mt-2">
              {loading
                ? <div className="w-5 h-5 border-2 border-[#001E2B] border-t-transparent rounded-full animate-spin" />
                : "Sign In"
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;