import { Outlet } from "react-router";
import Sidebar from "../components/ui/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 dark:bg-[#0d1117] dark:text-white">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
