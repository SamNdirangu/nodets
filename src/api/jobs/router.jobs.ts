import express from 'express';
import controller from './controller.jobs';

const jobsRouter = express.Router();

jobsRouter.route('/').get(controller.getAllJobs).post(controller.createJob);
jobsRouter
	.route('/:id')
	.get(controller.getJob)
	.patch(controller.updateJob)
	.delete(controller.deleteJob);
jobsRouter.route('/user/:id').get(controller.getUserJob);

export default jobsRouter;
