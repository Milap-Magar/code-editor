import { LayoutDashboard, User, LogOut } from "lucide-react";
// import { useState } from "react";
import { NavLink, Outlet } from "react-router";

const menuItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    to: "/dashboard",
  },
  {
    label: "Profile",
    icon: <User className="w-5 h-5" />,
    to: "/dashboard/profile",
  },
];

const DashboardLayout = () => {
  //   const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 dark:bg-[#0d1117] dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#161b22] border-r dark:border-gray-800 hidden md:flex flex-col">
        <div className="px-6 py-4 text-xl font-bold border-b dark:border-gray-800">
          CodeSync
        </div>
        <nav className="flex flex-col gap-1 mt-4 px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
                  isActive ? "bg-gray-200 dark:bg-gray-800" : ""
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto px-4 py-4">
          <button className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-800 text-red-600 dark:text-red-400">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
