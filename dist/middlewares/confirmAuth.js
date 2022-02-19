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
const model_user_1 = __importDefault(require("../api/auth/model.user"));
const errors_custom_1 = __importDefault(require("../utils/errors/errors.custom"));
const confirmAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.clientData.id;
    const account = yield model_user_1.default.findById(id);
    console.log(account.isLoggedIn);
    const { isLoggedIn } = account;
    if (isLoggedIn) {
        next();
    }
    else
        throw new errors_custom_1.default.UnAuthorized('Authentication Invalid');
});
exports.default = confirmAuth;
