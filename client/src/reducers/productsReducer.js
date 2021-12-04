import { FETCH_PRODUCTS, CREATE_PRODUCT, EDIT_PRODUCT, FETCH_ONE_PRODUCT } from "../actions/types";

const productsReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return action.payload;
        case CREATE_PRODUCT:
            return [...state, action.payload];
        case FETCH_ONE_PRODUCT:
        case EDIT_PRODUCT:
            if (state.length === 0) return [action.payload];
            return state.map((product) => (product._id === action.payload._id ? action.payload : product));
        default:
            return state;
    }
};

export default productsReducer;
