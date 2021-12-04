import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProductList.css";
import ProductCard from "../../components/cards/ProductCard";
import { fetchProducts } from "../../actions/products";

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const renderProducts = () => {
        return products.map((product) => {
            return <ProductCard key={product._id} {...product} />;
        });
    };

    return (
        <div className="ProductList">
            <h2 className="ProductList__count">{products.length} Products Found </h2>
            <div className="ProductList__results">{renderProducts()}</div>
        </div>
    );
};

export default ProductList;
