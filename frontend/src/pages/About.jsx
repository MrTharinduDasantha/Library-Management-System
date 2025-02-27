import aboutImg from "../assets/about_img.jpg";

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6">
      {/* Left Section - Image */}
      <div className="md:w-1/2">
        <img src={aboutImg} alt="About Us" className="w-full h-auto" />
      </div>

      {/* Right Section - Content & Contact Button */}
      <div className="md:w-1/2 md:pl-10 mt-8 md:mt-0 space-y-8">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="text-lg text-gray-600">
          Our Library Management System allows administrators to efficiently
          manage books by adding, editing, and deleting book details. Admins can
          also oversee registered users and other admins within the system.
        </p>
        <p className="text-lg text-gray-600">
          Users can explore a vast collection of books categorized into Romance,
          Horror, History, and Kids. They can like and read books, as well as
          request admins for book downloads.
        </p>
        <p className="text-lg text-gray-600">
          The admin has the ability to approve or reject book download requests.
          Once approved, users can download the books. This system ensures a
          seamless and organized library experience for both admins and users.
        </p>

        <button className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-300 ease-linear cursor-pointer">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default About;
