//In this example we will not use an async wrapper to avoid using tedious try catch statements
//We have a package called express-async-errors that does this for us.
// Express
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductModel from './model.products';
import apiFunctions from '../../functions/apiFunctions';

const getAllProductsStatic = async (req: Request, res: Response) => {
	const products = await ProductModel.where('price').gt(300);
	res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req: Request, res: Response) => {
	//Get all our passed params
	const { name, featured, company, createdBy, numericFilters } = req.query; //Within model schema
	const { fields, sort } = req.query; //not within model schema
	const numericalParams = ['price', 'rating'];
	//Initialize our productsQuery
	let productQuery = ProductModel.find();

	//Filters passed via query========================================
	//Schema based filters -------------------------------------------
	//Creator filter
	if (createdBy) productQuery = productQuery.where('createdBy').equals(createdBy);
	//Name filter
	if (name) productQuery = productQuery.where('name').regex(String(name));
	//Featured filter
	if (featured) productQuery = productQuery.where('featured').equals(featured);
	//Company Filter
	if (company) productQuery = productQuery.where('company').equals(company);
	//Numerical Filter
	if (numericFilters)
		productQuery = apiFunctions.numericalFilterBuilder(
			productQuery,
			String(numericFilters),
			numericalParams,
		);
	//Only display the provided fields filter
	if (fields) productQuery = productQuery.select(String(fields).split(',').join(' ')); //cant use comma replace with space

	//Non Schema based ================================================
	//Sort
	if (sort) {
		productQuery = productQuery.sort(String(sort).split(',').join(' ')); //cant use comma replace with space
	} else productQuery = productQuery.sort('createdAt');

	//paging
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;
	productQuery = productQuery.skip(skip).limit(limit);
	//-------------------------------------------------------------------

	//Now we wait for our products
	const products = await productQuery;
	res.status(200).json({ page, nbHits: products.length, products });
};
const createProduct = async (req: Request, res: Response) => {
	req.body.createdBy = req.body.clientData.id;
	const product = await ProductModel.create({ ...req.body });
	res.status(StatusCodes.CREATED).json(product);
};

export default { getAllProductsStatic, getAllProducts, createProduct };
