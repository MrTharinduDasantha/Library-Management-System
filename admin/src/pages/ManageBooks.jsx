import { useEffect, useState } from "react";
import { FaEdit, FaSadTear } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAdminApi } from "../hooks/useAdminApi";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchBooks, deleteBook } = useAdminApi();

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    setLoading(true);
    const response = await fetchBooks();
    if (response.success) {
      setBooks(response.books);
    } else {
      toast.error(response.message, {
        position: "bottom-right",
      });
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const response = await deleteBook(id);
    if (response.success) {
      toast.success(response.message, {
        position: "bottom-right",
      });
      fetchAllBooks();
    } else {
      toast.error(response.message, {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <LoadingSpinner />
        </div>
      ) : books.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[80vh] text-gray-600">
          <FaSadTear className="text-5xl mb-2" />
          <p className="text-xl">No books found</p>
        </div>
      ) : (
        <div className="relative overflow-x-auto">
          <table className=" w-full text-sm text-left rtl:text-right border border-gray-200 text-gray-500">
            <thead className="text-xs text-gray-700 uppercase border-b border-gray-200 bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Author
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Likes
                </th>
                <th scope="col" className="px-6 py-3">
                  Book Upload Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Cover Image
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr
                  key={book._id}
                  className="bg-white border-b border-gray-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {book.title}
                  </td>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">{book.category}</td>
                  <td className="px-6 py-4">{book.likes}</td>
                  <td className="px-6 py-4">
                    {new Date(book.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <img
                        src={`http://localhost:5000${book.coverImage}`}
                        alt={book.title}
                        className="w-16 h-24 object-fill"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/edit-book/${book._id}`}
                        className="text-2xl p-1 text-blue-500 hover:bg-blue-700 hover:text-white transition-colors duration-300 ease-linear"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="text-2xl p-1 text-red-500 hover:bg-red-700 hover:text-white transition-colors duration-300 ease-linear cursor-pointer"
                      >
                        <RiDeleteBin5Fill />
                      </button>
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

export default ManageBooks;
