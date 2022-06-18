const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models/User');

const bCrypt = require('bcrypt-nodejs');

const createHash = (password) => {
	if (password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
};

const signUp = (passport) => {
	passport.use(
		'signup',
		new LocalStrategy(
			{
				usernameField: 'username',
				passwordField: 'password',
			},
			(username, password, done) => {
				User.findOne({ username }, async (err, user) => {
					if (err) return done(err);

					if (user) {
						return done(null);
					} else {
						const newUser = new User();

						newUser.username = username;
						newUser.password = createHash(password);

						newUser.save((err) => {
							if (err) {
								throw err;
							}

							return done(null, newUser);
						});
					}
				});
			}
		)
	);
};

module.exports = { signUp };
