"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_custom_1 = __importDefault(require("../utils/errors/errors.custom"));
const authenticateClient = (req, _res, next) => {
    //Check request header
    const authHeader = req.headers.authorization;
    //Confirm authorization header is provided
    if (!authHeader || !authHeader.startsWith('Bearer '))
        throw new errors_custom_1.default.UnAuthorized('Authentication Invalid');
    const token = authHeader.split(' ')[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, String(process.env.JWTSecret));
        if (typeof payload == 'object')
            req.body.clientData = Object.assign({ id: payload._id });
        next();
    }
    catch (error) {
        throw new errors_custom_1.default.UnAuthorized('Authentication Invalid');
    }
};
exports.default = authenticateClient;
