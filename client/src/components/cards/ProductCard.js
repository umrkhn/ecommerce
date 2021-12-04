import React from "react";
import { Link } from "react-router-dom";

import "./ProductCard.css";
import Rating from "../misc/Rating";

const ProductCard = ({ images, title, price, avgRating, totalReviews, _id }) => {
    return (
        <div className="ProductCard">
            <div className="ProductCard__figure">
                <img className="ProductCard__image" src={images[0]} alt="product" />
            </div>
            <div className="ProductCard__body">
                <Link to={`/products/${_id}`}>
                    <h3 className="ProductCard__title">{title.slice(0, 43)}...</h3>
                </Link>
                <div className="ProductCard__rating">
                    <Rating avgRating={avgRating} />
                    <p className="ProductCard__rating-avg">{avgRating}</p>
                </div>
                <div className="ProductCard__main">
                    <div className="ProductCard__price">$ {price.toFixed(2)}</div>
                    <p className="ProductCard__reviews">{totalReviews} Reviews</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
