import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white px-6 py-4  flex justify-between items-center">
      <div>
        &copy; {new Date().getFullYear()} Library Management System - All Rights
        Reserved
      </div>
      <div className="flex space-x-4">
        <FaFacebookSquare className="text-2xl hover:text-blue-400 transition-colors duration-300 ease-linear cursor-pointer" />
        <FaSquareWhatsapp className="text-2xl hover:text-green-400 transition-colors duration-300 ease-linear cursor-pointer" />
        <IoLogoYoutube className="text-2xl hover:text-red-400 transition-colors duration-300 ease-linear cursor-pointer" />
      </div>
    </footer>
  );
};

export default Footer;
