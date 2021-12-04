import server from "../api/server";
import { CLEAR_REVIEWS, FETCH_REVIEWS } from "./types";

export const fetchReviews = (id) => async (dispatch) => {
    try {
        const { data } = await server.get(`/products/${id}/reviews`);
        dispatch({
            type: FETCH_REVIEWS,
            payload: data.payload,
        });
    } catch (error) {
        console.log(error.response);
    }
};

export const clearReviews = () => {
    return {
        type: CLEAR_REVIEWS,
    };
};
