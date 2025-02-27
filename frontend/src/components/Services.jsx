import addBook from "../assets/add_book.png";
import editBook from "../assets/edit_book.png";
import deleteBook from "../assets/delete_book.png";
import likeBook from "../assets/add_like_book.png";
import downloadBook from "../assets/download_book.png";
import readBook from "../assets/read_book.png";
import loginUser from "../assets/login_user.png";
import registerUser from "../assets/register_user.png";

const services = [
  {
    name: "Add Book",
    image: addBook,
    description:
      "Admins can add new books with details and upload files easily.",
  },
  {
    name: "Edit Book",
    image: editBook,
    description:
      "Modify book details including title, author, category, cover image, and pdf file.",
  },
  {
    name: "Delete Book",
    image: deleteBook,
    description: "Remove books from the library when necessary.",
  },
  {
    name: "Like Book",
    image: likeBook,
    description: "Users can like books they enjoy reading.",
  },
  {
    name: "Download Book",
    image: downloadBook,
    description: "Approved users can download books for offline reading.",
  },
  {
    name: "Read Book",
    image: readBook,
    description: "Read books online directly through the platform.",
  },
  {
    name: "Login User",
    image: loginUser,
    description: "Users can log in to access their personalized library.",
  },
  {
    name: "Register User",
    image: registerUser,
    description: "New users can create an account to explore the library.",
  },
];

const Services = () => {
  return (
    <div id="services-section">
      <h2 className="text-3xl md:text-4xl font-bold text-center mt-5 mb-10 text-gray-800">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border-2 shadow border-gray-200 flex flex-col items-center space-y-4 transition-transform duration-300 ease-linear hover:scale-105"
          >
            <img src={service.image} alt={service.name} className="w-16 h-16" />
            <h3 className="text-xl font-semibold">{service.name}</h3>
            <p className="text-gray-600 text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
