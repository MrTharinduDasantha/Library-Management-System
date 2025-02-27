import { useEffect, useState, useContext } from "react";
import { FaCheckCircle, FaRegCheckCircle, FaSadTear } from "react-icons/fa";
import { useAdminApi } from "../hooks/useAdminApi";
import LoadingSpinner from "./LoadingSpinner";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const DownloadRequests = () => {
  const {
    fetchDownloadRequests,
    acceptDownloadRequest,
    rejectDownloadRequest,
  } = useAdminApi();
  const [downloadRequests, setDownloadRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setIsDownloadPageOpen } = useContext(AuthContext);

  useEffect(() => {
    setIsDownloadPageOpen(true);
    fetchAllDownloadRequests();
  }, []);

  const fetchAllDownloadRequests = async () => {
    setLoading(true);
    const response = await fetchDownloadRequests();
    if (response.success) {
      setDownloadRequests(response.downloadRequests);
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  const handleAcceptDownloadRequest = async (id) => {
    const response = await acceptDownloadRequest(id);
    if (response.success) {
      updateRequestStatus(id, "accepted");
      toast.success(response.message, {
        position: "bottom-right",
      });
    } else {
      toast.error(response.message, {
        position: "bottom-right",
      });
    }
  };

  const handleRejectDownloadRequest = async (id) => {
    const response = await rejectDownloadRequest(id);
    if (response.success) {
      updateRequestStatus(id, "rejected");
      toast.success(response.message, {
        position: "bottom-right",
      });
    } else {
      toast.error(response.message, {
        position: "bottom-right",
      });
    }
  };

  const updateRequestStatus = (id, status) => {
    setDownloadRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === id ? { ...request, status } : request
      )
    );
  };

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <LoadingSpinner />
        </div>
      ) : downloadRequests.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[80vh] text-gray-600">
          <FaSadTear className="text-5xl mb-2" />
          <p className="text-xl">No book download request found</p>
        </div>
      ) : (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 text-gray-500">
            <thead className="text-xs text-gray-700 uppercase border-b border-gray-200 bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Book Download Request
                </th>
              </tr>
            </thead>
            <tbody>
              {downloadRequests.map((request) => (
                <tr
                  key={request._id}
                  className="bg-white border-b border-gray-200"
                >
                  <td className="px-6 py-4">{request.bookId.title}</td>
                  <td className="px-6 py-4">{request.userId.name}</td>
                  <td className="px-6 py-4">{request.bookId.category}</td>
                  <td className="px-6 py-4">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleAcceptDownloadRequest(request._id)}
                        disabled={request.status === "accepted"}
                        className={`flex items-center text-green-500 ${
                          request.status === "accepted"
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        <span className="mr-1">Accept</span>
                        {request.status === "accepted" ? (
                          <FaCheckCircle size={17} />
                        ) : (
                          <FaRegCheckCircle size={17} />
                        )}
                      </button>
                      <button
                        onClick={() => handleRejectDownloadRequest(request._id)}
                        disabled={request.status === "rejected"}
                        className={`flex items-center text-red-500 ${
                          request.status === "rejected"
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        <span className="mr-1">Reject</span>
                        {request.status === "rejected" ? (
                          <FaCheckCircle size={17} />
                        ) : (
                          <FaRegCheckCircle size={17} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DownloadRequests;
