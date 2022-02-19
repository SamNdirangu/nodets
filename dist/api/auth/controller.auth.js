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
const model_user_1 = __importDefault(require("./model.user"));
const validators_1 = __importDefault(require("../../functions/validators"));
const errors_custom_1 = __importDefault(require("../../utils/errors/errors.custom"));
//Sign up process with email------------------------------
//validate email and password
//Hash password
//Create token and send response with token
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Get our account
    const account = yield model_user_1.default.create(Object.assign({}, req.body));
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        id: account.id,
        email: account.email,
        token: account.createJWT(),
    });
});
//Sign in Process with email----------------------------------------
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    validators_1.default.validateEmailandPasswordExists(email, password);
    const account = yield model_user_1.default.findOne({ email });
    if (!account)
        throw new errors_custom_1.default.UnAuthorized('Invalid Credentials');
    //compare password
    const isPasswordCorrect = yield account.comparePassword(password);
    if (!isPasswordCorrect)
        throw new errors_custom_1.default.UnAuthorized('Invalid Credentials');
    //Send our token
    res.status(http_status_codes_1.StatusCodes.OK).json({ token: account.createJWT() });
});
//Sign in Process with email----------------------------------------
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.clientData.id;
    yield model_user_1.default.findByIdAndUpdate(id, Object.assign({ isLoggedIn: false }));
    //Send our token
    res.status(http_status_codes_1.StatusCodes.OK).json({});
});
//Get account data --------------------------------------------
//
const account = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    //Confirm authorization header is provided
    if (!authHeader || !authHeader.startsWith('Bearer '))
        throw new errors_custom_1.default.UnAuthorized('No auth token provided');
    //Verifiy token
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, String(process.env.JWTSecret));
        if (typeof decodedToken == 'string')
            return res.send('Hello at ' + decodedToken);
        //
        res.send('Hello at ' + decodedToken.username);
    }
    catch (error) {
        throw new errors_custom_1.default.UnAuthorized('Not Authorized');
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield model_user_1.default.find().select('-password');
    res.status(200).json(users);
});
exports.default = { account, signin, signup, signOut, getAllUsers };
