"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: [20, 'Name can not be more than 20 characters'],
        required: [true, 'Must provide a task name'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: [true, 'An owner ID is required'],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Task', TaskSchema);
