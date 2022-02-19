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
const http_status_codes_1 = require("http-status-codes");
const apiFunctions_1 = __importDefault(require("../../functions/apiFunctions"));
const model_products_1 = __importDefault(require("./model.products"));
const getAllProductsStatic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numericFilters } = req.query;
    const products = yield model_products_1.default.where('price').gt(300);
    res.status(200).json({ nbHits: products.length, products });
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Get all our passed params
    const { name, featured, company, createdBy, numericFilters } = req.query; //Within model schema
    const { fields, sort } = req.query; //not within model schema
    const numericalParams = ['price', 'rating'];
    //Initialize our productsQuery
    let productQuery = model_products_1.default.find();
    //Filters passed via query========================================
    //Schema based filters -------------------------------------------
    //Creator filter
    if (createdBy)
        productQuery = productQuery.where('createdBy').equals(createdBy);
    //Name filter
    if (name)
        productQuery = productQuery.where('name').regex(String(name));
    //Featured filter
    if (featured)
        productQuery = productQuery.where('featured').equals(featured);
    //Company Filter
    if (company)
        productQuery = productQuery.where('company').equals(company);
    //Numerical Filter
    if (numericFilters)
        productQuery = apiFunctions_1.default.numericalFilterBuilder(productQuery, String(numericFilters), numericalParams);
    //Only display the provided fields filter
    if (fields)
        productQuery = productQuery.select(String(fields).split(',').join(' ')); //cant use comma replace with space
    //Non Schema based ================================================
    //Sort
    if (sort) {
        productQuery = productQuery.sort(String(sort).split(',').join(' ')); //cant use comma replace with space
    }
    else
        productQuery = productQuery.sort('createdAt');
    //paging
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    productQuery = productQuery.skip(skip).limit(limit);
    //-------------------------------------------------------------------
    //Now we wait for our products
    const products = yield productQuery;
    res.status(200).json({ page, nbHits: products.length, products });
});
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.createdBy = req.body.clientData.id;
    const product = yield model_products_1.default.create(Object.assign({}, req.body));
    res.status(http_status_codes_1.StatusCodes.CREATED).json(product);
});
exports.default = { getAllProductsStatic, getAllProducts, createProduct };
