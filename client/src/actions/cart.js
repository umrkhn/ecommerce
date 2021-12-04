import server from "../api/server";
import { CREATE_CART, GET_CART, RESET_CART, ADD_CART_ITEM, REMOVE_CART_ITEM, INCREASE_QTY, DECREASE_QTY } from "./types";

export const createCart = () => async (dispatch, getState) => {
    try {
        const { accessToken } = getState().auth;
        const { data } = await server.post("/cart", {}, { headers: { Authorization: `Bearer ${accessToken}` } });
        dispatch({
            type: CREATE_CART,
            payload: data.payload,
        });
    } catch (error) {
        console.log(error.response);
    }
};

export const getCart = () => async (dispatch, getState) => {
    try {
        const { accessToken } = getState().auth;
        const { data } = await server.get("/cart", { headers: { Authorization: `Bearer ${accessToken}` } });
        dispatch({
            type: GET_CART,
            payload: data.payload,
        });
    } catch (error) {
        console.log(error.response);
    }
};

export const resetCart = (id) => async (dispatch, getState) => {
    try {
        const { accessToken } = getState().auth;
        const { data } = await server.delete(`/cart/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
        dispatch({
            type: RESET_CART,
            payload: data.payload,
        });
    } catch (error) {
        console.log(error.response);
    }
};

export const addItemToCart = (id, itemSelectedOptions) => async (dispatch, getState) => {
    try {
        const { accessToken } = getState().auth;
        const { data } = await server.post(`/cart/${id}/item`, itemSelectedOptions, { headers: { Authorization: `Bearer ${accessToken}` } });
        dispatch({
            type: ADD_CART_ITEM,
            payload: data.payload,
        });
    } catch (error) {
        console.log(error.response);
    }
};

export const removeCartItem = (id, itemId) => async (dispatch, getState) => {
    try {
        const { accessToken } = getState().auth;
        const { data } = await server.delete(`/cart/${id}/item/${itemId}`, { headers: { Authorization: `Bearer ${accessToken}` } });
        dispatch({
            type: REMOVE_CART_ITEM,
            payload: data.payload,
        });
    } catch (error) {
        console.log(error.response);
    }
};

export const increaseQty = (id, itemId) => async (dispatch, getState) => {
    try {
        const { accessToken } = getState().auth;
        const { data } = await server.patch(
            `/cart/${id}/item/${itemId}`,
            {},
            { params: { type: INCREASE_QTY }, headers: { Authorization: `Bearer ${accessToken}` } }
        );
        dispatch({
            type: INCREASE_QTY,
            payload: data.payload,
        });
    } catch (error) {
        console.log(error.response);
    }
};

export const decreaseQty = (id, itemId) => async (dispatch, getState) => {
    try {
        const { accessToken } = getState().auth;
        const { data } = await server.patch(
            `/cart/${id}/item/${itemId}`,
            {},
            { params: { type: DECREASE_QTY }, headers: { Authorization: `Bearer ${accessToken}` } }
        );
        dispatch({
            type: DECREASE_QTY,
            payload: data.payload,
        });
    } catch (error) {
        console.log(error.response);
    }
};
