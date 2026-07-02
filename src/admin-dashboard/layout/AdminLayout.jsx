import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "../../shared/context/useAuth";
import { Navigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const { admin, loading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#001E2B] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#00ED64] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!admin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-[#001E2B] flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className={`${
          collapsed ? "ml-16" : "ml-64"
        } flex-1 flex flex-col min-h-screen transition-all duration-300`}
      >
        <Topbar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;