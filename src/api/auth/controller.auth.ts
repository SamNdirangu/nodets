require('dotenv').config();
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { envs } from '../../envVerify';
import userModel from './model.user';
import validators from '../../functions/validators';
import customErrors from '../../utils/errors/errors.custom';

//Sign up process with email------------------------------
//validate email and password
//Hash password
//Create token and send response with token
const signup = async (req: Request, res: Response) => {
	//Get our account
	const account = await userModel.create({ ...req.body });
	res.status(StatusCodes.CREATED).json({
		id: account.id,
		email: account.email,
		token: account.createJWT(),
	});
};

//Sign in Process with email----------------------------------------
const signin = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	validators.validateEmailandPasswordExists(email, password);

	const account = await userModel.findOne({ email });
	if (!account) throw new customErrors.UnAuthorized('Invalid Credentials');
	//compare password
	const isPasswordCorrect = await account.comparePassword(password);
	if (!isPasswordCorrect) throw new customErrors.UnAuthorized('Invalid Credentials');

	//Send our token
	res.status(StatusCodes.OK).json({ token: account.createJWT() });
};

//Sign in Process with email----------------------------------------
const signOut = async (req: Request, res: Response) => {
	const id = req.body.clientData.id;
	await userModel.findByIdAndUpdate(id, { ...{ isLoggedIn: false } });
	//Send our token
	res.status(StatusCodes.OK).json({});
};

//Get account data --------------------------------------------
//
const account = async (req: Request, res: Response) => {
	const authHeader = req.headers.authorization;
	//Confirm authorization header is provided
	if (!authHeader || !authHeader.startsWith('Bearer '))
		throw new customErrors.UnAuthorized('No auth token provided');
	//Verifiy token
	const token = authHeader.split(' ')[1];
	try {
		const decodedToken = jwt.verify(token, envs.JWTSecret);
		if (typeof decodedToken == 'string') return res.send('Hello at ' + decodedToken);
		//
		res.send('Hello at ' + decodedToken.username);
	} catch (error) {
		throw new customErrors.UnAuthorized('Not Authorized');
	}
};

const getAllUsers = async (req: Request, res: Response) => {
	const users = await userModel.find().select('-password');
	res.status(200).json(users);
};

export default { account, signin, signup, signOut, getAllUsers };
