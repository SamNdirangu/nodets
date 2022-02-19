"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../../middlewares/authentication"));
const controller_products_1 = __importDefault(require("./controller.products"));
const productRouter = express_1.default.Router();
productRouter
    .route('/')
    .get(controller_products_1.default.getAllProducts)
    .post(authentication_1.default, controller_products_1.default.createProduct);
productRouter.route('/static').get(controller_products_1.default.getAllProductsStatic);
exports.default = productRouter;
