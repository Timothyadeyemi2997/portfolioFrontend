import AdminLayout from "../layout/AdminLayout";
import StatCard from "../components/StatsCard";
import { useProjects } from "../../shared/hooks/useProjects";
import { FaFolderOpen, FaEnvelope, FaStar, FaBell } from "react-icons/fa";

const DashboardSummary = ({ projects, messages, unreadCount, pLoading, mLoading }) => {
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard title="Total Projects" value={pLoading ? "—" : projects.length} icon={<FaFolderOpen />} color="#00ED64" />
        <StatCard title="Featured" value={pLoading ? "—" : featuredCount} icon={<FaStar />} color="#F59E0B" />
        <StatCard title="Messages" value={mLoading ? "—" : messages.length} icon={<FaEnvelope />} color="#3B82F6" />
        <StatCard title="Unread" value={mLoading ? "—" : unreadCount} icon={<FaBell />} color="#EF4444" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent projects */}
        <div className="bg-[#0D2137] border border-[#1C3347] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C3347]">
            <h3 className="text-white font-semibold text-sm">Recent Projects</h3>
            <Link to="/admin/projects" className="text-[#00ED64] text-xs hover:underline">View all →</Link>
          </div>
          <div className="divide-y divide-[#1C3347]">
            {projects.slice(0, 5).map((p) => (
              <div key={p._id} className="flex items-center gap-3 px-6 py-3 hover:bg-[#112733] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#1C3347] flex items-center justify-center text-[#00ED64] font-bold text-xs flex-shrink-0">
                  {p.title?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{p.title}</p>
                  <p className="text-[#89979B] text-xs">{p.techStack?.slice(0, 3).join(", ")}</p>
                </div>
                {p.featured && <span className="text-xs text-[#F59E0B]">★</span>}
              </div>
            ))}
            {projects.length === 0 && (
              <p className="text-[#89979B] text-sm px-6 py-8 text-center">No projects yet</p>
            )}
          </div>
        </div>

        {/* Recent messages */}
        <div className="bg-[#0D2137] border border-[#1C3347] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C3347]">
            <h3 className="text-white font-semibold text-sm">Recent Messages</h3>
            <Link to="/admin/messages" className="text-[#00ED64] text-xs hover:underline">View all →</Link>
          </div>
          <div className="divide-y divide-[#1C3347]">
            {messages.slice(0, 5).map((m) => (
              <div key={m._id} className={`flex items-center gap-3 px-6 py-3 hover:bg-[#112733] transition-colors ${!m.read ? "bg-[#00ED64]/5" : ""}`}>
                <div className="w-8 h-8 rounded-full bg-[#1C3347] flex items-center justify-center text-[#89979B] font-bold text-xs flex-shrink-0">
                  {m.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${!m.read ? "text-white" : "text-[#89979B]"}`}>{m.name}</p>
                  <p className="text-[#89979B] text-xs truncate">{m.message?.substring(0, 45)}...</p>
                </div>
                {!m.read && <span className="w-2 h-2 rounded-full bg-[#00ED64] flex-shrink-0" />}
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-[#89979B] text-sm px-6 py-8 text-center">No messages yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;