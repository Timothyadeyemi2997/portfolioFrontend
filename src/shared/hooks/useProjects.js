import { useEffect, useState, useCallback } from "react";
import * as projectService from "../services/project.service";
import api from "../api/axios";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ─── GET ALL PROJECTS ──────────────────────────────────────────────
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/projects");
      setProjects(res.data.data ?? res.data);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch projects";
      setError(message);
      console.error("[useProjects] GET /projects:", message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ─── CREATE PROJECT ────────────────────────────────────────────────
  const createProject = async (formData) => {
    try {
      const res = await api.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const created = res.data.data ?? res.data;
      setProjects((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create project";
      console.error("[useProjects] POST /projects:", message);
      throw err;
    }
  };

  // ─── UPDATE PROJECT ────────────────────────────────────────────────
  const updateProject = async (id, formData) => {
    try {
      const res = await api.put(`/projects/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updated = res.data.data ?? res.data;
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? updated : p))
      );
      return updated;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update project";
      console.error("[useProjects] PUT /projects/:id:", message);
      throw err;
    }
  };

  // ─── DELETE PROJECT ────────────────────────────────────────────────
  const deleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete project";
      console.error("[useProjects] DELETE /projects/:id:", message);
      throw err;
    }
  };

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  };
}

export const useProjectsContext = useProjects;