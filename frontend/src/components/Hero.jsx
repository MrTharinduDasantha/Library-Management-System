import heroImg from "../assets/hero_img.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      {/* Left Section */}
      <div className="md:w-1/2 space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Library Management System
        </h1>
        <p className="text-lg text-gray-600">
          Our Library Management System simplifies the process of managing and
          accessing books. Admins can upload, update, and manage books, while
          users can explore, like, and request books for reading or downloading.
          Join us to experience a seamless library experience !
        </p>
        <Link
          to="/about"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-300 ease-linear"
        >
          About Us
        </Link>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 mt-8 md:mt-0">
        <img
          src={heroImg}
          alt="Library Management System"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
