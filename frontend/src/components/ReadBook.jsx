import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserApi } from "../hooks/useUserApi";
import {
  IoArrowBackCircleSharp,
  IoCaretBackCircle,
  IoCaretForwardCircle,
} from "react-icons/io5";
import { RiZoomInFill, RiZoomOutFill } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import toast from "react-hot-toast";
import authorImage from "../assets/author.png";
import spendTimeImage from "../assets/spend_time.png";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ReadBook = () => {
  const { fetchBook } = useUserApi();
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(50);
  const [isTwoPageView, setIsTwoPageView] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    fetchBookData();
    const timer = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchBookData = async () => {
    const response = await fetchBook(id);
    if (response.success) {
      setBook(response.book);
    } else {
      toast.error(response.message);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    setPageNumber((prevPageNumber) =>
      prevPageNumber > 1 ? prevPageNumber - 1 : numPages
    );
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) =>
      prevPageNumber < numPages ? prevPageNumber + 1 : 1
    );
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) =>
      prevZoomLevel < 300 ? prevZoomLevel + 50 : 50
    );
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) =>
      prevZoomLevel > 50 ? prevZoomLevel - 50 : 300
    );
  };

  const toggleTwoPageView = () => {
    setIsTwoPageView((prev) => !prev);
  };

  const formatTimeSpent = (seconds) => {
    if (seconds < 60) {
      return `${seconds} Second${seconds !== 1 ? "s" : ""}`;
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} Minute${minutes !== 1 ? "s" : ""}`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} Hour${
      hours !== 1 ? "s" : ""
    } : ${remainingMinutes} Minute${remainingMinutes !== 1 ? "s" : ""}`;
  };
  return (
    <div className="flex flex-col h-screen">
      {/* Top Row */}
      <div className="absolute top-0 left-0 w-full z-10 flex justify-between items-center bg-black text-white p-4">
        <div className="flex items-center space-x-2">
          <img src={authorImage} alt="Author" className="w-8 h-8" />
          <div className="text-lg">{book?.author}</div>
        </div>
        <div className="text-xl font-bold">{book?.title}</div>
        {timeSpent > 0 && (
          <div className="flex items-center space-x-2">
            <img src={spendTimeImage} alt="Time Spent" className="w-8 h-8" />
            <div className="text-lg">{formatTimeSpent(timeSpent)}</div>
          </div>
        )}
      </div>

      {/* PDF Viewer */}
      <div
        className={`flex-grow flex justify-center items-center overflow-auto bg-black pt-16 ${
          (isTwoPageView && zoomLevel === 50) ||
          (!isTwoPageView && zoomLevel === 100)
            ? "overflow-x-hidden"
            : "overflow-x-auto"
        }`}
      >
        {book?.pdf ? (
          <Document
            file={`http://localhost:5000${book.pdf}`}
            onLoadSuccess={onDocumentLoadSuccess}
            className={
              isTwoPageView
                ? "w-full h-full"
                : zoomLevel === 50
                ? "h-full"
                : "w-full h-full"
            }
            onLoadError={(error) => console.error("PDF Load Error:", error)}
          >
            {isTwoPageView ? (
              <div className="flex">
                <Page
                  pageNumber={pageNumber}
                  width={window.innerWidth * (zoomLevel / 100)}
                />
                <Page
                  pageNumber={pageNumber + 1 > numPages ? 1 : pageNumber + 1}
                  width={window.innerWidth * (zoomLevel / 100)}
                />
              </div>
            ) : (
              <Page
                pageNumber={pageNumber}
                width={window.innerWidth * (zoomLevel / 100)}
              />
            )}
          </Document>
        ) : (
          <div className="flex justify-center items-center h-[40vh]">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center bg-black p-4">
        {/* Toggle Two-Page View and Back Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/books")}
            className="text-3xl text-white hover:text-gray-400"
          >
            <IoArrowBackCircleSharp className="hover:text-blue-400 transition-colors duration-300 ease-linear cursor-pointer" />
          </button>
          <button
            onClick={toggleTwoPageView}
            className={`text-2xl ${
              isTwoPageView ? "text-blue-400" : "text-white"
            } hover:text-gray-400`}
          >
            <FaBookOpen className="hover:text-blue-400 transition-colors duration-300 ease-linear cursor-pointer" />
          </button>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={goToPreviousPage}
            className="text-2xl text-white hover:text-gray-400"
          >
            <IoCaretBackCircle className="hover:text-blue-400 transition-colors duration-300 ease-linear cursor-pointer" />
          </button>
          <span className="text-lg text-white">
            {pageNumber} / {numPages}
          </span>
          <button
            onClick={goToNextPage}
            className="text-2xl text-white hover:text-gray-400"
          >
            <IoCaretForwardCircle className="hover:text-blue-400 transition-colors duration-300 ease-linear cursor-pointer" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleZoomOut}
            className="text-2xl text-white hover:text-gray-400"
          >
            <RiZoomOutFill className="hover:text-blue-400 transition-colors duration-300 ease-linear cursor-pointer" />
          </button>
          <span className="text-lg text-white">{zoomLevel}%</span>
          <button
            onClick={handleZoomIn}
            className="text-2xl text-white hover:text-gray-400"
          >
            <RiZoomInFill className="hover:text-blue-400 transition-colors duration-300 ease-linear cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadBook;
