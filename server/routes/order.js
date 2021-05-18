const express = require('express');
const orderRouter = express.Router();
const passport = require('passport');
const pool = require('../db/index');

// middleware to check if there is a cookie
const checkCookie = (req, res, next) => {
	if (req.cookies['token']) {
		next();
	} else {
		res.send(false);
	}
};

//post order to orders table
orderRouter.post('/placeorder', checkCookie, passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
	const { id } = req.user;
	pool.query(`INSERT INTO orders (user_id) VALUES ($1)`, [id], (err, results) => {
		pool.query(`SELECT MAX(id) FROM orders WHERE user_id = $1`, [id], (err, resultMax) => {
			if (err) {
				throw err;
			} else {
				res.send(resultMax.rows[0]);
			}
		});
	});
});

//post order details to order_products table
orderRouter.post('/postorderdetail', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
	const { order_id, product_id, quantity, product_name, product_image } = req.body;
	pool.query(
		`INSERT INTO order_products(order_id, product_id, quantity, product_name, product_image)
									VALUES($1, $2, $3, $4, $5)`,
		[order_id, product_id, quantity, product_name, product_image],
		(err, result) => {
			if (err) {
				throw err;
			}
			res.redirect('/profile');
		}
	);
});

module.exports = orderRouter;
