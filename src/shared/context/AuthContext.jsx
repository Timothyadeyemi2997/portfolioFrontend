/* @refresh reset */
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ ProtectedRoute needs this

  useEffect(() => {
    // Rehydrate auth state from localStorage on app load
    const token = localStorage.getItem("adminToken");
    if ( token) {
      api.get("/auth/me")
        .then((res) => setAdmin(res.data.data ?? res.data))
        .catch(() => {
          localStorage.removeItem("adminToken"); 
          setAdmin(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

    const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("adminToken", res.data.token);
    setAdmin(res.data.admin);
    return res.data;
  };

    const logout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        login,
        logout,
        loading,           // ProtectedRoute uses this
        isAuthenticated: !!admin, // ✅ ProtectedRoute uses this
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
