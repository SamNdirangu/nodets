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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const validators_1 = __importDefault(require("../../functions/validators"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: [validators_1.default.validateEmail, 'Please fill a valid email address'],
    },
    password: String,
    isLoggedIn: {
        type: Boolean,
        default: true,
    },
});
//Hash Password - Always Hash password before saving
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
        next();
    });
});
//Compare password
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatch = yield bcryptjs_1.default.compare(candidatePassword, this.password);
        return isMatch;
    });
};
//Sign and return our jwt token
userSchema.methods.createJWT = function () {
    return jsonwebtoken_1.default.sign({ _id: this._id, email: this.email }, String(process.env.JWTSecret), {
        expiresIn: String(process.env.JWTLifetime),
    });
};
exports.default = mongoose_1.default.model('User', userSchema);
