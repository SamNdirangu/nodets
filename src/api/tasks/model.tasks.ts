import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			maxlength: [20, 'Name can not be more than 20 characters'],
			required: [true, 'Must provide a task name'],
		},
		completed: {
			type: Boolean,
			default: false,
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'An owner ID is required'],
		},
	},
	{ timestamps: true },
);

export default mongoose.model('Task', TaskSchema);
