import { useContext } from "react";
import waveGif from "../assets/wave_hand.gif";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { userDetails } = useContext(AuthContext);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-10">
      {userDetails && (
        <div className="p-8 bg-white rounded-lg shadow-lg w-96">
          {/* Profile Picture or User Icon */}
          {userDetails.profilePicture ? (
            <img
              src={`http://localhost:5000${userDetails.profilePicture}`}
              alt="Profile Picture"
              className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-blue-400"
            />
          ) : (
            <FaUserCircle className="text-7xl text-gray-500 mx-auto" />
          )}

          {/* Name and Wave Hand Animation */}
          <h1 className="text-2xl font-bold mt-4 flex items-center justify-center">
            Hello, {userDetails.name} !
            <img
              src={waveGif}
              alt="Wave Hand Animation"
              className="ml-2 w-10 h-10 mb-2"
            />
          </h1>
        </div>
      )}
    </div>
  );
};

export default Profile;
