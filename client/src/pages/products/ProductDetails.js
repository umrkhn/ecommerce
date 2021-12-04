import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Rating from "../../components/misc/Rating";
import ProductdDetailsForm from "../../components/forms/ProductdDetailsForm";
import { fetchOneProduct } from "../../actions/products";
import Accordion from "../../components/Accordion";
import { clearReviews } from "../../actions/reviews";
import "./ProductDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const product = useSelector((state) => state.products.find((product) => (id === product._id ? true : false)));
    const [selectedImage, setSelectedImage] = useState();
    const dispatch = useDispatch();
    const defaultImage = product ? product.images[0] : null;

    useEffect(() => {
        dispatch(fetchOneProduct(id));
        return () => {
            dispatch(clearReviews());
        };
    }, [id, dispatch]);

    useEffect(() => {
        setSelectedImage(defaultImage);
    }, [defaultImage]);

    if (!product) return null;
    const { title, price, avgRating, totalReviews, images, details, _id } = product;

    const renderImages = () => {
        return images.map((image, index) => {
            const className = selectedImage === image ? "ProductDetails__image ProductDetails__image--active" : "ProductDetails__image";
            return <img className={className} src={image} alt="product" key={index} onClick={() => setSelectedImage(image)} />;
        });
    };

    return (
        <div className="ProductDetails">
            <div className="ProductDetails__images">{renderImages()}</div>
            <div className="ProductDetails__media">
                <img className="ProductDetails__selected" src={selectedImage} alt="product" />
            </div>
            <div className="ProductDetails__main">
                <h2 className="ProductDetails__title">{title}</h2>
                <div className="ProductDetails__rating">
                    <Rating avgRating={avgRating} />
                    <p className="ProductDetails__rating-avg">{avgRating}</p>
                    <p className="ProductDetails__reviews">{totalReviews} Reviews</p>
                </div>
                <p className="ProductDetails__price">$ {price.toFixed(2)}</p>
                <p className="ProductDetails__shipping">+2.50 $ Shipping</p>
                <ProductdDetailsForm productId={_id} availableSizes={details.size} availableColors={details.color} />
                <svg className="ProductDetails__intersect" width="134" height="120" viewBox="0 0 134 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M134 0.000612619V110C134 115.523 129.523 120 124 120H0V120C1.69346 109.353 4.51241 98.9167 8.41906 88.8936C15.2286 71.4227 25.2094 55.5483 37.7918 42.1766C50.3741 28.805 65.3115 18.198 81.7511 10.9614C98.1907 3.72467 115.811 0 133.605 0C133.736 0 133.868 0.000204235 134 0.000612619Z"
                        fill="#9551D9"
                        fillOpacity="0.38"
                    />
                </svg>
            </div>
            <Accordion features={details.features} id={id} />
        </div>
    );
};

export default ProductDetails;
