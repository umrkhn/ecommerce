import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import productsReducer from "./productsReducer";
import reviewsReducer from "./reviewsReducer";

export default combineReducers({
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    reviews: reviewsReducer,
});
