require('dotenv').config();

//This will trigger an error incase the app doesnt have the required env variables to functions
//Please review the .env.example for more guidance
//required variables in string format
const requiredVariables = ['JWTSecret', 'JWTLifetime','dbConnectionURL'];
const optionalVariables = ['PORT',];

const errMessage =
	'ENV Verification Error:: Cannot find certain required environmental variables. Please review the env requirements file in .env.example for more info';
const warnMessage =
	'ENV Warning: Cannot find Certain optional environmental variables :: Please review the env requirements file in .env.example for more info';

const verifyEnvVariables = () => {
	//Required ========================= any of this will throw an error if missing
	requiredVariables.forEach((value) => {
		if (!process.env[value]) {
			console.error(errMessage);
			throw new Error(errMessage);
		}
	});
	optionalVariables.forEach((value) => {
		if (!process.env[value]) {
			console.warn(warnMessage);
		}
	});
};

const envs = {
	PORT: process.env.PORT || 80,
	JWTSecret: process.env.JWTSecret || '233j90jf34pn2f2p4n3ng3nnp',
	JWTLifetime: process.env.JWTLifetime || '30d',
	dbConnectionURL: process.env.dbConnectionURL || 'mongodb://root:example@mongo:27017'
}
export { verifyEnvVariables, envs };
