const { HttpStatusCode } = require('../constants');

const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}

	res.status(HttpStatusCode.UNAUTHORIZED).send({ error: 'Вы не вошли в аккаунт.' });
};

module.exports = isAuthenticated;
