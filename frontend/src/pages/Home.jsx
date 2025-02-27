import Category from "../components/Category";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow px-6">
        <Hero />
        <Services />
        <Category />
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
