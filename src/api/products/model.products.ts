import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Product name is required'],
	},
	description: {
		type: String,
	},
	price: {
		type: Number,
		required: ['Product price is required'],
	},
	featured: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	createdBy: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	company: {
		type: String,
		enum: {
			values: ['SakaDevs', 'Google', 'Microsoft'],
			message: '{VALUE} is not currently supported',
		},
	},
});

export default mongoose.model('Product', productSchema);
