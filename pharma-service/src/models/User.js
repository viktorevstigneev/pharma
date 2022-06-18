const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	name: {
		type: String,
	},
	surname: {
		type: String,
	},
	username: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	test_one: {
		type: String,
		default: '0',
	},
	test_two: {
		type: String,
		default: '0',
	},
	test_three: {
		type: String,
		default: '0',
	},
	userCart: [],
});

const User = model('User', UserSchema);

const createUser = (data) => {
	return User.create(data);
};

const getUser = (id) => {
	return User.findOne({ _id: id }).populate('skills');
};

const deleteUser = (id) => {
	return User.deleteOne({ _id: id });
};

const updateUser = (id, data) => {
	console.log('id: ', id);
	console.log('data: ', data);
	return User.updateOne({ _id: id }, data);
};

module.exports = {
	createUser,
	getUser,
	deleteUser,
	updateUser,
	User,
};
