import server from "../api/server";
import { FETCH_PRODUCTS, FETCH_ONE_PRODUCT } from "./types";

export const fetchProducts = () => async (dispatch) => {
    try {
        const { data } = await server.get("/products");
        dispatch({
            type: FETCH_PRODUCTS,
            payload: data.payload,
        });
    } catch (error) {
        console.log(error.response);
    }
};

export const fetchOneProduct = (id) => async (dispatch) => {
    try {
        const { data } = await server.get(`/products/${id}`);
        dispatch({
            type: FETCH_ONE_PRODUCT,
            payload: data.payload,
        });
    } catch (error) {
        console.log(error.response);
    }
};

// export const createProduct = (formValues) => async (dispatch) => {
//     try {
//         const { data } = await server.post("/products", formValues);
//         dispatch({
//             type: CREATE_PRODUCT,
//             payload: data.payload,
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const editProduct = (id, formValues) => async (dispatch) => {
//     try {
//         const { data } = await server.put(`/products/${id}`, formValues);
//         dispatch({
//             type: EDIT_PRODUCT,
//             payload: data.payload,
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };
