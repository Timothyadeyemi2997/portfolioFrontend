import { useState } from "react";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, projectTitle }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try { await onConfirm(); onClose(); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0D2137] border border-[#1C3347] rounded-2xl w-full max-w-sm shadow-2xl p-6">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-[#89979B] hover:text-white hover:bg-[#1C3347] rounded-lg transition-colors">
          <FaTimes size={13} />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="text-red-400 text-2xl" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-base mb-1">Delete Project</h3>
            <p className="text-[#89979B] text-sm leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="text-white font-semibold">"{projectTitle}"</span>?
              This action is permanent and cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm text-[#89979B] hover:text-white bg-[#1C3347] hover:bg-[#1C3347]/80 rounded-lg transition-colors font-medium">
            Cancel
          </button>
          <button onClick={handleConfirm} disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50 active:scale-95">
            {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;