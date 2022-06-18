const { HttpStatusCode } = require('../constants');
const { People, createMusic, getMusicData, deleteMusic, updateMusic } = require('../models/Music');

const nodemailer = require('nodemailer');

const handleAddMusic = async (req, res) => {
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

		const textMsg = `
			${req.body.name} хочет связаться с вами \n
			email: ${req.body.email}
			сообщение: ${req.body.message}
		`;

		let result = await transporter.sendMail({
			from: 'afanasiy1950@mail.ru',
			to: 'afanasiy1950@mail.ru',
			subject: req.body.subject,
			text: textMsg,
		});
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleGetMusic = async (req, res) => {
	try {
		let result;
		result = await getMusicData();
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleDeleteMusic = async (req, res) => {
	try {
		const result = await deleteMusic(req.params.id);

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleUpdateMusic = async (req, res) => {
	try {
		const result = await updateMusic(req.params.id, {
			name: req.body.name,
			description: req.body.description,
			createdDate: req.body.createdDate,
			logo: req.file.filename,
		});

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

module.exports = {
	handleAddMusic,
	handleGetMusic,
	handleDeleteMusic,
	handleUpdateMusic,
};
