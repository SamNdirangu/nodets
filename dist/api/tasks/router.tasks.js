"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const confirmAuth_1 = __importDefault(require("../../middlewares/confirmAuth"));
const controller_tasks_1 = __importDefault(require("./controller.tasks"));
const taskRouter = express_1.default.Router();
//Get all our tasks and create a task
taskRouter
    .route('/')
    .get(controller_tasks_1.default.getAllTasks)
    .post(confirmAuth_1.default, controller_tasks_1.default.createTask);
//Get one task, update a task, delete a task
taskRouter
    .route('/:id')
    .get(controller_tasks_1.default.getTask)
    .patch(controller_tasks_1.default.updateTask)
    .delete(controller_tasks_1.default.deleteTask);
exports.default = taskRouter;
