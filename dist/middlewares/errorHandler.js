"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errors_custom_1 = __importDefault(require("../utils/errors/errors.custom"));
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof errors_custom_1.default.CustomAPIError) {
        //If its a custom defined errror thrown
        return res.status(err.status).send(err.message);
    }
    //For all errors generated by non custom error throwers such as mongoose and express
    let customError = {
        status: err.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Ooooops snap something broke, please try again later',
    };
    if (err.code && err.code === 11000) {
        customError.message = `The entered ${Object.keys(err.keyValue)[0]} : ${Object.values(err.keyValue)[0]} is not unique.All ${Object.keys(err.keyValue)[0]}s should be unique`;
        customError.status = 400;
    }
    if (err.name === 'ValidationError') {
        customError.message = Object.values(err.errors)
            .map((item) => item.message)
            .join(',');
        customError.status = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    if (err.name === 'CastError') {
        customError.message = 'No item found with id: ' + err.value;
        customError.status = 404;
    }
    res.status(customError.status).send(customError.message);
};
exports.default = errorHandlerMiddleware;