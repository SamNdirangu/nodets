import moongose from 'mongoose';

const connectDB = async (connectionURL: string) => {
	return moongose.connect(connectionURL);
};

export default connectDB;
