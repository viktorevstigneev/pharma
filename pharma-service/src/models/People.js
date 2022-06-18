const { Schema, model } = require('mongoose');

const PeopleSchema = new Schema({
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	avatar: {
		type: String,
		default: 'default.png',
	},
	typeThing: {
		type: String,
	},
	price: {
		type: String,
	},
});

const People = model('People', PeopleSchema);

const createTeam = (data) => {
	return People.create(data);
};

const getTeamData = () => {
	return People.find();
};

const getPersonData = (id) => {
	return People.findOne({ _id: id });
};

const deleteTeam = (id) => {
	return People.deleteOne({ _id: id });
};

const updateTeam = (id, data) => {
	return People.updateOne({ _id: id }, { ...data });
};

module.exports = {
	createTeam,
	getTeamData,
	deleteTeam,
	updateTeam,
	getPersonData,
	People,
};
