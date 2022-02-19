"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_auth_1 = __importDefault(require("./controller.auth"));
const authentication_1 = __importDefault(require("../../middlewares/authentication"));
const authRouter = express_1.default.Router();
authRouter.route('/signin').post(controller_auth_1.default.signin);
authRouter.route('/signup').post(controller_auth_1.default.signup);
authRouter.route('/signout').get(authentication_1.default, controller_auth_1.default.signOut);
authRouter.route('/account').get(controller_auth_1.default.account);
authRouter.route('/users').get(authentication_1.default, controller_auth_1.default.getAllUsers);
exports.default = authRouter;
