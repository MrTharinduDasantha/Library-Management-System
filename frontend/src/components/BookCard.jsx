import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaRegHeart, FaHeart, FaBookReader } from "react-icons/fa";
import { RiEmotionHappyFill, RiEmotionUnhappyFill } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import { MdFileDownload, MdFileDownloadOff } from "react-icons/md";
import { TiDownload } from "react-icons/ti";
import { useUserApi } from "../hooks/useUserApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BookCard = ({ book, user }) => {
  const [likes, setLikes] = useState(book.likes);
  const [isLiked, setIsLiked] = useState(book.likedBy.includes(user._id));
  const [downloadStatus, setDownloadStatus] = useState();
  const { downloadRequests, getDownloadRequests } = useContext(AuthContext);
  const { likeBook, unlikeBook, createDownloadRequest } = useUserApi();
  const navigate = useNavigate();

  useEffect(() => {
    // Check the status of the download request for this book and user
    const request = downloadRequests.find(
      (req) => req.bookId._id === book._id && req.userId._id === user._id
    );
    if (request) {
      setDownloadStatus(request.status);
    }
  }, [downloadRequests, book._id, user._id]);

  const handleLike = async () => {
    const response = await likeBook(book._id);
    if (response.success) {
      setLikes(response.book.likes);
      setIsLiked(true);
      toast.success(
        <div className="flex items-center text-green-500">
          <RiEmotionHappyFill className="mr-2 text-lg" />
          <span className="text-sm">Reaction Added</span>
        </div>,
        { icon: false, position: "bottom-center", duration: 3000 }
      );
    } else {
      toast.error(response.message);
    }
  };

  const handleUnlike = async () => {
    const response = await unlikeBook(book._id);
    if (response.success) {
      setLikes(response.book.likes);
      setIsLiked(false);
      toast.success(
        <div className="flex items-center text-red-500">
          <RiEmotionUnhappyFill className="mr-2 text-lg" />
          <span className="text-sm">Reaction Removed</span>
        </div>,
        { icon: false, position: "bottom-center", duration: 3000 }
      );
    } else {
      toast.error(response.message);
    }
  };

  const handleRead = () => {
    navigate(`/read-book/${book._id}`);
  };

  const handleDownloadRequest = async () => {
    if (downloadStatus === "pending") {
      toast.success(
        <div className="flex items-center text-blue-500">
          <RiEmotionUnhappyFill className="mr-2 text-lg" />
          <span className="text-sm">Download request still pending</span>
        </div>,
        { icon: false, position: "bottom-center", duration: 3000 }
      );
      return;
    }
    if (downloadStatus === "rejected") {
      toast.success(
        <div className="flex items-center text-red-500">
          <RiEmotionUnhappyFill className="mr-2 text-lg" />
          <span className="text-sm">Download request rejected by admin</span>
        </div>,
        { icon: false, position: "bottom-center", duration: 3000 }
      );
      return;
    }
    const response = await createDownloadRequest(book._id, user._id);
    if (response.success) {
      setDownloadStatus("pending");
      toast.success(
        <div className="flex items-center text-blue-500">
          <RiEmotionHappyFill className="mr-2 text-lg" />
          <span className="text-sm">Book download request sent</span>
        </div>,
        { icon: false, position: "bottom-center", duration: 3000 }
      );
      getDownloadRequests();
    } else {
      toast.error(response.message);
    }
  };

  const handleDownload = async () => {
    if (downloadStatus === "accepted") {
      try {
        const response = await fetch(`http://localhost:5000${book.pdf}`);
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${book.title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Book downloaded successfully", {
          position: "bottom-center",
        });
      } catch (error) {
        toast.error("Failed to download the book");
        console.error(error);
      }
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg shadow overflow-hidden p-4 flex flex-col items-center">
      {/* Cover Image */}
      <img
        src={`http://localhost:5000${book.coverImage}`}
        alt={book.title}
        className="w-40 h-60 rounded-lg shadow"
      />

      {/* Book Details */}
      <div className="w-full p-4">
        <h2 className="text-xl font-semibold text-center">{book.title}</h2>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Author: </strong> {book.author}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Category: </strong>
          {book.category}
        </p>
      </div>

      {/* Like Section */}
      <div className="w-full px-4 flex items-center justify-between">
        <div className="flex">
          <button
            onClick={isLiked ? handleUnlike : handleLike}
            className="text-pink-500 hover:text-pink-700 transition-colors duration-300 ease-linear"
          >
            {isLiked ? (
              <FaHeart className="text-xl mr-1" />
            ) : (
              <FaRegHeart className="text-xl mr-2" />
            )}
          </button>
          {likes > 0 && (
            <span
              className={`text-sm mr-2 ${
                isLiked ? "text-white" : "text-pink-500"
              }`}
            >
              {likes}
            </span>
          )}
        </div>

        {/* Read and Download Button */}
        <div className="flex space-x-2">
          <button
            onClick={handleRead}
            className="flex items-center space-x-2 text-green-500 border border-green-500 px-2 py-1 rounded-lg hover:bg-green-500 hover:text-white transition-colors duration-300 ease-linear cursor-pointer"
          >
            <FaBookReader className="text-sm" />
            <span className="text-sm">Read</span>
          </button>
          <button
            onClick={
              downloadStatus === "accepted"
                ? handleDownload
                : handleDownloadRequest
            }
            className={`flex items-center space-x-2 ${
              downloadStatus === "accepted"
                ? "text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white"
                : downloadStatus === "rejected"
                ? "text-red-500 border border-red-500 hover:bg-red-500 hover:text-white"
                : "text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white"
            } px-2 py-1 rounded-lg transition-colors duration-300 ease-linear cursor-pointer`}
          >
            {downloadStatus === "pending" ? (
              <IoIosSend className="text-lg" />
            ) : downloadStatus === "accepted" ? (
              <TiDownload className="text-lg" />
            ) : downloadStatus === "rejected" ? (
              <MdFileDownloadOff className="text-lg" />
            ) : (
              <MdFileDownload className="text-lg" />
            )}
            <span className="text-sm">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
