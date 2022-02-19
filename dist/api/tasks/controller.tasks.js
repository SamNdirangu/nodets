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
//Get our task model
const model_tasks_1 = __importDefault(require("./model.tasks"));
const asyncWrapper_1 = __importDefault(require("../../middlewares/asyncWrapper"));
const errors_custom_1 = __importDefault(require("../../utils/errors/errors.custom"));
//Using post method information passed through the body
const createTask = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Only properties you set in the schema will be written to the database
    req.body.createdBy = req.body.clientData.id;
    //Other params in our req body will be ignonred.
    const task = yield model_tasks_1.default.create(Object.assign({}, req.body));
    res.status(201).json(task);
}));
const getAllTasks = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield model_tasks_1.default.find();
    res.status(200).json(tasks);
}));
//URL passed params
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield model_tasks_1.default.findById(id);
    if (!task) {
        throw new errors_custom_1.default.CustomAPIError(`No task found with such id: ${id}`, 404);
    }
    res.status(200).json(task);
});
//
const updateTask = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield model_tasks_1.default.findByIdAndUpdate(id, req.body);
    if (!task) {
        return next(errors_custom_1.default.createCustom(`No task found with such id: ${id}`, 404));
    }
    res.status(200).json(task);
}));
//
const deleteTask = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield model_tasks_1.default.findByIdAndDelete(id);
    if (!task) {
        return next(errors_custom_1.default.createCustom(`No task found with such id: ${id}`, 404));
    }
    res.status(200).json(task);
}));
exports.default = {
    createTask,
    updateTask,
    deleteTask,
    getAllTasks,
    getTask,
};
