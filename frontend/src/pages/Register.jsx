import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useUserApi } from "../hooks/useUserApi";
import { FaUserCircle } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    profilePicture: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const { register } = useUserApi();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);
    if (formData.profilePicture) {
      data.append("profilePicture", formData.profilePicture);
    }

    const response = await register(data);
    if (response.success) {
      toast.success(response.message);
      navigate("/login");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/src/assets/background_img.jpg')` }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-10 bg-white/60 rounded shadow-md w-96 space-y-6 backdrop-blur-sm"
      >
        <h1 className="text-2xl font-bold text-center">User Register</h1>
        <div className="flex items-center justify-center">
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="profilePicture" className="cursor-pointer">
            {profileImagePreview ? (
              <img
                src={profileImagePreview}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center">
                <FaUserCircle size={60} className="text-gray-600" />
                <span className="text-gray-600 mt-2">
                  Upload a profile photo
                </span>
              </div>
            )}
          </label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="name"
            placeholder=" "
            value={formData.name}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 outline-none bg-transparent border-0 border-b-2 border-gray-400 focus:border-blue-600 peer"
          />
          <label className="absolute text-sm text-gray-600 transform -translate-y-6 scale-75 top-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            Name
          </label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type="email"
            name="email"
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 outline-none bg-transparent border-0 border-b-2 border-gray-400 focus:border-blue-600 peer"
          />
          <label className="absolute text-sm text-gray-600 transform -translate-y-6 scale-75 top-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email
          </label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder=" "
            value={formData.password}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 outline-none bg-transparent border-0 border-b-2 border-gray-400 focus:border-blue-600 peer"
          />
          <label className="absolute text-sm text-gray-600 transform -translate-y-6 scale-75 top-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-3 text-gray-500"
          >
            {showPassword ? (
              <MdVisibilityOff size={18} />
            ) : (
              <MdVisibility size={18} />
            )}
          </button>
        </div>
        <button className="w-full px-4 py-2 mt-2 bg-blue-500 text-white hover:bg-blue-800 transition-colors duration-300 ease-linear rounded cursor-pointer">
          Register
        </button>
        <div className="italic text-center">
          <span className="text-gray-600">Already have an account?</span>
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-800 hover:underline transition-colors duration-300 ease-linear ml-1"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
