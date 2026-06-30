import { useState } from "react";
import * as projectService from "../../shared/services/project.service";
import UploadDropzone from "../../shared/components/ui/uploadDropzone";
import ImagePreview from "../../shared/components/ImagePreview";

const INITIAL = { title: "", description: "", techStack: "", liveUrl: "", githubUrl: "", featured: false, image: null };

const CreateProjectModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState(INITIAL);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim()) return setError("Title is required");

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("techStack", JSON.stringify(form.techStack.split(",").map((t) => t.trim()).filter(Boolean)));
    data.append("liveUrl", form.liveUrl);
    data.append("githubUrl", form.githubUrl);
    data.append("featured", form.featured);
    if (form.image) data.append("image", form.image);

    try {
      setLoading(true);
      await onSubmit(data);
      setForm(INITIAL);
      setPreview(null);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0D2137] border border-[#1C3347] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C3347]">
          <h3 className="text-white font-semibold text-base">New Project</h3>
          <button onClick={onClose} className="p-2 text-[#89979B] hover:text-white hover:bg-[#1C3347] rounded-lg transition-colors">
            <FaTimes size={13} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">{error}</div>
          )}

          {/* Image */}
          <div>
            <label className="block text-[#89979B] text-sm font-medium mb-2">Project Image</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#1C3347] rounded-xl cursor-pointer hover:border-[#00ED64]/50 hover:bg-[#00ED64]/5 transition-all overflow-hidden">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-[#89979B]">
                  <FaCloudUploadAlt size={24} />
                  <span className="text-sm">Click to upload</span>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
            </label>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[#89979B] text-sm font-medium mb-2">Title <span className="text-red-400">*</span></label>
            <input type="text" name="title" value={form.title} onChange={handleChange}
              placeholder="e.g. Portfolio Website"
              className="w-full bg-[#001E2B] border border-[#1C3347] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#89979B] focus:outline-none focus:border-[#00ED64]/50 transition-colors" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#89979B] text-sm font-medium mb-2">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3}
              placeholder="Briefly describe the project..."
              className="w-full bg-[#001E2B] border border-[#1C3347] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#89979B] focus:outline-none focus:border-[#00ED64]/50 transition-colors resize-none" />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-[#89979B] text-sm font-medium mb-2">
              Tech Stack <span className="text-xs font-normal text-[#89979B]/60">(comma separated)</span>
            </label>
            <input type="text" name="techStack" value={form.techStack} onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full bg-[#001E2B] border border-[#1C3347] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#89979B] focus:outline-none focus:border-[#00ED64]/50 transition-colors" />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#89979B] text-sm font-medium mb-2">Live URL</label>
              <input type="url" name="liveUrl" value={form.liveUrl} onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-[#001E2B] border border-[#1C3347] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#89979B] focus:outline-none focus:border-[#00ED64]/50 transition-colors" />
            </div>
            <div>
              <label className="block text-[#89979B] text-sm font-medium mb-2">GitHub URL</label>
              <input type="url" name="githubUrl" value={form.githubUrl} onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full bg-[#001E2B] border border-[#1C3347] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#89979B] focus:outline-none focus:border-[#00ED64]/50 transition-colors" />
            </div>
          </div>

          {/* Featured */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange}
              className="w-4 h-4 accent-[#00ED64]" />
            <span className="text-[#89979B] text-sm">Mark as featured project</span>
          </label>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#1C3347]">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-sm text-[#89979B] hover:text-white hover:bg-[#1C3347] rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-[#00ED64] hover:bg-[#00ED64]/90 text-[#001E2B] text-sm font-bold rounded-lg transition-colors disabled:opacity-50 active:scale-95">
            {loading && <div className="w-4 h-4 border-2 border-[#001E2B] border-t-transparent rounded-full animate-spin" />}
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;