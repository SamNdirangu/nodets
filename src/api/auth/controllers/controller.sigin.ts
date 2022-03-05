require('dotenv').config();
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { envs } from '../../../envVerify';
import authModel from '../model.user';
import validators from '../../../functions/validators';
import customErrors from '../../../utils/errors/errors.custom';

//Sign in Process with email----------------------------------------
const sigin = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	validators.validateEmailandPasswordExists(email, password);

	const account = await authModel.findOne({ email });
	if (!account)
		throw new customErrors.UnAuthorized('No user exists with such email password');
	if (account.password != password)
		throw new customErrors.UnAuthorized('Wrong password');
	//Sign our token
	//ForJWT its besst practice to keep the payload small for better user experience
	const token = jwt.sign(
		{ id: account.id, username: 'Sam' },
		envs.JWTSecret,
		{ expiresIn: '30d' },
	);
	//Send our token
	res.status(StatusCodes.OK).json({ token: token });
};
