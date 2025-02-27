import { createContext, useState, useEffect } from "react";
import { useUserApi } from "../hooks/useUserApi";
import axios from "axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { fetchUserProfile, fetchDownloadRequests } = useUserApi();
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [downloadRequests, setDownloadRequests] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(true);
      getUserDetails();
      getDownloadRequests();
    }
    setLoading(false);
  }, []);

  const getUserDetails = async () => {
    const response = await fetchUserProfile();
    if (response.success) {
      setUserDetails(response.user);
    } else {
      toast.error(response.message);
    }
  };

  const getDownloadRequests = async () => {
    const response = await fetchDownloadRequests();
    if (response.success) {
      setDownloadRequests(response.downloadRequests);
      setNotificationCount(response.downloadRequests.length);
    } else {
      toast.error(response.message);
    }
  };

  const login = async (token) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(true);

    const response = await fetchUserProfile();
    if (response.success) {
      setUserDetails(response.user);
      await getDownloadRequests();
    } else {
      toast.error(response.message);
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setDownloadRequests([]);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        downloadRequests,
        notificationCount,
        getDownloadRequests,
        user,
        loading,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
