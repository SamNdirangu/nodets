import express from 'express';
import controller from './controller.auth';
import authenticateClient from '../../middlewares/authentication';

const authRouter = express.Router();

authRouter.route('/signin').post(controller.signin);
authRouter.route('/signup').post(controller.signup);
authRouter.route('/account').get(controller.account);
authRouter.route('/signout').get(authenticateClient, controller.signOut);
authRouter.route('/users').get(authenticateClient, controller.getAllUsers);

export default authRouter;
