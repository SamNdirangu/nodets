require('dotenv').config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authModel from '../model.user';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import customErrors from '../../../utils/errors/errors.custom';
import validators from '../../../functions/validators';

//Sign up process with email------------------------------
//validate email and password
//Hash password
//Create token and send response with token
const signup = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	validators.validateEmailandPasswordExists(email, password);

	const account = await authModel.create({ ...req.body });

	res.status(StatusCodes.CREATED).json({ id: account.id, email });
};
