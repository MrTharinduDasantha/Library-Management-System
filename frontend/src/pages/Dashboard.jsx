import Navbar from "../components/Navbar";
import { useLocation, Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Dashboard = () => {
  const location = useLocation();
  const hideNavFooter = location.pathname.startsWith("/read-book/");
  return (
    <div className="flex flex-col h-screen">
      {!hideNavFooter && <Navbar />}
      <div className="flex-grow">
        <Outlet />
      </div>
      {!hideNavFooter && <Footer />}
    </div>
  );
};

export default Dashboard;
