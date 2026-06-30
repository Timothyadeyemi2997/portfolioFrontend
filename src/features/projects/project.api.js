import api from "../../shared/api/axios";

export const getProjectsRequest =
  () => api.get("/projects");

export const createProjectRequest = (
  formData
) =>
  api.post(
    "/projects",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

export const updateProjectRequest = (
  id,
  formData
) =>
  api.put(
    `/projects/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

export const deleteProjectRequest = (
  id
) =>
  api.delete(
    `/projects/${id}`
  );