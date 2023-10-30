require('dotenv').config();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { envs } from '../../envVerify';
import validators from '../../functions/validators';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
		unique: true,
		required: true,
		validate: [validators.validateEmail, 'Please fill a valid email address'],
	},
	password: {
		type: String,
		required: true
	},
	isLoggedIn: {
		type: Boolean,
		default: true,
		required: true,
	},
});

//Hash Password - Always Hash password before saving
userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});
//Compare password
userSchema.methods.comparePassword = async function (candidatePassword: string) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};
//Sign and return our jwt token
userSchema.methods.createJWT = function () {
	return jwt.sign({ _id: this._id, email: this.email }, envs.JWTSecret, {
		expiresIn: envs.JWTLifetime,
	});
};
export interface user extends mongoose.Document {
	email: String,
	password: String,
	isLoggedIn: boolean,

	createJWT(): string;
	comparePassword(candidatePassword: string): Promise<boolean>;
}


export default mongoose.model<user>('User', userSchema);
