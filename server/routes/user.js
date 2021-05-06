const express = require('express');
const userRouter = express.Router();
const passport = require('passport');

// middleware to check if there is a cookie
const checkCookie = (req, res, next) => {
	if (req.cookies['token']) {
		next();
	} else {
		res.send(false);
	}
};

// check to see if user is authenticated
userRouter.get('/checklogin', checkCookie, passport.authenticate('jwt', { session: false }), (req, res) => {
	const { id, name, email } = req.body;
	res.send({ id: id, name: name, email: email });
});

module.exports = userRouter;
