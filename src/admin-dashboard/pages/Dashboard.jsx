import AdminLayout from "../layout/AdminLayout";
import DashboardSummary from "../components/Dashboard";
import { useProjects } from "../../shared/hooks/useProjects";
import { useMessages } from "../../shared/hooks/useMessages";

const DashboardPage = () => {
  const { projects, loading: pLoading } = useProjects();
  const { messages, unreadCount, loading: mLoading } = useMessages();

  return (
    <AdminLayout>
      <div className="space-y-2 mb-8">
        <h1 className="text-white text-2xl font-bold">Overview</h1>
        <p className="text-[#89979B] text-sm">Welcome back — here's your portfolio at a glance.</p>
      </div>
      <DashboardSummary
        projects={projects}
        messages={messages}
        unreadCount={unreadCount}
        pLoading={pLoading}
        mLoading={mLoading}
      />
    </AdminLayout>
  );
};

export default DashboardPage;