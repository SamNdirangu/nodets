import express from 'express';
import { StatusCodes } from "http-status-codes";

const heartBeat = async (req: express.Request, res: express.Response) => {
    res.status(StatusCodes.OK).send('Server is up: Heart beat:: Beat Beat...');
}

export default heartBeat;