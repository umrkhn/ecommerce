import React from "react";
import "./QuantityBtn.css";

const QuantityBtn = ({ quantity, cb }) => {
    const onSubtract = () => {
        if (quantity <= 1) return;
        cb.onDecrease();
    };
    const onAdd = () => cb.onIncrease();
    return (
        <div className="QuantityBtn">
            <button className="QuantityBtn__subtract" type="button" onClick={onSubtract}>
                -
            </button>
            <span className="QuantityBtn__count">{quantity}</span>
            <button className="QuantityBtn__add" type="button" onClick={onAdd}>
                +
            </button>
        </div>
    );
};

export default QuantityBtn;
