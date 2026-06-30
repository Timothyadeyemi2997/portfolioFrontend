import {
  loginRequest,
  getMeRequest,
} from "./auth.api";

export const login = async (
  credentials
) => {
  const { data } =
    await loginRequest(credentials);

  localStorage.setItem(
    "token",
    data.data.token
  );

  return data;
};

export const getCurrentUser =
  async () => {
    const { data } =
      await getMeRequest();

    return data;
  };

export const logout = () => {
  localStorage.removeItem("token");
};