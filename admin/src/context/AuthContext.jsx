import { createContext, useState, useEffect } from "react";
import { useAdminApi } from "../hooks/useAdminApi";
import axios from "axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { fetchDownloadRequests } = useAdminApi();
  const [user, setUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isDownloadPageOpen, setIsDownloadPageOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(true);
      getDownloadRequests();
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(true);
  };

  const getDownloadRequests = async () => {
    const response = await fetchDownloadRequests();
    if (response.success) {
      setNotificationCount(
        response.downloadRequests.filter(
          (request) => request.status === "pending"
        ).length
      );
    } else {
      toast.error(response.message);
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        notificationCount: isDownloadPageOpen ? 0 : notificationCount,
        logout,
        setIsDownloadPageOpen,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
