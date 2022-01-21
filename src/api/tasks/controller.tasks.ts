//Get our task model
import Task from './model.tasks';
import express from 'express';
import asyncWrapper from '../../middlewares/asyncWrapper';
import errors from '../../utils/errors/errors.custom';

//Using post method information passed through the body
const createTask = asyncWrapper(async (req, res) => {
	//Only properties you set in the schema will be written to the database
	req.body.createdBy = req.body.clientData.id;
	//Other params in our req body will be ignonred.
	const task = await Task.create({ ...req.body });
	res.status(201).json(task);
});

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find();
	res.status(200).json(tasks);
});

//URL passed params
const getTask = async (req: express.Request, res: express.Response) => {
	const id = req.params.id;
	const task = await Task.findById(id);
	if (!task) {
		throw new errors.CustomAPIError(`No task found with such id: ${id}`, 404);
	}
	res.status(200).json(task);
};

//
const updateTask = asyncWrapper(async (req, res, next) => {
	const id = req.params.id;
	const task = await Task.findByIdAndUpdate(id, req.body);
	if (!task) {
		return next(errors.createCustom(`No task found with such id: ${id}`, 404));
	}
	res.status(200).json(task);
});

//
const deleteTask = asyncWrapper(async (req, res, next) => {
	const id = req.params.id;
	const task = await Task.findByIdAndDelete(id);
	if (!task) {
		return next(errors.createCustom(`No task found with such id: ${id}`, 404));
	}
	res.status(200).json(task);
});

export default {
	createTask,
	updateTask,
	deleteTask,
	getAllTasks,
	getTask,
};
