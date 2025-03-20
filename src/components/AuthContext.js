import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (token) {
        try {
          setCurrentUser({
            id: localStorage.getItem("user_id"),
            username: localStorage.getItem("username"),
            role: localStorage.getItem("role")
          });
        } catch (error) {
          console.error("Auth verification failed:", error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, [token]);

  const login = async (credentials) => {
    const response = await axios.post("http://localhost:8000/api/login/", credentials);
    const { token, user_id, username, role } = response.data;
   
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_id", user_id);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);

    setToken(token);
    setCurrentUser({ id: user_id, username, role });
    
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    
    setToken(null);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isAuthenticated: !!token,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};