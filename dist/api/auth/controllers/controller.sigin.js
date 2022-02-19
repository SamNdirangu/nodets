"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const model_user_1 = __importDefault(require("../model.user"));
const validators_1 = __importDefault(require("../../../functions/validators"));
const errors_custom_1 = __importDefault(require("../../../utils/errors/errors.custom"));
//Sign in Process with email----------------------------------------
const sigin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    validators_1.default.validateEmailandPasswordExists(email, password);
    const account = yield model_user_1.default.findOne({ email });
    if (!account)
        throw new errors_custom_1.default.UnAuthorized('No user exists with such email password');
    if (account.password != password)
        throw new errors_custom_1.default.UnAuthorized('Wrong password');
    //Sign our token
    //ForJWT its besst practice to keep the payload small for better user experience
    const token = jsonwebtoken_1.default.sign({ id: account.id, username: 'Sam' }, String(process.env.JWTSecret), { expiresIn: '30d' });
    //Send our token
    res.status(http_status_codes_1.StatusCodes.OK).json({ token: token });
});
