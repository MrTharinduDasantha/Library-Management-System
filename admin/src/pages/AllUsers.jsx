import { useEffect, useState } from "react";
import { useAdminApi } from "../hooks/useAdminApi";
import toast from "react-hot-toast";
import { FaUserCircle, FaSadTear } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchAllUsers } = useAdminApi();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    setLoading(true);
    const response = await fetchAllUsers();
    if (response.success) {
      setUsers(response.users);
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <LoadingSpinner />
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[80vh] text-gray-600">
          <FaSadTear className="text-5xl mb-2" />
          <p className="text-xl">No users found</p>
        </div>
      ) : (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 text-gray-500">
            <thead className="text-xs text-gray-700 uppercase border-b border-gray-200 bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Accout Creation Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Profile Picture
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white border-b border-gray-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4 ">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      {user.profilePicture ? (
                        <img
                          src={`http://localhost:5000${user.profilePicture}`}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <FaUserCircle className="w-12 h-12 text-gray-400" />
                      )}
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

export default AllUsers;
