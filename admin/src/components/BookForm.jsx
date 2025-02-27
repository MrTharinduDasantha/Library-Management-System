import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiImageAddFill, RiDeleteBack2Fill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAdminApi } from "../hooks/useAdminApi";

const BookForm = () => {
  const { fetchBookById, addBook, updateBook } = useAdminApi();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const fetchBookDetails = async () => {
    const response = await fetchBookById(id);
    if (response.success) {
      setFormData({
        title: response.book.title,
        author: response.book.author,
        category: response.book.category,
      });
      if (response.book.coverImage) {
        setCoverImage(`http://localhost:5000${response.book.coverImage}`);
      }
      if (response.book.pdf) {
        setPdfPreview(`http://localhost:5000${response.book.pdf}`);
      }
    } else {
      toast.error(response.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setCoverImage(null);
    setCoverImageFile(null);
    document.getElementById("coverImage").value = "";
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setPdfPreview(URL.createObjectURL(file));
    } else {
      toast.error("Please select a valid PDF file.");
    }
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
    setPdfPreview(null);
    document.getElementById("pdf").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("category", formData.category);
    if (coverImageFile) formDataToSend.append("coverImage", coverImageFile);
    if (pdfFile) formDataToSend.append("pdf", pdfFile);

    let response;
    if (id) {
      response = await updateBook(id, formDataToSend);
    } else {
      response = await addBook(formDataToSend);
    }

    if (response.success) {
      toast.success(response.message, {
        position: "bootom-right",
      });
      navigate("/manage-books");
    } else {
      toast.error(response.message, {
        position: "top-right",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {["title", "author", "category"].map((field) => (
        <div key={field} className="relative z-0 w-full group">
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 outline-none bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
        </div>
      ))}

      <div className="flex space-x-6">
        {/* Cover Image Upload */}
        <div>
          <div className="flex items-center space-x-3">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="coverImage"
              onChange={handleImageChange}
            />
            <label
              htmlFor="coverImage"
              className="cursor-pointer flex items-center space-x-2 text-gray-500"
            >
              <RiImageAddFill size={24} />
              <span>Upload cover image of the book</span>
            </label>
          </div>

          {/* Preview Cover Image */}
          {coverImage && (
            <div className="relative mt-4 flex justify-start">
              <img
                src={coverImage}
                alt="Cover Preview"
                className="w-48 h-72 object-fill rounded-md shadow-md"
              />
              <button
                onClick={handleRemoveImage}
                type="button"
                className="absolute top-2 left-[150px] text-red-500 p-1 rounded-full cursor-pointer"
              >
                <RiDeleteBack2Fill size={25} />
              </button>
            </div>
          )}
        </div>

        {/* PDF Upload */}
        <div>
          <div className="flex items-center space-x-3">
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              id="pdf"
              onChange={handlePdfChange}
            />
            <label
              htmlFor="pdf"
              className="cursor-pointer flex items-center space-x-2 text-gray-500"
            >
              <FaFilePdf size={22} />
              <span>Upload pdf of the book</span>
            </label>
          </div>

          {/* Preview PDF */}
          {pdfPreview && (
            <div className="relative mt-4 flex justify-start">
              <iframe
                src={pdfPreview}
                width="90%"
                height="200"
                title="PDF Preview"
                className="border border-gray-300 shadow-md rounded-md"
              />
              <button
                onClick={handleRemovePdf}
                type="button"
                className="absolute top-2 left-[215px] text-red-500 p-1 rounded-full cursor-pointer"
              >
                <RiDeleteBack2Fill size={25} />
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="px-6 block ml-auto text-white bg-blue-600 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-300 ease-linear cursor-pointer"
      >
        {id ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;
