import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
    return (
        <div className="NotFound">
            <h1 className="NotFound__title">404</h1>
            <p className="NotFound__text">Page Not Found</p>
            <Link className="PrimaryBtn" to="/products">
                back to home
            </Link>
        </div>
    );
};

export default NotFound;
