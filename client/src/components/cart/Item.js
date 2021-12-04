import React from "react";
import { useDispatch } from "react-redux";

import "./Item.css";
import QuantityBtn from "../buttons/QuantityBtn";
import { removeCartItem, decreaseQty, increaseQty } from "../../actions/cart";

const Item = ({ cartItem, cartId }) => {
    const dispatch = useDispatch();
    const { title, price, size, color, quantity, image } = cartItem;

    const QtyBtnCallbacks = {
        onDecrease() {
            dispatch(decreaseQty(cartId, cartItem._id));
        },
        onIncrease() {
            dispatch(increaseQty(cartId, cartItem._id));
        },
    };

    const onDeleteClick = () => {
        dispatch(removeCartItem(cartId, cartItem._id));
    };

    return (
        <div className="Item">
            <div className="Item__figure">
                <img src={image} className="Item__image" alt="product" />
            </div>
            <div className="Item__group">
                <h4 className="Item__title">{title}</h4>
                <div className="Item__selection">
                    <p>
                        Size : <span style={{ fontWeight: "400", marginRight: "1.5rem" }}>{size}</span>
                    </p>
                    <p>Color :</p>
                    <div className="Item__circle" style={{ backgroundColor: "#" + color }}></div>
                </div>
            </div>
            <div className="Item__group">
                <p className="Item__price">$ {price.toFixed(2)}</p>
                <p className="Item__shipping-cost">+2.50 $ Shipping</p>
                <p className="Item__shipping-days">Estimated Delivery : 3 - 4 days</p>
            </div>
            <div className="Item__group">
                <QuantityBtn quantity={quantity} cb={QtyBtnCallbacks} />
                <button className="Item__btn" onClick={onDeleteClick}>
                    Remove
                </button>
            </div>
        </div>
    );
};

export default Item;
