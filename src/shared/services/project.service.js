import api from "../api/axios";

// ✅ No id — fetches ALL projects
export const getProjects = async () => {
  const res = await api.get("/projects");
  return res.data.data;
};

// ✅ Separate function for single project by id
export const getProjectById = async (id) => {
  if (!id) return null;
  const res = await api.get(`/projects/${id}`);
  return res.data.data;
};

export const createProject = async (formData) => {
  const res = await api.post("/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const updateProject = async (id, formData) => {
  const res = await api.put(`/projects/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const deleteProject = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};