const express = require('express');
const passport = require('passport');
const profileRouter = express.Router();

// middleware to check if there is a cookie
const checkCookie = (req, res, next) => {
	if (req.cookies['token']) {
		next();
	} else {
		res.send(false);
	}
};

// get user profile
profileRouter.get('/', checkCookie, passport.authenticate('jwt', { session: false }), (req, res) => {
	const { id, name, email } = req.user;
	res.send({ id: id, name: name, email: email });
});

module.exports = profileRouter;
