import { FaRegStar, FaStar } from "react-icons/fa";
import girlProfile1 from "../assets/girl_profile_pic_1.jpg";
import boyProfile1 from "../assets/boy_profile_pic_1.jpg";
import girlProfile2 from "../assets/girl_profile_pic_2.jpg";
import boyProfile2 from "../assets/boy_profile_pic_2.jpg";

const testimonials = [
  {
    name: "Saduni Theshadi",
    image: girlProfile1,
    content:
      "This library system makes book management effortless! I love the easy access to all my favorite books.",
    rating: 3,
  },
  {
    name: "Kavidu Thisal",
    image: boyProfile1,
    content:
      "I really appreciate how the platform allows me to request and download books with just a few clicks!",
    rating: 4,
  },
  {
    name: "Asoka Nilmini",
    image: girlProfile2,
    content:
      "A great platform for book lovers to read books! I enjoy exploring different categories and finding new reads.",
    rating: 3,
  },
  {
    name: "Wimukthi Dilshan",
    image: boyProfile2,
    content:
      "Amazing system! The user-friendly interface and smooth functionality make it my go-to library app.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <div id="testimonials-section" className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-center mt-20 mb-10 text-gray-800">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-6 mb-20 rounded-lg border-2 shadow border-gray-200 flex flex-col items-center space-y-3 transition-transform duration-300 ease-linear hover:scale-105"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 object-cover rounded-full shadow-lg"
            />
            <h3 className="text-xl font-semibold">{testimonial.name}</h3>
            <p className="text-gray-600 text-center">{testimonial.content}</p>
            <div className="flex text-yellow-500">
              {Array.from({ length: testimonial.rating }, (_, i) => (
                <FaStar key={i} />
              ))}
              {Array.from({ length: 6 - testimonial.rating }, (_, i) => (
                <FaRegStar key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
