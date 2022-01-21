import express from 'express';
import { StatusCodes } from 'http-status-codes';
import Errors from '../utils/errors/errors.custom';

const errorHandlerMiddleware = (
	err: any,
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	if (err instanceof Errors.CustomAPIError) {
		return res.status(err.status).send(err.message);
	}
	let customError = {
		status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
		message: err.message || 'Ooooops snap something broke, please try again later',
	};
	if (err.code && err.code === 11000) {
		customError.message = `The entered ${Object.keys(err.keyValue)[0]} : ${
			Object.values(err.keyValue)[0]
		} is not unique.All ${Object.keys(err.keyValue)[0]}s should be unique`;
		customError.status = 400;
	}
	if (err.name === 'ValidationError') {
		customError.message = Object.values(err.errors)
			.map((item: any) => item.message)
			.join(',');
		customError.status = StatusCodes.BAD_REQUEST;
	}
	if (err.name === 'CastError') {
		customError.message = 'No item found with id: ' + err.value;
		customError.status = 404;
	}
	res.status(customError.status).send(customError.message);
};

export default errorHandlerMiddleware;
