import React from "react";
import moment from "moment";
import Rating from "../components/misc/Rating";
import "./Review.css";

const Review = ({ firstName, lastName, rating, description, createdAt }) => {
    return (
        <div className="Review">
            <div className="Review__profile">{firstName[0] + lastName[0]}</div>
            <div className="Review__body">
                <div className="Review__header">
                    <h4 className="Review__name">{firstName + " " + lastName}</h4>
                    <Rating avgRating={rating} />
                </div>
                <small className="Review__timestamp">{moment(createdAt).fromNow()}</small>
                <p className="Review__description">{description}</p>
            </div>
        </div>
    );
};

export default Review;
