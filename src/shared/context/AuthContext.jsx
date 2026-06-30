import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ ProtectedRoute needs this

  useEffect(() => {
    // Rehydrate auth state from localStorage on app load
    const token = localStorage.getItem("adminToken");
    if ( token) {
      api.get("/admin/me")
        .then((res) => setAdmin(res.data))
        .catch(() => localStorage.removeItem("adminToken"))
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
        token,
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

export const useAuth = () => useContext (AuthContext);
export const useAuthContext = () => useContext(AuthContext);