import jwt from "jsonwebtoken";
import ServerError from "../helpers/class/ServerError.js";
import { wrapAsync } from "../helpers/index.js";
import { ACCESS_TOKEN_SECRET } from "../config/token.config.js";

export const authorizeUser = wrapAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new ServerError("Access_token Required!", 400);
    const [, accessToken] = authHeader.split(" ");
    if (!accessToken) throw new ServerError("Access_token Not Found!", 404);
    const decodedToken = await jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    req.user = decodedToken;
    next();
});
