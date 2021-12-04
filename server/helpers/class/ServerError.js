class ServerError extends Error {
    constructor(message, statusCode, errors = {}) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export default ServerError;
