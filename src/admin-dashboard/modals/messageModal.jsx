import { FaTimes, FaReply, FaEnvelope } from "react-icons/fa";
import { useEffect } from "react";

const MessageModal = ({ isOpen, onClose, message, onMarkRead }) => {
  useEffect(() => {
    if (isOpen && message && !message.read) onMarkRead(message._id);
  }, [isOpen, message]);

  if (!isOpen || !message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0D2137] border border-[#1C3347] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C3347]">
          <div className="flex items-center gap-2 text-white font-semibold">
            <FaEnvelope className="text-[#00ED64]" />
            Message
          </div>
          <button onClick={onClose} className="p-2 text-[#89979B] hover:text-white hover:bg-[#1C3347] rounded-lg transition-colors">
            <FaTimes size={13} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Sender card */}
          <div className="flex items-center gap-4 p-4 bg-[#001E2B] rounded-xl border border-[#1C3347]">
            <div className="w-12 h-12 rounded-full bg-[#00ED64]/20 flex items-center justify-center text-[#00ED64] font-bold text-lg flex-shrink-0">
              {message.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">{message.name}</p>
              <a href={`mailto:${message.email}`} className="text-[#00ED64] text-sm hover:underline truncate block">
                {message.email}
              </a>
            </div>
            <p className="text-[#89979B] text-xs text-right flex-shrink-0">
              {new Date(message.createdAt).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              })}
              <br />
              {new Date(message.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit", minute: "2-digit",
              })}
            </p>
          </div>

          {/* Subject */}
          {message.subject && (
            <div>
              <p className="text-[#89979B] text-xs font-semibold uppercase tracking-wider mb-1">Subject</p>
              <p className="text-white text-sm font-medium">{message.subject}</p>
            </div>
          )}

          {/* Body */}
          <div>
            <p className="text-[#89979B] text-xs font-semibold uppercase tracking-wider mb-2">Message</p>
            <div className="bg-[#001E2B] rounded-xl border border-[#1C3347] p-4">
              <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{message.message}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#1C3347] flex justify-end">
          <a
            href={`mailto:${message.email}?subject=Re: ${message.subject || "Your message"}`}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#00ED64] hover:bg-[#00ED64]/90 text-[#001E2B] text-sm font-bold rounded-lg transition-colors active:scale-95"
          >
            <FaReply size={12} />
            Reply via Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;