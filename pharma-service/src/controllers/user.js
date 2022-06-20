const passport = require('passport');

const { HttpStatusCode } = require('../constants');
const { User, createUser, deleteUser, updateUser, getUser } = require('../models/User');

const handleAddUser = async (req, res) => {
	try {
		const result = await createUser(req.body);

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleGetCurrentUser = async (req, res) => {
	try {
		const result = await getUser(req.session.passport.user || '');

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleGetUser = async (req, res) => {
	try {
		const result = await getUser(req.params.id);
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleDeleteUser = async (req, res) => {
	try {
		const result = await deleteUser(req.body.id);

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleUpdateUser = async (req, res) => {
	try {
		const getCurrentUser = await getUser(req.body.userID);
		let newCart;
		if (getCurrentUser.userCart) {
			newCart = [...getCurrentUser.userCart, req.body.productID];
		} else {
			newCart = [req.body.productID];
		}
		const result = await updateUser(req.body.userID, { userCart: newCart });

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};


const handleDeleteOrderItem = async (req, res) => {
	try {
		console.log('req.body: ', req.body);
		const getCurrentUser = await getUser(req.body.userID);
		let newCart;
		if (getCurrentUser.userCart) {
			newCart = getCurrentUser.userCart.filter((item) => item !== req.body.deleteItemId)
		} 
		const result = await updateUser(req.body.userID, { userCart: newCart });

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};


const handleUploadPhoto = async (req, res) => {
	try {
		let filedata = req.file;

		const result = await updateUser(req.query.id, { avatar: filedata.filename });

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleSignIn = (req, res, next) => {
	passport.authenticate('signin', (err, user) => {
		if (err) return next(err);

		if (!user) {
			res.status(HttpStatusCode.UNAUTHORIZED).send({ error: 'Невернй логин или пароль' });
		}

		req.logIn(user, (err) => {
			if (err) return next(err);

			res.send(user);
		});
	})(req, res, next);
};

const handleSignUp = (req, res, next) => {
	passport.authenticate('signup', (err, user) => {
		if (err) return next(err);

		if (!user) {
			res.status(HttpStatusCode.UNAUTHORIZED).send({ error: 'Пользователь с таким login уже существует' });
		}

		req.logIn(user, (err) => {
			if (err) return next(err);

			res.send(user);
		});
	})(req, res, next);
};

const handleLogOut = (req, res) => {
	req.logOut();
	res.status(HttpStatusCode.OK).send({ message: 'Вы вышли' });
};

module.exports = {
	handleAddUser,
	handleDeleteUser,
	handleUpdateUser,
	handleUploadPhoto,
	handleGetCurrentUser,
	handleGetUser,
	handleSignIn,
	handleSignUp,
	handleLogOut,
	handleDeleteOrderItem
};
