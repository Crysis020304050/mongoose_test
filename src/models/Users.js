const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const yup = require('yup');
const db = require('../db');

const emailValidationSchema = yup.string().email().required();

const userSchema = new Schema({
	firstName: {
		type: Schema.Types.String,
		required: true,
	},
	lastName: {
		type: Schema.Types.String,
		required: true,

	},
	role: {
		type: Schema.Types.String,
		enum: ['ADMIN', 'USER', 'MODERATOR'],
		required: true,
	},
	email: {
		type: Schema.Types.String,
		validate: {
			validator: value => emailValidationSchema.validate(value),
			message: 'Email validation failed',
		},
		unique: true,
	},
	chats: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Chat',
		},
	],
});

const User = db.model('User', userSchema);

module.exports = User;
