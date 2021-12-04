import dotEnv from "dotenv";
dotEnv.config();

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRY = "900000"; /* 15 min */
export const REFRESH_TOKEN_EXPIRY = "2d"; /* 2 days */
export const COOKIE_EXPIRY = new Date(Date.now() + 1000 * (60 * 60 * 24 * 2)); /* 2 days */

export const generateTokenPayload = ({ userId, firstName, lastName }) => {
    return { iss: "ecommerce.com", id: userId, firstName, lastName };
};
