import express from 'express';
import { StatusCodes } from "http-status-codes";

const heartBeat = async (req: express.Request, res: express.Response) => {
    res.status(StatusCodes.OK).send('Beat Beat...');
}

export default heartBeat;