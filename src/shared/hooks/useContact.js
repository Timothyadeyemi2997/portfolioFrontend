import { useState } from "react";

import * as service from "../../features/contact/contact.service";

export const useContact = () => {
  const [loading, setLoading] =
    useState(false);

  const submitContact =
    async (payload) => {
      try {
        setLoading(true);

        return await service.sendMessage(
          payload
        );
      } finally {
        setLoading(false);
      }
    };

  return {
    loading,
    submitContact,
  };
};