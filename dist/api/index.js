"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_auth_1 = __importDefault(require("./auth/router.auth"));
const router_jobs_1 = __importDefault(require("./jobs/router.jobs"));
const router_tasks_1 = __importDefault(require("./tasks/router.tasks"));
const router_products_1 = __importDefault(require("./products/router.products"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const apiV1Router = express_1.default.Router();
apiV1Router.use('/auth', router_auth_1.default);
apiV1Router.use('/products', router_products_1.default);
apiV1Router.use('/jobs', authentication_1.default, router_jobs_1.default);
apiV1Router.use('/tasks', authentication_1.default, router_tasks_1.default);
exports.default = apiV1Router;
