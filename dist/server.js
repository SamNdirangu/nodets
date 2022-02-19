"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Before starting our server ensure that the required environmental variables are present;
require('./functions/envVerify').verifyEnvVariables();
require('dotenv').config();
const express_1 = __importDefault(require("express"));
require("express-async-errors");
//Security packages
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const api_1 = __importDefault(require("./api"));
const dbConnect_1 = __importDefault(require("./database/dbConnect"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const app = (0, express_1.default)();
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100, // limit each IP to 100 request per windowms
}));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/v1', api_1.default); //Version 1 App APIs
//Error handlers
app.use(notFound_1.default);
app.use(errorHandler_1.default);
const port = process.env.port || 80;
const startApp = () => {
    console.log('Connecting to database...');
    (0, dbConnect_1.default)(String(process.env.dbConnectionURL))
        .then(() => {
        console.log('Database connected to successfully');
        console.log('Server starting up.......');
        app.listen(port, () => {
            console.log('Server is listening at http://localhost:' + port);
        });
    })
        .catch((err) => {
        console.error('Error:: Could not connect to database...');
        console.error(err);
    });
};
startApp();
