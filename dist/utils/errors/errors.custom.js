"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class CustomAPIError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
class NotFound extends CustomAPIError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.NOT_FOUND);
    }
}
class UnAuthorized extends CustomAPIError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
}
//Error Instantiators if needed ================================
const createCustom = (message, status) => {
    return new CustomAPIError(message, status);
};
exports.default = {
    CustomAPIError,
    BadRequest,
    NotFound,
    UnAuthorized,
    //
    createCustom,
};
