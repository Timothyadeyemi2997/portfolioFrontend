import {
  sendMessageRequest,
} from "./contact.api";

export const sendMessage =
  async (payload) => {
    const { data } =
      await sendMessageRequest(
        payload
      );

    return data;
  };