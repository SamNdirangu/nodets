import express from 'express';
import authRouter from './auth/router.auth';
import jobsRouter from './jobs/router.jobs';
import tasksRouter from './tasks/router.tasks';
import productRouter from './products/router.products';
import authenticateClient from '../middlewares/authentication';

const apiV1Router = express.Router();

//Routes
apiV1Router.use('/auth', authRouter);
apiV1Router.use('/products', productRouter);
apiV1Router.use('/jobs', authenticateClient, jobsRouter);
apiV1Router.use('/tasks', authenticateClient, tasksRouter);

export default apiV1Router;
