import React from "react";
import { StarIcon } from "../../assets/icon";

const Stars = ({ avgRating }) => {
    const ratingLength = [1, 2, 3, 4, 5]; /* temp */
    const renderStars = () => {
        return ratingLength.map((el) => {
            const color = parseInt(avgRating) >= el ? "#FCA311" : "rgba(149, 81, 217, 25%)";
            return <StarIcon key={el} className="Stars__icon" color={color} />;
        });
    };
    return <div style={{ display: "flex" }}>{renderStars()}</div>;
};

export default Stars;
