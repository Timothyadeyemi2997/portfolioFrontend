import UnreadBadge from "./UnreadBadge";
import { FaTrash, FaEye } from "react-icons/fa";

const MessageTable = ({ messages, loading, onView, onDelete,}) => {
  if (loading) {
  return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#00ED64] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#0D2137] border border-[#1C3347] rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[#1C3347]">
        <h2 className="text-white font-semibold">Client Messages</h2>
        <p className="text-[#89979B] text-xs mt-0.5">{messages.length} total</p>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-52 text-[#89979B] gap-2">
          <p className="text-base font-medium text-white">No messages yet</p>
          <p className="text-sm">Messages from your contact form will appear here</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1C3347]">
                {["Sender", "Preview", "Status", "Date", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold text-[#89979B] uppercase tracking-wider px-4 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg._id}
                  className={`border-b border-[#1C3347] hover:bg-[#112733] transition-colors group ${
                    !msg.read ? "bg-[#00ED64]/5" : ""
                  }`}
                >
                  <td className="py-4 px-4">
                    <p className={`text-sm font-medium ${!msg.read ? "text-white" : "text-[#89979B]"}`}>
                      {msg.name}
                    </p>
                    <p className="text-[#89979B] text-xs">{msg.email}</p>
                  </td>
                  <td className="py-4 px-4 max-w-xs">
                    <p className={`text-sm truncate ${!msg.read ? "text-white" : "text-[#89979B]"}`}>
                      {msg.subject || msg.message?.substring(0, 60) + "..."}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    {msg.read ? (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#1C3347] text-[#89979B]">
                        Read
                      </span>
                    ) : (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#00ED64]/10 text-[#00ED64] border border-[#00ED64]/20 font-semibold">
                        New
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-[#89979B] text-sm whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onView(msg)}
                        className="p-2 rounded-lg text-[#89979B] hover:text-[#00ED64] hover:bg-[#00ED64]/10 transition-colors"
                      >
                        <FaEye size={12} />
                      </button>
                      <button
                        onClick={() => onDelete(msg._id)}
                        className="p-2 rounded-lg text-[#89979B] hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MessageTable;