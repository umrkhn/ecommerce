import server from "../api/server";
import { createCart, getCart } from "./cart";
import { LOGOUT_USER, REFRESH_TOKEN, USER_SIGN_IN, USER_SIGN_UP } from "./types";

export const register = (formValues, navigate) => async (dispatch) => {
    try {
        const { data } = await server.post("/auth/user/register", formValues);
        dispatch({
            type: USER_SIGN_UP,
            payload: data.payload,
        });
        await dispatch(createCart());
        navigate("/products");
    } catch (error) {
        console.log(error.response);
    }
};

export const login = (formValues, navigate) => async (dispatch) => {
    try {
        const { data } = await server.post("/auth/user/login", formValues);
        dispatch({
            type: USER_SIGN_IN,
            payload: data.payload,
        });
        await dispatch(getCart());
        navigate("/products");
        setTimeout(() => {
            dispatch(refreshToken());
        }, data.payload.expiresIn - 5000);
    } catch (error) {
        console.log(error.response);
    }
};

export const refreshToken = () => async (dispatch) => {
    try {
        const { data } = await server.get("/auth/user/token");
        setTimeout(() => {
            dispatch(refreshToken());
        }, data.payload.expiresIn - 5000);
        dispatch({
            type: REFRESH_TOKEN,
            payload: data.payload,
        });
        await dispatch(getCart());
    } catch (error) {
        console.log(error.response);
    }
};

export const logout = () => async (dispatch) => {
    try {
        await server.get("/auth/user/logout");
        dispatch({
            type: LOGOUT_USER,
        });
    } catch (error) {
        console.log(error.response);
    }
};
