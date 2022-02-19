"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_custom_1 = __importDefault(require("../utils/errors/errors.custom"));
const validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
const validateEmailandPasswordExists = (email, password) => {
    if (!email || !password)
        throw new errors_custom_1.default.BadRequest('Please provide email and password');
    return;
};
exports.default = {
    validateEmail,
    validateEmailandPasswordExists
};
