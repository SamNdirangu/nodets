import express from 'express';
import { StatusCodes } from 'http-status-codes';
import jobModel from './model.jobs';
import errors from '../../utils/errors/errors.custom';

const createJob = async (req: express.Request, res: express.Response) => {
	req.body.createdBy = req.body.clientData.id;
	const job = await jobModel.create({ ...req.body });
	res.status(StatusCodes.CREATED).json(job);
};
const getAllJobs = async (req: express.Request, res: express.Response) => {
	//Get all our needed passed queries
	const { position, status, company, createdBy } = req.query; //Within model schema
	const { fields, sort } = req.query; //not within model schema
	//Initialize our productsQuery
	let jobsQuery = jobModel.find();

	//Filters passed via query========================================
	//Schema based filters -------------------------------------------
	//Creator filter
	if (createdBy) jobsQuery = jobsQuery.where('createdBy').equals(createdBy);
	//Name filter
	if (position) jobsQuery = jobsQuery.where('position').regex(String(position));
	//Company Filter
	if (company) jobsQuery = jobsQuery.where('company').regex(String(company));
	//status Filter
	if (status) jobsQuery = jobsQuery.where('status').equals(status);
	//Only display the provided fields filter
	if (fields) jobsQuery = jobsQuery.select(String(fields).split(',').join(' ')); //cant use comma replace with space

	//Non Schema based ================================================
	//Sort
	if (sort) {
		jobsQuery = jobsQuery.sort(String(sort).split(',').join(' ')); //cant use comma replace with space
	} else jobsQuery = jobsQuery.sort('createdAt');

	//paging
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;
	jobsQuery = jobsQuery.skip(skip).limit(limit);
	//-------------------------------------------------------------------

	//Now we wait for our products
	const jobs = await jobsQuery;
	res.status(StatusCodes.OK).json({ page, nbHits: jobs.length, jobs });
};
const getJob = async (req: express.Request, res: express.Response) => {
	const id = req.params.id;
	const job = await jobModel.findById(id);
	if (!job) {
		throw new errors.NotFound('No job found with the id: ' + id);
	}
	res.status(StatusCodes.OK).json(job);
};
const getUserJob = async (req: express.Request, res: express.Response) => {
	const _id = req.params.id;
	const createdBy = req.body.clientData.id;
	const job = await jobModel.find({ _id, createdBy });
	if (!job) {
		throw new errors.NotFound('No job found with the id: ' + _id);
	}
	res.status(StatusCodes.OK).json(job);
};
const updateJob = async (req: express.Request, res: express.Response) => {
	const id = req.params.id;
	const {
		body: { company, position },
	} = req;
	if (company == '' || position == '')
		throw new errors.BadRequest('Company and Position cannot ve empty');
	const job = await jobModel.findByIdAndUpdate(id, req.body);
	if (!job) {
		throw new errors.NotFound('No job found with the id: ' + id);
	}
	res.status(StatusCodes.OK).json(job);
};
const deleteJob = async (req: express.Request, res: express.Response) => {
	const id = req.params.id;
	const job = await jobModel.findByIdAndDelete(id);
	if (!job) throw new errors.NotFound('No job found with the id: ' + id);
	res.status(StatusCodes.OK).json(job);
};

export default {
	createJob,
	getAllJobs,
	getJob,
	getUserJob,
	updateJob,
	deleteJob,
};
