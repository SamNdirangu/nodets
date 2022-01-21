import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
	position: {
		type: String,
		minlength: 5,
		maxlength: 30,
		required: [true, 'Job position is required'],
	},
	description: {
		type: String,
		minlength: 5,
		maxlength: 500,
	},
	company: {
		type: String,
		minlength: 5,
		maxlength: 30,
		required: [true, 'Company is required'],
	},
	status: {
		type: String,
		minlength: 5,
		maxlength: 30,
		default: 'pending',
		enum: ['pending', 'approved', 'rejected'],
	},
	createdBy: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: [true, 'A User is required'],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

export default mongoose.model('Job', jobSchema);
