const express = require('express');
const passport = require('passport');
const profileRouter = express.Router();
const pool = require('../db/index');

// middleware to check if there is a cookie
const checkCookie = (req, res, next) => {
	if (req.cookies['token']) {
		next();
	} else {
		res.send(false);
	}
};

// get user profile
profileRouter.get('/getuser', checkCookie, passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
	const { id, name, email } = req.user;
	res.send({ id: id, name: name, email: email });
});

//get address
profileRouter.get('/getaddress', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
	const { id } = req.user;
	pool.query(`SELECT * FROM addresses WHERE user_id = $1`, [id], (err, result) => {
		if (err) {
			res.json({ error: err });
		}
		const address = result.rows[0];
		res.send(address);
	});
});

//get orders
profileRouter.get('/getorders', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
	const { id } = req.user;
	pool.query(`SELECT * FROM orders JOIN order_products ON orders.id = order_products.order_id WHERE user_id = $1`, [id], (err, result) => {
		if (err) {
			res.json({ error: err });
		}
		const orders = result.rows;
		res.send(orders);
	});
});

module.exports = profileRouter;
