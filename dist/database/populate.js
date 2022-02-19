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
require('dotenv').config();
const connectDB = require('./dbConnect');
const Product = require('../api/products/model.products');
const jsonProducts = require('./data/products.json');
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Connecting to database...');
        yield connectDB(process.env.dbConnectionURL);
        console.log('Database connected to successfuly');
        yield Product.deleteMany();
        console.log('Products collection cleansed... ');
        yield Product.create(jsonProducts);
        console.log('Products updated successfully');
    }
    catch (error) {
        console.error(error);
    }
});
start();
