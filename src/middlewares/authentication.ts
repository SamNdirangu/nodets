import express from 'express';
import jwt from 'jsonwebtoken';
import { envs } from '../envVerify';
import errors from '../utils/errors/errors.custom';

const authenticateClient = (
	req: express.Request,
	_res: express.Response,
	next: express.NextFunction,
) => {
	//Check request header
	const authHeader = req.headers.authorization;
	//Confirm authorization header is provided
	if (!authHeader || !authHeader.startsWith('Bearer '))
		throw new errors.UnAuthorized('Authentication Invalid');

	const token = authHeader.split(' ')[1];
	try {
		const payload = jwt.verify(token, envs.JWTSecret);
		if (typeof payload == 'object') req.body.clientData = { ...{ id: payload._id } };
		next();
	} catch (error) {
		throw new errors.UnAuthorized('Authentication Invalid');
	}
};

export default authenticateClient;
