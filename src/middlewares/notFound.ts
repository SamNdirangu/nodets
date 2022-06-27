import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) =>
	res.status(404).send('Ooops 404: Requested resource does not exist');

export default notFound;
