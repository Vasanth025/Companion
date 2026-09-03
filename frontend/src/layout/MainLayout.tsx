import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#F8F7FC] font-sans antialiased text-[#1F1B2D]">
      {/* Sidebar - Left Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 sm:p-8 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;