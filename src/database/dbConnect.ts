import moongose from 'mongoose';

const connectDB = async (connectionURL: string) => {
	return moongose.connect(connectionURL,{dbName:'nodets'});
};

export default connectDB;
