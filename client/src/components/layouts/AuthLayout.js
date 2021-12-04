import React from "react";
import { Link } from "react-router-dom";
import "./AuthLayout.css";

const AuthLayout = ({ children, title, message, btnLink, btnText }) => {
    return (
        <div className="AuthLayout">
            <div className="AuthLayout__image"></div>
            <div className="AuthLayout__main">
                <h2 className="AuthLayout__title">{title}</h2>
                {children}
                <p className="AuthLayout__member">
                    {message}
                    <Link className="AuthLayout__link" to={btnLink}>
                        {btnText}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthLayout;
