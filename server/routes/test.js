const express = require('express');
const pool = require('../db/index');
const testRouter = express.Router();
const passport = require('passport');

testRouter.get('/getuser', async (req, res, next) => {
	pool.query(`SELECT * FROM users`, (err, result) => {
		if (err) {
			throw err;
		}
		// res.send(result.rows);
		res.send(result.rows);
	});
});

testRouter.get('/', passport.authenticate('jwt', { session: false, failureRedirect: '/login', successRedirect: '/bag' }), (req, res) => {
	res.send('YAY');
});

testRouter.post('/', (req, res) => {
	res.redirect('/login');
});

module.exports = testRouter;
