import { ADD_CART_ITEM, CREATE_CART, DECREASE_QTY, GET_CART, INCREASE_QTY, REMOVE_CART_ITEM, RESET_CART } from "../actions/types";

const INITIAL_STATE = {
    id: null,
    userId: null,
    total: null,
    cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case CREATE_CART:
        case GET_CART:
        case RESET_CART:
        case ADD_CART_ITEM:
        case REMOVE_CART_ITEM:
        case INCREASE_QTY:
        case DECREASE_QTY:
            return { ...state, userId: payload.user, active: payload.active, total: payload.total, cartItems: payload.cartItems, id: payload._id };
        default:
            return state;
    }
};

export default cartReducer;
