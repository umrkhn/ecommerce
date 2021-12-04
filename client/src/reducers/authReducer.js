import { USER_SIGN_UP, USER_SIGN_IN, REFRESH_TOKEN, LOGOUT_USER } from "../actions/types";

const INITIAL_STATE = {
    isSignedIn: null,
    accessToken: null,
    expiresIn: null,
};

const authReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case USER_SIGN_UP:
        case USER_SIGN_IN:
        case REFRESH_TOKEN:
            return { isSignedIn: true, accessToken: payload.accessToken, expiresIn: payload.expiresIn };
        case LOGOUT_USER:
            return { isSignedIn: false, accessToken: null, expiresIn: null };
        default:
            return state;
    }
};

export default authReducer;
