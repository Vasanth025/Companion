import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineSquares2X2,
  HiOutlineClipboardDocumentList,
  HiOutlineBookOpen,
  HiOutlinePencilSquare,
  HiOutlineArrowLeftOnRectangle
} from "react-icons/hi2";
import { IoGameControllerOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully");
    navigate("/login");
  };

  const navSections = [
    {
      title: "OVERVIEW",
      items: [
        {
          name: "Dashboard",
          icon: <HiOutlineSquares2X2 size={19} />,
          path: "/",
        },
      ],
    },
    {
      title: "WORKSPACE",
      items: [
        {
          name: "Tasks",
          icon: <HiOutlineClipboardDocumentList size={19} />,
          path: "/todos",
        },
        {
          name: "Notes",
          icon: <HiOutlineBookOpen size={19} />,
          path: "/notes",
        },
        {
          name: "Diary",
          icon: <HiOutlinePencilSquare size={19} />,
          path: "/diary",
        },
        {
          name: "Games & Relax",
          icon: <IoGameControllerOutline size={19} />,
          path: "/games",
        },
      ],
    },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 border-r border-gray-200 bg-white p-5 flex flex-col justify-between flex-shrink-0 z-30 font-sans">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-gray-100 pb-4">
          <div className="h-9 w-9 rounded-xl bg-[#841DED] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            C
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#1F1B2D]">
              Companion
            </h1>
            <p className="text-[11px] text-gray-500 font-medium">
              Productivity Workspace
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="px-3 text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">
                {section.title}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    item.path === "/"
                      ? location.pathname === "/"
                      : location.pathname.startsWith(item.path);

                  return (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.path)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition cursor-pointer ${
                          isActive
                            ? "bg-[#F3ECFF] text-[#841DED] font-semibold"
                            : "text-gray-600 hover:bg-gray-50 hover:text-[#841DED]"
                        }`}
                      >
                        <span className={isActive ? "text-[#841DED]" : "text-gray-400"}>
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Profile Footer */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative flex-shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#841DED] font-bold text-white text-xs">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
            </div>

            <div className="overflow-hidden">
              <h2 className="font-semibold text-xs text-gray-900 truncate">
                {user?.name || "User"}
              </h2>
              <p className="text-[11px] text-gray-500 truncate">
                {user?.email || "Account"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
          >
            <HiOutlineArrowLeftOnRectangle size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;