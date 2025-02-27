import api from "../utils/api";

export const useAdminApi = () => {
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

  const addBook = async (formData) => {
    try {
      const response = await api.post("/api/books/add-book", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
    }
  };

  const updateBook = async (id, formData) => {
    try {
      const response = await api.put(`/api/books/update-book/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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

  const fetchBookById = async (id) => {
    try {
      const response = await api.get(`/api/books/get-book/${id}`);
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await api.delete(`/api/books/delete-book/${id}`);
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await api.get("/api/auth/users");
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
    }
  };

  const fetchDownloadRequests = async () => {
    try {
      const response = await api.get(
        "/api/download-requests/get-all-download-requests"
      );
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
    }
  };

  const acceptDownloadRequest = async (id) => {
    try {
      const response = await api.put(
        `/api/download-requests/accept-download-request/${id}`
      );
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
    }
  };

  const rejectDownloadRequest = async (id) => {
    try {
      const response = await api.put(
        `/api/download-requests/reject-download-request/${id}`
      );
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
    }
  };
  return {
    fetchUserProfile,
    register,
    login,
    addBook,
    updateBook,
    fetchBooks,
    fetchBookById,
    deleteBook,
    fetchAllUsers,
    fetchDownloadRequests,
    acceptDownloadRequest,
    rejectDownloadRequest,
  };
};
