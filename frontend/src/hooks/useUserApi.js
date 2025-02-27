import api from "../utils/api";

export const useUserApi = () => {
  const register = async (data) => {
    try {
      const response = await api.post("/api/auth/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post("/api/auth/login", credentials);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await api.get("/api/auth/profile");
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await api.get("/api/books/get-all-books");
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
    }
  };

  const fetchBook = async (bookId) => {
    try {
      const response = await api.get(`/api/books/get-book/${bookId}`);
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
    }
  };

  const likeBook = async (bookId) => {
    try {
      const response = await api.post(`/api/books/like-book/${bookId}`);
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
    }
  };

  const unlikeBook = async (bookId) => {
    try {
      const response = await api.post(`/api/books/unlike-book/${bookId}`);
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
    }
  };

  const createDownloadRequest = async (bookId, userId) => {
    try {
      const response = await api.post(
        "/api/download-requests/create-download-request",
        { bookId, userId }
      );
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
    }
  };

  const fetchDownloadRequests = async () => {
    try {
      const response = await api.get(
        "/api/download-requests/get-all-download-requests-by-user"
      );
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
    }
  };

  return {
    register,
    login,
    fetchUserProfile,
    fetchBooks,
    fetchBook,
    likeBook,
    unlikeBook,
    createDownloadRequest,
    fetchDownloadRequests,
  };
};
