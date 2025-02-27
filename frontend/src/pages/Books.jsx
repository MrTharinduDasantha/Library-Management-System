import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import { FaCheckCircle, FaRegCheckCircle, FaSadTear } from "react-icons/fa";
import { useUserApi } from "../hooks/useUserApi";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import romanceImg from "../assets/romance.png";
import horrorImg from "../assets/horror.png";
import historyImg from "../assets/history.png";
import kidsImg from "../assets/kids.png";
import { AuthContext } from "../context/AuthContext";

const categories = [
  { name: "romance", img: romanceImg },
  { name: "horror", img: horrorImg },
  { name: "history", img: historyImg },
  { name: "kids", img: kidsImg },
];

const Books = () => {
  const { userDetails } = useContext(AuthContext);
  const { fetchBooks } = useUserApi();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  // Read search query and category filter from URL
  const searchTerm = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    setLoading(true);
    const response = await fetchBooks();
    if (response.success) {
      setBooks(response.books);
      setFilteredBooks(response.books);
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    let filtered = books;

    if (selectedCategory) {
      filtered = filtered.filter(
        (book) => book.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [searchTerm, selectedCategory, books]);

  const handleCategorySelect = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  return (
    <div className="px-6 py-10 flex flex-col items-center">
      {/* Category Filter */}
      <div className="flex space-x-6 mb-6">
        {categories.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleCategorySelect(item.name)}
          >
            <img src={item.img} alt={item.name} className="w-20 h-20" />
            <div className="mt-2 flex items-center justify-center space-x-2">
              <span className="text-lg capitalize">{item.name}</span>
              {selectedCategory === item.name ? (
                <FaCheckCircle className="text-green-600 text-xl" />
              ) : (
                <FaRegCheckCircle className="text-gray-500 text-xl" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Book Display */}
      {loading ? (
        <LoadingSpinner />
      ) : filteredBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
          <FaSadTear className="text-5xl mb-2" />
          <p className="text-xl">No books found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} user={userDetails} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
