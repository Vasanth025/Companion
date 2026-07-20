import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
    return (
        <React.Fragment>
            <div className="flex">
                <Sidebar />
                <Outlet />
            </div>
        </React.Fragment>
    );
};

export default MainLayout;