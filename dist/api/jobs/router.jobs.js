"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_jobs_1 = __importDefault(require("./controller.jobs"));
const jobsRouter = express_1.default.Router();
jobsRouter.route('/').get(controller_jobs_1.default.getAllJobs).post(controller_jobs_1.default.createJob);
jobsRouter
    .route('/:id')
    .get(controller_jobs_1.default.getJob)
    .patch(controller_jobs_1.default.updateJob)
    .delete(controller_jobs_1.default.deleteJob);
jobsRouter.route('/user/:id').get(controller_jobs_1.default.getUserJob);
exports.default = jobsRouter;
