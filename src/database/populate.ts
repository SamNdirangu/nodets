require('dotenv').config();

const connectDB = require('./dbConnect');
const Product = require('../api/products/model.products');
const jsonProducts = require('./data/products.json');

const start = async () => {
	try {
		console.log('Connecting to database...');
		await connectDB(process.env.dbConnectionURL);
		console.log('Database connected to successfuly');
		await Product.deleteMany();
		console.log('Products collection cleansed... ');
		await Product.create(jsonProducts);
		console.log('Products updated successfully');
	} catch (error) {
		console.error(error);
	}
};

start();
