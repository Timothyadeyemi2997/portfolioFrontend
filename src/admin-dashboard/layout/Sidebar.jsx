import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaFolderOpen, FaEnvelope, FaCog, FaSignOutAlt, FaLeaf, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAuth } from "../../shared/context/useAuth";
import { useMessages } from "../../shared/hooks/useMessages";
import UnreadBadge from "../components/UnreadBadge";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: <FaHome />, exact: true },
  { name: "Projects",  path: "/admin/projects", icon: <FaFolderOpen /> },
  { name: "Messages",  path: "/admin/messages", icon: <FaEnvelope /> },
  { name: "Settings",  path: "/admin/settings", icon: <FaCog /> },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { logout, admin } = useAuth();
  const { unreadCount } = useMessages();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-[#0D2137] border-r border-[#1C3347] fixed top-0 left-0 h-screen flex flex-col z-20 transition-all duration-300`}
    >
      {/* Brand */}
      <div className="px-3 py-5 border-b border-[#1C3347]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 bg-[#00ED64] rounded-xl flex items-center justify-center shadow-lg shadow-[#00ED64]/20 flex-shrink-0">
              <FaLeaf className="text-[#001E2B] text-sm" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <h1 className="text-white font-bold text-sm leading-tight truncate">Welcome Boss </h1>
                <p className="text-[#89979B] text-xs">Portfolio Admin</p>
              </div>
            )}
          </div>
          {/* Toggle button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex-shrink-0 w-6 h-6 rounded-md bg-[#1C3347] hover:bg-[#00ED64]/20 hover:text-[#00ED64] text-[#89979B] flex items-center justify-center transition-all"
          >
            {collapsed ? <FaChevronRight size={10} /> : <FaChevronLeft size={10} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-5 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            title={collapsed ? item.name : undefined}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#00ED64]/10 text-[#00ED64] border border-[#00ED64]/20"
                  : "text-[#89979B] hover:bg-[#1C3347] hover:text-white"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && item.name}
            </div>
            {!collapsed && item.name === "Messages" && <UnreadBadge count={unreadCount} />}
            {collapsed && item.name === "Messages" && unreadCount > 0 && (
              <span className="absolute left-7 top-1 w-2 h-2 bg-[#00ED64] rounded-full" />
            )}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-[#1C3347] px-2 py-4 space-y-1">
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-8 h-8 bg-[#00ED64]/20 rounded-full flex items-center justify-center text-[#00ED64] font-bold text-xs flex-shrink-0">
              {admin?.email?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{admin?.name || "Admin"}</p>
              <p className="text-[#89979B] text-xs truncate">{admin?.email}</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center py-2 mb-1">
            <div className="w-8 h-8 bg-[#00ED64]/20 rounded-full flex items-center justify-center text-[#00ED64] font-bold text-xs">
              {admin?.email?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          title={collapsed ? "Sign Out" : undefined}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-[#89979B] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
        >
          <FaSignOutAlt className="flex-shrink-0" />
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;