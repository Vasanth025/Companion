import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineBookOpen,
  HiOutlinePencil,
} from "react-icons/hi2";
import { IoGameControllerOutline } from "react-icons/io5";

type User = {
  _id: string;
  name: string;
  email: string;
  type: string;
  streak: number;
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User | null>(null);
  const [activeItem, setActiveItem] = React.useState("Tasks");

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const menuItems = [
    {
      name: "Tasks",
      icon: <HiOutlineClipboardDocumentList size={22} />,
      path: "/todos",
    },
    {
      name: "Notes",
      icon: <HiOutlineBookOpen size={22} />,
      path: "/notes",
    },
    {
      name: "Diary",
      icon: <HiOutlinePencil size={22} />,
      path: "/diary",
    },
    {
      name: "Games",
      icon: <IoGameControllerOutline size={22} />,
      path: "/games",
    },
  ];

  return (
    <aside className="w-72 min-h-screen border-r border-[#ECE8F3] bg-white p-6">

      {/* User */}

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#841DED] text-xl font-bold text-white">
            {user?.name?.charAt(0).toUpperCase() || "?"}
          </div>

          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
        </div>

        <div>
          <h2 className="font-semibold text-[#1F1B2D]">
            {user?.name || "Loading..."}
          </h2>

          <p className="text-sm text-[#7C748E]">
            {user?.type || ""}
          </p>
        </div>
      </div>

      {/* Navigation */}

      <nav className="mt-12">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => {
                  setActiveItem(item.name);
                  navigate(item.path);
                }}
                className={`flex w-full items-center gap-4 rounded-2xl px-4 py-4 transition
                  ${
                    activeItem === item.name
                      ? "bg-[#F3ECFF] text-[#841DED] font-semibold"
                      : "text-[#7C748E] hover:bg-[#F8F7FC] hover:text-[#841DED]"
                  }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;