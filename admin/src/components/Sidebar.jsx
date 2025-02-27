import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFileUpload, FaUsers } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { ImBooks, ImLibrary } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { notificationCount, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(navigate);
  };
  return (
    <div className="h-screen flex flex-col bg-gray-800 w-52">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center my-5">
        <Link
          to="/profile"
          className={`flex items-center space-x-3 ${
            location.pathname === "/profile" ? "text-blue-400" : "text-white"
          } hover:text-blue-400 transition-colors duration-300 ease-linear`}
        >
          <ImLibrary className="text-2xl" />
          <span className="text-2xl font-extrabold">L M S</span>
        </Link>
        <hr className="w-full border-[1px] border-white mt-5" />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-5 mt-3 ml-5">
        <Link
          to="/manage-books/add"
          className={`flex items-center space-x-3 ${
            location.pathname === "/manage-books/add"
              ? "text-blue-400"
              : "text-white"
          } hover:text-blue-400 transition-colors duration-300 ease-linear`}
        >
          <FaFileUpload className="text-lg" />
          <span className="text-lg font-semibold">Add Book</span>
        </Link>

        <Link
          to="/manage-books"
          className={`flex items-center space-x-3 ${
            location.pathname === "/manage-books"
              ? "text-blue-400"
              : "text-white"
          } hover:text-blue-400 transition-colors duration-300 ease-linear`}
        >
          <ImBooks className="text-lg" />
          <span className="text-lg font-semibold">All Books</span>
        </Link>

        <Link
          to="/all-users"
          className={`flex items-center space-x-3 ${
            location.pathname === "/all-users" ? "text-blue-400" : "text-white"
          } hover:text-blue-400 transition-colors duration-300 ease-linear`}
        >
          <FaUsers className="text-lg" />
          <span className="text-lg font-semibold">All Users</span>
        </Link>

        <Link
          to="/notifications"
          className={`relative flex items-center space-x-3 ${
            location.pathname === "/notifications"
              ? "text-blue-400"
              : "text-white"
          } hover:text-blue-400 transition-colors duration-300 ease-linear`}
        >
          <IoNotificationsSharp className="text-xl" />
          <span className="text-lg font-semibold">Notifications</span>
          {notificationCount > 0 && (
            <span className="absolute -top-1 left-2 bg-red-500 text-white text-xs rounded-full px-1">
              {notificationCount}
            </span>
          )}
        </Link>

        <div
          className="flex items-center space-x-3 cursor-pointer text-white hover:text-red-500 transition-colors duration-300 ease-linear"
          onClick={handleLogout}
        >
          <IoLogOut className="text-lg" />
          <span className="text-lg font-semibold">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
