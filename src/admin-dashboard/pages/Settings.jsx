import { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { useAuth } from "../../shared/context/useAuth";
import api from "../../shared/api/axios";
import { FaLock, FaUserCircle, FaCheck } from "react-icons/fa";

const SettingsPage = () => {
  const { admin } = useAuth();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    if (form.newPassword !== form.confirmPassword)
      return setMsg({ type: "error", text: "New passwords do not match" });
    if (form.newPassword.length < 6)
      return setMsg({ type: "error", text: "Password must be at least 6 characters" });

    try {
      setLoading(true);
      await api.put("/admin/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setMsg({ type: "success", text: "Password updated successfully" });
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setMsg({ type: "error", text: err.response?.data?.message || "Failed to update password" });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-[#001E2B] border border-[#1C3347] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#89979B] focus:outline-none focus:border-[#00ED64]/50 transition-colors";

  return (
    <AdminLayout>
      <div className="space-y-2 mb-8">
        <h1 className="text-white text-2xl font-bold">Settings</h1>
        <p className="text-[#89979B] text-sm">Manage your admin account preferences.</p>
      </div>

      <div className="max-w-xl space-y-6">
        {/* Account info */}
        <div className="bg-[#0D2137] border border-[#1C3347] rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-[#1C3347]">
            <FaUserCircle className="text-[#00ED64] text-lg" />
            <h3 className="text-white font-semibold text-sm">Account Info</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4 p-4 bg-[#001E2B] rounded-xl border border-[#1C3347]">
              <div className="w-12 h-12 bg-[#00ED64]/20 rounded-full flex items-center justify-center text-[#00ED64] font-bold text-lg">
                {admin?.email?.charAt(0).toUpperCase() || "A"}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{admin?.name || "Admin"}</p>
                <p className="text-[#89979B] text-sm">{admin?.email}</p>
              </div>
              <div className="ml-auto">
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#00ED64]/10 text-[#00ED64] border border-[#00ED64]/20 font-medium">
                  Administrator
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Change password */}
        <div className="bg-[#0D2137] border border-[#1C3347] rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-[#1C3347]">
            <FaLock className="text-[#00ED64]" />
            <h3 className="text-white font-semibold text-sm">Change Password</h3>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {msg.text && (
              <div className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
                msg.type === "success"
                  ? "bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64]"
                  : "bg-red-500/10 border border-red-500/20 text-red-400"
              }`}>
                {msg.type === "success" && <FaCheck size={12} />}
                {msg.text}
              </div>
            )}

            {[
              { key: "currentPassword", label: "Current Password" },
              { key: "newPassword", label: "New Password" },
              { key: "confirmPassword", label: "Confirm New Password" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[#89979B] text-sm font-medium mb-2">{label}</label>
                <input type="password" value={form[key]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                  required className={inputClass} />
              </div>
            ))}

            <div className="pt-2">
              <button type="submit" disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#00ED64] hover:bg-[#00ED64]/90 text-[#001E2B] text-sm font-bold rounded-xl transition-colors disabled:opacity-50 active:scale-95">
                {loading && <div className="w-4 h-4 border-2 border-[#001E2B] border-t-transparent rounded-full animate-spin" />}
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;