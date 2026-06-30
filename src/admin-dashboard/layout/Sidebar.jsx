import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaFolderOpen, FaEnvelope, FaCog, FaSignOutAlt, FaLeaf } from "react-icons/fa";
import { useAuth } from "../../shared/context/AuthContext";
import { useMessages } from "../../shared/hooks/useMessages";
import UnreadBadge from "../components/UnreadBadge";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: <FaHome />, exact: true },
  { name: "Projects",  path: "/admin/projects", icon: <FaFolderOpen /> },
  { name: "Messages",  path: "/admin/messages", icon: <FaEnvelope /> },
  { name: "Settings",  path: "/admin/settings", icon: <FaCog /> },
];

const Sidebar = () => {
  const { logout, admin } = useAuth();
  const { unreadCount } = useMessages();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 bg-[#0D2137] border-r border-[#1C3347] fixed top-0 left-0 h-screen flex flex-col z-20">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-[#1C3347]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#00ED64] rounded-xl flex items-center justify-center shadow-lg shadow-[#00ED64]/20">
            <FaLeaf className="text-[#001E2B] text-sm" />
          </div>
          <div>
            <h1 className="text-white font-bold text-sm leading-tight">Larry CMS</h1>
            <p className="text-[#89979B] text-xs">Portfolio Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#00ED64]/10 text-[#00ED64] border border-[#00ED64]/20"
                  : "text-[#89979B] hover:bg-[#1C3347] hover:text-white"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <span>{item.icon}</span>
              {item.name}
            </div>
            {item.name === "Messages" && <UnreadBadge count={unreadCount} />}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-[#1C3347] px-3 py-4 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 bg-[#00ED64]/20 rounded-full flex items-center justify-center text-[#00ED64] font-bold text-xs flex-shrink-0">
            {admin?.email?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">{admin?.name || "Admin"}</p>
            <p className="text-[#89979B] text-xs truncate">{admin?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-[#89979B] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
        >
          <FaSignOutAlt />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;