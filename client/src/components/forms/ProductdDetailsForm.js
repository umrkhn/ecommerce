import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import QuantityBtn from "../buttons/QuantityBtn";
import { addItemToCart } from "../../actions/cart";
import "./ProductDetailsForm.css";

const ProductOptionsForm = ({ productId, availableSizes, availableColors }) => {
    const initialState = {
        quantity: 1,
        size: availableSizes[0],
        color: availableColors[0],
    };
    const [formValues, setFormValues] = useState(initialState);
    const dispatch = useDispatch();
    const cartId = useSelector((state) => state.cart.id);
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const QtyBtnCallbacks = {
        onDecrease() {
            setFormValues({ ...formValues, quantity: formValues.quantity - 1 });
        },
        onIncrease() {
            setFormValues({ ...formValues, quantity: formValues.quantity + 1 });
        },
    };

    const renderSizeBtn = () => {
        return availableSizes.map((size, index) => {
            const className = formValues.size === size ? "ProductDetailsForm__size-btn ProductDetailsForm__size-btn--active" : "ProductDetailsForm__size-btn";
            return (
                <button className={className} onClick={() => setFormValues({ ...formValues, size })} type="button" key={index}>
                    {size}
                </button>
            );
        });
    };
    const renderColorBtn = () => {
        return availableColors.map((color, index) => {
            const className =
                formValues.color === color ? "ProductDetailsForm__color-btn ProductDetailsForm__color-btn--active" : "ProductDetailsForm__color-btn";
            return (
                <button className={className} onClick={() => setFormValues({ ...formValues, color })} type="button" key={index}>
                    <div className="ProductDetailsForm__circle" style={{ backgroundColor: "#" + color }}></div>
                </button>
            );
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!auth.isSignedIn && !auth.accessToken) return navigate("/auth/login");
        const payload = { ...formValues, product: productId };
        console.log(payload);
        dispatch(addItemToCart(cartId, payload));
    };

    return (
        <form className="ProductDetailsForm" onSubmit={onSubmit}>
            <div className="ProductDetailsForm__options">
                <div className="ProductDetailsForm__group">
                    <h4 className="ProductDetailsForm__label">Quantity</h4>
                    <QuantityBtn quantity={formValues.quantity} cb={QtyBtnCallbacks} />
                </div>
                <div className="ProductDetailsForm__group">
                    <h4 className="ProductDetailsForm__label">Color</h4>
                    <div className="ProductDetailsForm__colors">{renderColorBtn()}</div>
                </div>
                <div className="ProductDetailsForm__group">
                    <h4 className="ProductDetailsForm__label">Size</h4>
                    <div>{renderSizeBtn()}</div>
                </div>
            </div>
            <p className="ProductDetailsForm__estimated">Estimated Delivery: 2 - 3 days</p>
            <button className="PrimaryBtn" type="button" style={{ marginRight: "15px" }}>
                buy now
            </button>
            <button className="PrimaryBtn">add to cart</button>
        </form>
    );
};

export default ProductOptionsForm;
