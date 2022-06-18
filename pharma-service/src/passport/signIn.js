const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');

const { User } = require('../models/User');

const isValidPassword = (user, password) => {
	return bCrypt.compareSync(password, user.password);
};

const signIn = (passport) => {
	passport.use(
		'signin',
		new LocalStrategy(
			{
				usernameField: 'username',
				passwordField: 'password',
			},
			(username, password, done) => {
				User.findOne({ username }, (err, user) => {
					if (err) return done(err);

					if (!user) {
						return done(null);
					}

					if (!isValidPassword(user, password)) {
						return done(null);
					}

					return done(null, user);
				});
			}
		)
	);
};

module.exports = { signIn };
