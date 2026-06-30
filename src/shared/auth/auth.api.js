import api from "../api/axios";

export const loginRequest = (credentials) =>
  api.post("/auth/login", credentials);

export const getMeRequest = () =>
  api.get("/auth/me");