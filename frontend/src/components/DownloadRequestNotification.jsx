import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { IoNotificationsSharp } from "react-icons/io5";
import { RiEmotionHappyLine, RiEmotionUnhappyLine } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import { FaSadTear } from "react-icons/fa";

const DownloadRequestNotification = () => {
  const { downloadRequests, notificationCount } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showNotificationCount, setShowNotificationCount] = useState(true);

  // Close the notification dropdown when the profile dropdown is opened
  useEffect(() => {
    const handleProfileDropdown = () => {
      setIsOpen(false);
    };

    // Add event listener to close notification dropdown when profile dropdown is opened
    window.addEventListener("profileDropdownOpen", handleProfileDropdown);

    return () => {
      window.removeEventListener("profileDropdownOpen", handleProfileDropdown);
    };
  }, []);

  // Close the profile dropdown when the notification dropdown is opened
  const handleNotificationClick = () => {
    setIsOpen(!isOpen);
    setShowNotificationCount(false);
    window.dispatchEvent(new Event("notificationDropdownOpen"));
  };

  useEffect(() => {
    if (notificationCount > 0) {
      setShowNotificationCount(true);
    }
  }, [notificationCount]);
  return (
    <div className="relative">
      <button onClick={handleNotificationClick} className="mt-2">
        <IoNotificationsSharp className="text-2xl hover:text-blue-400 transition-colors duration-300 ease-linear cursor-pointer" />
        {showNotificationCount && notificationCount > 0 && (
          <span className="absolute top-1 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {notificationCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-5 w-64 bg-white text-black rounded-lg shadow-lg py-3">
          {downloadRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-4">
              <FaSadTear className="text-2xl text-gray-500" />
              <p className="text-gray-600 mt-2">No new notifications</p>
            </div>
          ) : (
            <div
              className={`max-h-60 overflow-y-auto ${
                downloadRequests.length > 3 && ""
              }`}
            >
              {downloadRequests.map((request, index) => (
                <div
                  key={request._id}
                  className={`px-4 py-2 text-center ${
                    index !== downloadRequests.length - 1
                      ? "border-b border-x-gray-800"
                      : ""
                  }`}
                >
                  <p className="font-semibold text-sm">
                    {request.bookId.title}
                  </p>
                  <div
                    className={`flex items-center justify-center mt-2 rounded-lg ${
                      request.status === "accepted"
                        ? "text-green-700"
                        : request.status === "rejected"
                        ? "text-red-700"
                        : "text-blue-700"
                    }`}
                  >
                    {request.status === "accepted" ? (
                      <RiEmotionHappyLine className="mr-2" />
                    ) : request.status === "rejected" ? (
                      <RiEmotionUnhappyLine className="mr-2" />
                    ) : (
                      <IoIosSend className="mr-2" />
                    )}
                    <p className="text-sm">
                      Request{" "}
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DownloadRequestNotification;
