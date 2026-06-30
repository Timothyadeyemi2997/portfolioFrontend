import api from "../../api/axios";

export const sendMessageRequest =
  (payload) =>
    api.post(
      "/contact",
      payload
    );