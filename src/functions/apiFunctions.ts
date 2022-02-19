// Specialized Fucntions ================================================================
const numericalFilterBuilder = (
	query: any, //the mongoose query
	numericFilters: string, //within request param
	options: string[], //Filterable numerical fields within the model
) => {
	//Mongoose doesnt understand logic char, we replace this characters to mongoose key words
	const operatorMap: any = {
		'>': 'gt',
		'>=': 'gte',
		'=': 'eq',
		'<': 'lt',
		'<=': 'lte',
	};
	const regEx: RegExp = /\b(<|>|>=|=|<|<=)\b/g; //Set up our regex
	//Perform the replace.
	let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
	let tempQuery = query; //store our query after new operationss
	//set up our options to ensure only allowed numerical filters are passed on to our query
	// This prevents errors and allows our program to ignore fields that arent allowed
	filters.split(',').forEach((item) => {
		//loop through each option
		const [field, operator, value] = item.split('-');
		//if a field  in our filter query matches our options proceed
		if (options.includes(field)) tempQuery = query.where(field)[operator](value);
	});
	return tempQuery; //return the updated product query
};

export default {
	numericalFilterBuilder,
};
