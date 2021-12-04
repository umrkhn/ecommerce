import { CLEAR_REVIEWS, FETCH_REVIEWS } from "../actions/types";

const reviewsReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_REVIEWS:
            return action.payload;
        case CLEAR_REVIEWS:
            return [];
        default:
            return state;
    }
};

export default reviewsReducer;
