import express from 'express';
import authenticateClient from '../../middlewares/authentication';
import controller from './controller.products';

const productRouter = express.Router();

productRouter.route('/')
	.get(controller.getAllProducts)
	.post(authenticateClient, controller.createProduct);

productRouter.route('/static').get(controller.getAllProductsStatic);

export default productRouter;
