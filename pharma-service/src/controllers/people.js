const { HttpStatusCode } = require('../constants');
const { People, createTeam, getTeamData, deleteTeam, updateTeam, getPersonData } = require('../models/People');
const {User} = require("../models/User");
const nodemailer = require('nodemailer');

const handleOrderTeam = async (req, res) => {
	try {
		let transporter = nodemailer.createTransport({
			host: 'smtp.mail.ru',
			port: 587,
			secure: false,
			auth: {
				user: 'afanasiy1950@mail.ru',
				pass: 'rX8Q2LzNKP2LjE1eiepX',
			},
		});
	

		const tttt = req.body.gotedData.map((item) => {
			return `${item.name}  ${item.price} BYN`;
		});


		const textMsg = `
			${req.body.user} хочет сделать заказ \n
			${tttt} 
		`;

		let result = await transporter.sendMail({
			from: 'afanasiy1950@mail.ru',
			to: 'afanasiy1950@mail.ru',
			subject: 'Новый заказ',
			text: textMsg,
		});

		await User.updateOne({ _id: req.body.userID }, {userCart: null});
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleAddTeam = async (req, res) => {
	try {
		console.log('req: ', req.body);
		const result = await createTeam({ ...req.body, avatar: req.file.filename });

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleGetTeam = async (req, res) => {
	try {
		let result;
		result = await getTeamData();
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleGetPerson = async (req, res) => {
	try {
		let result;
		result = await getPersonData(req.params.id);
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleDeleteTeam = async (req, res) => {
	try {
		const result = await deleteTeam(req.params.id);

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleUpdateTeam = async (req, res) => {
	try {
		const result = await updateTeam(req.params.id, {
			name: req.body.name,
			description: req.body.description,
			avatar: req.body.avatar,
		});

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
	}
};

const handleUploadPhoto = async (req, res) => {
	try {
		let filedata = req.file;
		const result = await updateTeam(req.query.id, { avatar: filedata.filename });

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};


module.exports = {
	handleAddTeam,
	handleGetTeam,
	handleDeleteTeam,
	handleUploadPhoto,
	handleUpdateTeam,
	handleGetPerson,
	handleOrderTeam,
};
