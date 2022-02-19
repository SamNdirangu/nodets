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
const model_jobs_1 = __importDefault(require("./model.jobs"));
const errors_custom_1 = __importDefault(require("../../utils/errors/errors.custom"));
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.createdBy = req.body.clientData.id;
    const job = yield model_jobs_1.default.create(Object.assign({}, req.body));
    res.status(http_status_codes_1.StatusCodes.CREATED).json(job);
});
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Get all our needed passed queries
    const { position, status, company, createdBy } = req.query; //Within model schema
    const { fields, sort } = req.query; //not within model schema
    //Initialize our productsQuery
    let jobsQuery = model_jobs_1.default.find();
    //Filters passed via query========================================
    //Schema based filters -------------------------------------------
    //Creator filter
    if (createdBy)
        jobsQuery = jobsQuery.where('createdBy').equals(createdBy);
    //Name filter
    if (position)
        jobsQuery = jobsQuery.where('position').regex(String(position));
    //Company Filter
    if (company)
        jobsQuery = jobsQuery.where('company').regex(String(company));
    //status Filter
    if (status)
        jobsQuery = jobsQuery.where('status').equals(status);
    //Only display the provided fields filter
    if (fields)
        jobsQuery = jobsQuery.select(String(fields).split(',').join(' ')); //cant use comma replace with space
    //Non Schema based ================================================
    //Sort
    if (sort) {
        jobsQuery = jobsQuery.sort(String(sort).split(',').join(' ')); //cant use comma replace with space
    }
    else
        jobsQuery = jobsQuery.sort('createdAt');
    //paging
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    jobsQuery = jobsQuery.skip(skip).limit(limit);
    //-------------------------------------------------------------------
    //Now we wait for our products
    const jobs = yield jobsQuery;
    res.status(http_status_codes_1.StatusCodes.OK).json({ page, nbHits: jobs.length, jobs });
});
//
const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const job = yield model_jobs_1.default.findById(id);
    if (!job) {
        throw new errors_custom_1.default.NotFound('No job found with the id: ' + id);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(job);
});
//
const getUserJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const createdBy = req.body.clientData.id;
    const job = yield model_jobs_1.default.find({ _id, createdBy });
    if (!job) {
        throw new errors_custom_1.default.NotFound('No job found with the id: ' + _id);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(job);
});
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { body: { company, position }, } = req;
    if (company == '' || position == '')
        throw new errors_custom_1.default.BadRequest('Company and Position cannot ve empty');
    const job = yield model_jobs_1.default.findByIdAndUpdate(id, req.body);
    if (!job) {
        throw new errors_custom_1.default.NotFound('No job found with the id: ' + id);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(job);
});
//
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const job = yield model_jobs_1.default.findByIdAndDelete(id);
    if (!job)
        throw new errors_custom_1.default.NotFound('No job found with the id: ' + id);
    res.status(http_status_codes_1.StatusCodes.OK).json(job);
});
exports.default = {
    createJob,
    getAllJobs,
    getJob,
    getUserJob,
    updateJob,
    deleteJob,
};
