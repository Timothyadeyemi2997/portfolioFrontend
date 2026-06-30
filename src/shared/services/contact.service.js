import api from "../api/axios";


export const sendMessage = async (
  data
) => {
  const response =
    await api.post(
      "/contact",
      data
    );

    return response.data;
  };

export const getMessages = async () => {
  const response = await api.get("/contact");
  return response.data.data;
};

export const getMessage = async (id) => {
  const response = await api.get(
    `/contact/${id}`
  );

  return response.data.data;
};

export const deleteMessage = async (
  id
) => {
  const response = await api.delete(
    `/contact/${id}`
  );

  return response.data;
};

export const markAsRead = async (
  id
) => {
  const response = await api.patch(
    `/contact/${id}/read`
  );

  return response.data;
};