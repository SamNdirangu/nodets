//Before starting our server ensure that the required environmental variables are present;

require('dotenv').config();
import express from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';
//Security packages
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
//Custom packages
import { envs } from "./envVerify";
import apiV1Router from './api';
import connectDB from './database/dbConnect';
import heartBeat from './functions/heartBeat';
import swaggerDoc from './utils/swaggerLoader';
import notFoundMiddleWare from './middlewares/notFound';
import errorHandlerMiddleWare from './middlewares/errorHandler';

const app = express();
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000, //15 minutes
		max: 100, // limit each IP to 100 request per windowms
	}),
);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.enable('trust proxy');
app.use(express.urlencoded({ extended: false }));

//API Endpoints
//Heart beat / server testing route
app.get('/', heartBeat);
//Version 1 App APIs and swagger docs
app.use('/api/v1', apiV1Router);
app.use('/swagger/v1', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

//======================================================
//Error handlers
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

//=======================================================
const port = envs.PORT;
const startApp = () => {
	console.log('Connecting to database...');
	connectDB(envs.dbConnectionURL)
		.then(() => {
			console.log('Database connected to successfully');
			console.log('Server starting up.......');
			app.listen(port, () => {
				console.log('Server is listening at http://localhost:' + port);
			});
		})
		.catch((err: any) => {
			console.error('Error:: Could not connect to database...');
			console.error(err);
		});
};

startApp();

export default app;
