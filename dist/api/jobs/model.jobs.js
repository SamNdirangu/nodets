"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jobSchema = new mongoose_1.default.Schema({
    position: {
        type: String,
        minlength: 5,
        maxlength: 30,
        required: [true, 'Job position is required'],
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 500,
    },
    company: {
        type: String,
        minlength: 5,
        maxlength: 30,
        required: [true, 'Company is required'],
    },
    status: {
        type: String,
        minlength: 5,
        maxlength: 30,
        default: 'pending',
        enum: ['pending', 'approved', 'rejected'],
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: [true, 'A User is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
exports.default = mongoose_1.default.model('Job', jobSchema);
