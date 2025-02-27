import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="w-48 h-full fixed">
        <Sidebar />
      </div>
      <div className="flex-grow p-4 ml-48 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
