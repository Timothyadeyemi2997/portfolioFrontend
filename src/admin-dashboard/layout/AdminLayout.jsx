import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "../../shared/context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const { admin, loading } = useAuth();

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
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;