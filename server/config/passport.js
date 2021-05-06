const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const pool = require('../db/index');
require('dotenv').config();

//JWT STRATEGY, to use to retrieve and verify token, use to verify user AFTER they have logged in
//user only has cookie with JWT in it AFTER they have logged in
//use passport.authenticate('jwt') strategy for protected routes
const cookieExtractor = (req) => {
	let jwt = null;

	if (req && req.cookies) {
		jwt = req.cookies['token'];
	}

	return jwt;
};

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: cookieExtractor,
			secretOrKey: process.env.TOKEN_SECRET,
		},
		function (jwt_payload, done) {
			pool.query(`SELECT * FROM USERS where email = $1`, [jwt_payload], (err, result) => {
				if (err) {
					throw err;
				}
				if (result.rows.length > 0) {
					const user = result.rows[0];
					return done(null, user);
				} else {
					return done(null, false, { message: 'Not logged in' });
				}
			});
		}
	)
);

//LOCAL STRATEGY, if you're not using Local Strategy to authenticate user,
//to serialize user to add to req.session.passport.userId,
//to deserialize user when they come back after while to add user to req.user
//comment out all the codes below

const authenticate = (email, password, done) => {
	pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
		if (err) {
			throw err;
		}

		if (result.rows.length > 0) {
			//if there is a user with the same email in the database
			const user = result.rows[0];

			//compare the password with the stored hashed password to see if they matched
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if (err) {
					throw err;
				}
				//if the passwords match
				if (isMatch) {
					return done(null, user); //the verify callback invokes done to supply Passport with the user that authenticated
				} else {
					console.log('wrong password');
					return done(null, false, { message: 'Incorrect password' }); //if passwords do not match
				}
			});
		} else {
			//else no user is found in database
			return done(null, false, { message: 'Email is not registered' });
		}
	});
};

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email', //field definition, so Passport knows what variable belongs to usernameField
			passwordField: 'password', //field definition, so Passport knows what variable belongs to passwordField
		},
		authenticate
	)
);

//if you're using session, uncomment these
//you need passport.serializeUser and passport.deserializeUser
// passport.serializeUser((user, done) => done(null, user.id)); //store user.id in session cookie

// passport.deserializeUser((id, done) => {
// 	pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
// 		if (err) {
// 			throw err;
// 		}
// 		return done(null, result.rows[0]);
// 	});
// });
