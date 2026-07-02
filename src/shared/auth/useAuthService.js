import { useState } from "react";
import * as authService from "./auth.service";

export const useAuth = () => {
  const [loading, setLoading] =
    useState(false);

  const loginUser = async (
    credentials
  ) => {
    try {
      setLoading(true);

      const data =
        await authService.login(
          credentials
        );

      return data;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    authService.logout();
  };

  return {
    loading,
    loginUser,
    logoutUser,
  };
};