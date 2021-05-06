const express = require('express');
const loginRouter = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
//const pool = require('../db/index');
require('dotenv').config();

//helper function to create a signed token using token_secret stored in .env
const generateAccessToken = (email) => {
	return jwt.sign(email, process.env.TOKEN_SECRET);
};

//login using passport local strategy WITHOUT session
loginRouter.post('/', passport.authenticate('local', { session: false, failureRedirect: '/login' }), (req, res) => {
	//create a signed token
	const signedToken = generateAccessToken(req.body.email);

	//send token in a httpOnly cookie
	res.cookie('token', signedToken, {
		maxAge: 3600000,
		httpOnly: true,
	});
	res.status(200).redirect('/');
});

loginRouter.get('/', (req, res) => {
	res.json({ message: 'get login' });
});

// //login using passport local strategy WITH session
// loginRouter.post('/', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }), (req, res) => {
// 	// const token = generateAccessToken(req.body.email);
// 	res.redirect('/');
// });

module.exports = loginRouter;
