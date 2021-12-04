import ServerError from "./class/ServerError.js";

export const wrapAsync = (cb) => (req, res, next) => {
    cb(req, res, next).catch(next);
};

export const successRes = (message, statusCode, payload) => {
    return {
        message,
        statusCode,
        payload,
    };
};

export const prseMongoValidationErr = (err) => {
    const obj = {};
    for (const key in err.errors) obj[key] = err.errors[key].message;
    return new ServerError("Validation Error Occurred", 422, obj);
};
