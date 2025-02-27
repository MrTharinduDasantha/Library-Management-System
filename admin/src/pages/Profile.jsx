import { useEffect, useState } from "react";
import { useAdminApi } from "../hooks/useAdminApi";
import waveGif from "../assets/wave_hand.gif";
import { FaUserCircle, FaSadTear } from "react-icons/fa";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const Profile = () => {
  const { fetchUserProfile } = useAdminApi();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      const response = await fetchUserProfile();
      if (response.success) {
        setUser(response.user);
      } else {
        toast.error(response.message);
      }
      setLoading(false);
    };
    getUserProfile();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-10">
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <LoadingSpinner />
        </div>
      ) : user ? (
        <div className="p-8 bg-white rounded-lg shadow-lg w-96">
          {/* Profile Picture or User Icon */}
          {user.profilePicture ? (
            <img
              src={`http://localhost:5000${user.profilePicture}`}
              alt="Profile Picture"
              className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-blue-400"
            />
          ) : (
            <FaUserCircle className="text-7xl text-gray-500 mx-auto" />
          )}

          {/* Name and Wave Hand Animation */}
          <h1 className="text-2xl font-bold mt-4 flex items-center justify-center">
            Hello, {user.name} !
            <img
              src={waveGif}
              alt="Wave Hand Animation"
              className="ml-2 w-10 h-10 mb-2"
            />
          </h1>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[80vh] text-gray-600">
          <FaSadTear className="text-5xl mb-2" />
          <p className="text-xl">No user data found</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
