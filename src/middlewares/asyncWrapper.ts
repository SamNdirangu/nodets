// You do not need this is using express-async-errrors
//This is for example purposes only
import { Request, Response, NextFunction } from 'express';

const asyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => void) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			console.log('oops');
			throw error;
		}
	};
};

export default asyncWrapper;
