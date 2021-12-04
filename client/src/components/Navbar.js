import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { CartIcon } from "../assets/icon";
import { logout } from "../actions/user";
import "./Navbar.css";

const Navbar = () => {
    const { isSignedIn } = useSelector((state) => state.auth);
    const itemsCount = useSelector((state) => state.cart.cartItems.length);
    const dispatch = useDispatch();

    const renderAuth = () => {
        return isSignedIn ? (
            <button className="PrimaryBtn PrimaryBtn--outline" onClick={() => dispatch(logout())}>
                logout
            </button>
        ) : (
            <Link className="PrimaryBtn PrimaryBtn--outline" to="/auth/login">
                sign in
            </Link>
        );
    };
    return (
        <nav className="Navbar">
            <div className="Navbar__container">
                <Link className="Navbar__brand" to="/products">
                    ecommerce
                </Link>
                <div className="Navbar__links">
                    <Link className="Navbar__cart" to="/cart">
                        <span className="Navbar__count">{itemsCount}</span>
                        <CartIcon />
                    </Link>
                    {renderAuth()}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
