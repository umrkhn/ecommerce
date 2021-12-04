import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../actions/reviews";
import "./Accordion.css";
import Review from "./Review";

const links = ["features", "reviews"];

const Accordion = ({ features, id }) => {
    const [active, setActive] = useState(links[0]);
    const reviews = useSelector((state) => state.reviews);
    const dispatch = useDispatch();
    useEffect(() => {
        if (active === "reviews") dispatch(fetchReviews(id));
    }, [active, dispatch, id]);

    const renderLinks = () => {
        return links.map((link, index) => {
            const className = active === link ? "Accordion__link Accordion__link--active" : "Accordion__link";
            return (
                <button className={className} key={index} onClick={() => setActive(link)}>
                    {link}
                </button>
            );
        });
    };
    const renderFeatures = () => {
        const arr = [];
        let count = 0;
        for (const key in features) {
            arr.push(
                <li className="Accordion__feature" key={count}>
                    <span className="Accordion__feature-label">{key}:</span>
                    <span>{features[key]}</span>
                </li>
            );
            count++;
        }
        return arr;
    };
    const renderReviews = () => {
        if (!reviews.length) return <div className="Loading">...loading</div>;
        return reviews.map((review) => <Review key={review._id} {...review} />);
    };

    const renderBody = () => {
        if (active === "features") return <ul className="Accordion__list">{renderFeatures()}</ul>;
        if (active === "reviews") return renderReviews();
    };
    return (
        <div className="Accordion">
            <div className="Accordion__nav">{renderLinks()}</div>
            <div className="Accordion__body">{renderBody()}</div>
        </div>
    );
};

export default Accordion;
