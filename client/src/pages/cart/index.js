import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";
import Item from "../../components/cart/Item";
import Summary from "../../components/cart/Summary";
import { resetCart } from "../../actions/cart";

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const onResetClick = () => dispatch(resetCart(cart.id));

    const renderCartItem = () => {
        return cart.cartItems.map((cartItem) => {
            return <Item key={cartItem._id} cartItem={cartItem} cartId={cart.id} />;
        });
    };

    return (
        <div className="Cart">
            <div className="Cart__header">
                <h2 className="Cart__title">Products in cart ({cart.cartItems.length})</h2>
                <button className="Cart__reset" onClick={onResetClick}>
                    Reset Cart
                </button>
            </div>
            <div className="Cart__list">{renderCartItem()}</div>
            <Summary cartItems={cart.cartItems} />
        </div>
    );
};

export default Cart;
