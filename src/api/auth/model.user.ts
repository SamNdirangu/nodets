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
	password: String,
	isLoggedIn: {
		type: Boolean,
		default: true,
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
export default mongoose.model('User', userSchema);
