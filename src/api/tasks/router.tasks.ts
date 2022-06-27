import express from 'express';
import confirmAuth from '../../middlewares/confirmAuth';
import controller from './controller.tasks';

const taskRouter = express.Router();

//Get all our tasks and create a task
taskRouter.route('/')
	.get(controller.getAllTasks)
	.post(confirmAuth, controller.createTask);

//Get one task, update a task, delete a task
taskRouter.route('/:id')
	.get(controller.getTask)
	.patch(controller.updateTask)
	.delete(controller.deleteTask);

export default taskRouter;
