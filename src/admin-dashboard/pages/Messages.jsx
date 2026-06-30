import { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import MessageTable from "../components/MessageTable";
import MessageModal from "../modals/messageModal";
import { useMessages } from "../../shared/hooks/useMessages";

const MessagesPage = () => {
  const { messages, loading, markAsRead, deleteMessage } = useMessages();
  const [selectedMsg, setSelectedMsg] = useState(null);

  return (
    <AdminLayout>
      <div className="space-y-2 mb-8">
        <h1 className="text-white text-2xl font-bold">Messages</h1>
        <p className="text-[#89979B] text-sm">View and respond to inquiries from clients.</p>
      </div>

      <MessageTable
        messages={messages}
        loading={loading}
        onView={setSelectedMsg}
        onDelete={deleteMessage}
      />

      <MessageModal
        isOpen={!!selectedMsg}
        onClose={() => setSelectedMsg(null)}
        message={selectedMsg}
        onMarkRead={markAsRead}
      />
    </AdminLayout>
  );
};

export default MessagesPage;