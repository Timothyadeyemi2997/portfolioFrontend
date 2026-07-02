import { useLocation } from "react-router-dom";
import { useAuth } from "../../shared/context/useAuth";
import { useMessages } from "../../shared/hooks/useMessages";
import { FaBell } from "react-icons/fa";

const PAGE_TITLES = {
  "/admin": "Dashboard",
  "/admin/projects": "Projects",
  "/admin/messages": "Messages",
  "/admin/settings": "Settings",
};

const Topbar = () => {
  const { admin } = useAuth();
  const { unreadCount } = useMessages();
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] || "Dashboard";

  return (
    <header className="h-16 bg-[#0D2137] border-b border-[#1C3347] px-8 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-white font-semibold text-lg">{title}</h2>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button className="p-2 rounded-lg text-[#89979B] hover:text-white hover:bg-[#1C3347] transition-colors">
            <FaBell size={15} />
          </button>
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#00ED64] text-[#001E2B] text-xs font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2.5 pl-2 border-l border-[#1C3347]">
          <div className="w-8 h-8 bg-[#00ED64]/20 rounded-full flex items-center justify-center text-[#00ED64] font-bold text-xs">
            {admin?.email?.charAt(0).toUpperCase() || "A"}
          </div>
          <span className="text-white text-sm font-medium hidden sm:block">
            {admin?.name || "Admin"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;