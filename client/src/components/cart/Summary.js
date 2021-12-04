import React from "react";
import { Link } from "react-router-dom";

import "./Summary.css";

const Summary = ({ cartItems }) => {
    let subTotal = 0;
    for (const { price, quantity } of cartItems) subTotal = subTotal + price * quantity;
    const shipping = 2;
    const total = subTotal + shipping;
    return (
        <div className="Summary">
            <h2 className="Summary__title">Order Summary</h2>
            <div>
                <div className="Summary__group">
                    <p>Sub Total</p>
                    <p>$ {subTotal.toFixed(2)}</p>
                </div>
                <div className="Summary__group">
                    <p>Estimated Shipping</p>
                    <p>$ {shipping.toFixed(2)}</p>
                </div>
            </div>
            <div className="Summary__total">
                <p>Total Amount</p>
                <p>$ {total.toFixed(2)}</p>
            </div>
            <Link className="PrimaryBtn" to="/checkout">
                proceed to checkout
            </Link>
        </div>
    );
};

export default Summary;
