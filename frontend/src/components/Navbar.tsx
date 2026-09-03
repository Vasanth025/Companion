import React, { useState } from "react";
import {
  HiOutlineFire,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineChevronDown,
  HiXMark
} from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Brand / App Title */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-[#841DED] text-xl tracking-tight">Companion</span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Streak Badge */}
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl text-amber-700 font-semibold text-xs">
          <HiOutlineFire size={18} className="text-amber-500" />
          <span>{user?.streak ?? 0} Day Streak</span>
        </div>

        <div className="h-5 w-[1px] bg-gray-200" />

        {/* Profile Button */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 hover:border-gray-300 transition cursor-pointer"
          >
            <div className="h-8 w-8 rounded-full bg-[#841DED] text-white flex items-center justify-center font-bold text-xs">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="text-left hidden md:block">
              <p className="font-semibold text-xs text-gray-800 leading-tight">
                {user?.name || "User"}
              </p>
              <p className="text-[10px] text-gray-500 leading-tight">
                {user?.type || "Standard"}
              </p>
            </div>

            <HiOutlineChevronDown size={14} className="text-gray-400" />
          </button>

          {/* Profile Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-50">
              <div className="bg-[#841DED] text-white p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-white text-[#841DED] flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <div className="overflow-hidden">
                      <h3 className="text-sm font-semibold truncate">
                        {user?.name || "User"}
                      </h3>
                      <p className="text-xs text-purple-100 truncate">
                        {user?.email || ""}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setDropdownOpen(false)}
                    className="rounded-full p-1 hover:bg-white/20 transition cursor-pointer"
                  >
                    <HiXMark size={18} />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center text-xs py-1 border-b border-gray-100">
                  <span className="text-gray-500">Role</span>
                  <span className="font-semibold text-[#841DED] bg-purple-50 px-2.5 py-0.5 rounded-full text-[11px]">
                    {user?.type || "Standard"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs py-1 border-b border-gray-100">
                  <span className="text-gray-500">Streak</span>
                  <span className="font-semibold text-amber-600 flex items-center gap-1 text-[11px]">
                    🔥 {user?.streak ?? 0} Days
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-3 w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-semibold text-xs rounded-xl py-2.5 hover:bg-red-100 transition cursor-pointer border border-red-100"
                >
                  <HiOutlineArrowLeftOnRectangle size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;