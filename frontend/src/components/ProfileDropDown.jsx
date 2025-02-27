import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { IoLogOut } from "react-icons/io5";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import waveGif from "../assets/wave_hand.gif";

const ProfileDropDown = () => {
  const { userDetails, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close the profile dropdown when the notification dropdown is opened
  useEffect(() => {
    const handleNotificationDropdown = () => {
      setDropdownOpen(false);
    };

    // Add event listener to close profile dropdown when notification dropdown is opened
    window.addEventListener(
      "notificationDropdownOpen",
      handleNotificationDropdown
    );

    return () => {
      window.removeEventListener(
        "notificationDropdownOpen",
        handleNotificationDropdown
      );
    };
  }, []);

  // Open the profile dropdown and dispatch an event to close the notification dropdown
  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
    window.dispatchEvent(new Event("profileDropdownOpen"));
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2"
        onClick={handleProfileClick}
      >
        {userDetails?.profilePicture ? (
          <img
            src={`http://localhost:5000${userDetails.profilePicture}`}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="text-4xl text-gray-300" />
        )}
        {dropdownOpen ? (
          <IoMdArrowDropdownCircle className="hover:text-blue-400 transition-colors duration-300 ease-linear cursor-pointer" />
        ) : (
          <IoMdArrowDropupCircle className="hover:text-blue-400 transition-colors duration-300 ease-linear cursor-pointer" />
        )}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-4 w-48 bg-white text-black rounded-lg shadow-lg py-3">
          <div className="flex items-center px-4 py-2 border-b">
            <img src={waveGif} alt="Wave Hand" className="w-6 h-6 mr-2" />
            <span>Hello, {userDetails?.name}!</span>
          </div>
          <button
            className="flex items-center justify-center p-2 text-red-500 hover:text-red-700 w-full cursor-pointer"
            onClick={logout}
          >
            <IoLogOut />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
