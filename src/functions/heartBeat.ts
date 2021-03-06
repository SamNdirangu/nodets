import express from 'express';
import { StatusCodes } from "http-status-codes";

const heartBeat = async (req: express.Request, res: express.Response) => {
    console.log('Heart beat:: Beat Beat...');
    res.status(StatusCodes.OK).send('Server is up and running: Heart beat:: Beat Beat...');
}

export default heartBeat;