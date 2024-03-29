import express from 'express';
import userModel from '../api/auth/model.user';
import errors from '../utils/errors/errors.custom';

const confirmAuth = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	const id = req.body.clientData.id;
	const account = await userModel.findById(id);
	const isLoggedIn = account == null ? false : account.isLoggedIn;
	if (isLoggedIn) {
		next();
	} else throw new errors.UnAuthorized('Authentication Invalid');
};

export default confirmAuth;
