import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import "./Layout.css";

const Layout = () => {
    return (
        <div className="Layout">
            <Navbar />
            <div className="Layout__main">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
