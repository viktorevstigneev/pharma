const { Schema, model } = require('mongoose');

const MusicSchema = new Schema({
	name: {
		type: String,
	},
	stringPath: {
		type: String,
		default: "default.png"
	}
});

const Music = model('Music', MusicSchema);

const createMusic = (data) => {
	return Music.create(data);
};

const getMusicData = () => {
	return Music.find();
};

const getPersonData = (id) => {
	return Music.findOne({ _id: id });
};

const deleteMusic = (id) => {
	return Music.deleteOne({ _id: id });
};

const updateMusic = (id, data) => {
	return Music.updateOne({ _id: id }, { ...data });
};

module.exports = {
	createMusic,
	getMusicData,
	deleteMusic,
	updateMusic,
	getPersonData,
	Music,
};
