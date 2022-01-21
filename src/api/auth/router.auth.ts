import express from 'express';
import authenticateClient from '../../middlewares/authentication';
import controller from './controller.auth';

const authRouter = express.Router();

authRouter.route('/signin').post(controller.sigin);
authRouter.route('/signup').post(controller.signup);
authRouter.route('/account').get(controller.account);
authRouter.route('/users').get(authenticateClient, controller.getAllUsers);

export default authRouter;
