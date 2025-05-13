import { LayoutDashboard, LogOut, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import axiosClient from "../../auth/axios";

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
const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogoout = async () => {
    try {
      const resposne = await axiosClient.post("/auth/logout", {
        method: "POST",
        creadential: "include",
      });
      if (resposne.status === 200) {
        return navigate("/sign-in");
      } else {
        const data = await resposne.data();
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.log("🚀 ~ Error Occured during logout ~ error:", error);
    }
  };
  return (
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
        <button
          className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-800 text-red-600 dark:text-red-400"
          onClick={handleLogoout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
