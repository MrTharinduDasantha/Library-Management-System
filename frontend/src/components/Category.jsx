import { useNavigate } from "react-router-dom";
import romanceGif from "../assets/romance.gif";
import horrorGif from "../assets/horror.gif";
import historyGif from "../assets/history.gif";
import kidsGif from "../assets/kids.gif";

const categories = [
  { name: "Romance", img: romanceGif },
  { name: "Horror", img: horrorGif },
  { name: "History", img: historyGif },
  { name: "Kids", img: kidsGif },
];

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/books?category=${category.toLowerCase()}`);
  };

  return (
    <div id="category-section" className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-center mt-20 mb-10 text-gray-800">
        Book Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {categories.map((category, index) => (
          <div key={index} className="relative group">
            <img
              src={category.img}
              alt={category.name}
              className="w-full h-44 object-cover rounded-lg"
            />
            <button
              onClick={() => handleCategoryClick(category.name)}
              className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded shadow-lg opacity-90 group-hover:scale-105 transition-transform duration-300 ease-linear cursor-pointer"
            >
              {category.name} Books
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
