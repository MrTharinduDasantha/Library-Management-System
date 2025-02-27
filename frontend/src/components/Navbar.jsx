import { Link, useLocation, useSearchParams } from "react-router-dom";
import { ImLibrary } from "react-icons/im";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import DownloadRequestNotification from "./DownloadRequestNotification";
import ProfileDropDown from "./ProfileDropDown";

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const location = useLocation();

  useEffect(() => {
    if (searchTerm.trim()) {
      setSearchParams({ search: searchTerm });
    } else {
      setSearchParams({});
    }
  }, [searchTerm, setSearchParams]);

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <nav className="w-full flex items-center justify-between bg-gray-800 px-6 py-4 text-white z-50">
      {/* Left Side */}
      <Link to="/" className="flex items-center space-x-3 hover:text-blue-400">
        <ImLibrary className="text-2xl" />
        <span className="text-xl font-extrabold">L M S</span>
      </Link>

      {/* Search Bar (Only on "/books" route) */}
      {location.pathname === "/books" && (
        <div className="relative flex items-center w-72">
          <FaSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            className="w-full px-10 py-2 text-white bg-gray-700 rounded-lg focus:outline-none"
            placeholder="Search for book ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Right Side */}
      <div className="flex items-center space-x-8">
        {location.pathname !== "/books" && location.pathname !== "/about" && (
          <>
            <button
              onClick={() => handleScroll("services-section")}
              className="hover:text-blue-400 transition-colors duration-300 ease-linear cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => handleScroll("category-section")}
              className="hover:text-blue-400 transition-colors duration-300 ease-linear cursor-pointer"
            >
              Category
            </button>
            <button
              onClick={() => handleScroll("testimonials-section")}
              className="hover:text-blue-400 transition-colors duration-300 ease-linear cursor-pointer"
            >
              Testimonials
            </button>
          </>
        )}

        <Link
          to="/books"
          className={`${
            location.pathname === "/books"
              ? "text-blue-400"
              : "hover:text-blue-400 transition-colors duration-300 ease-linear cursor-pointer"
          }`}
        >
          Books
        </Link>
        <Link
          to="/about"
          className={`${
            location.pathname === "/about"
              ? "text-blue-400"
              : "hover:text-blue-400 transition-colors duration-300 ease-linear cursor-pointer"
          }`}
        >
          About Us
        </Link>

        {/* Download Request Notification  */}
        <DownloadRequestNotification />

        {/* Profile Dropdown */}
        <ProfileDropDown />
      </div>
    </nav>
  );
};

export default Navbar;
