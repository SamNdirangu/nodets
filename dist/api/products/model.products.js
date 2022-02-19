"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: ['Product price is required'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
    },
    company: {
        type: String,
        enum: {
            values: ['SakaDevs', 'Google', 'Microsoft'],
            message: '{VALUE} is not currently supported',
        },
    },
});
exports.default = mongoose_1.default.model('Product', productSchema);
