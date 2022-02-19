//Before starting our server ensure that the required environmental variables are present;
require('./functions/envVerify').verifyEnvVariables();
require('dotenv').config();
import express from 'express';
import 'express-async-errors';
//Security packages
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import apiV1Router from './api';
import connectDB from './database/dbConnect';
import heartBeat from './functions/heartBeat';
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
app.use(express.urlencoded({ extended: false }));

//Heart beat / server testing route
app.get('/isAlive', heartBeat);

app.use('/api/v1', apiV1Router); //Version 1 App APIs
//Error handlers
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 80;
const startApp = () => {
	console.log('Connecting to database...');
	connectDB(String(process.env.dbConnectionURL))
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
