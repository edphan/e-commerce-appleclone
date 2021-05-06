const express = require('express');
const othersRouter = express.Router();
const pool = require('../db/index');

// get all accessories products
othersRouter.get('/accessories', (req, res) => {
	pool.query(`SELECT * FROM products WHERE subcategory = 'Accessories' ORDER BY price ASC`, (err, results) => {
		if (err) {
			throw err;
		}

		res.send(results.rows);
	});
});

// get all Apple TV products
othersRouter.get('/appletv', (req, res) => {
	pool.query(`SELECT * FROM products WHERE subcategory = 'Apple TV' ORDER BY price ASC`, (err, results) => {
		if (err) {
			throw err;
		}

		res.send(results.rows);
	});
});

// get all Apple Watch products
othersRouter.get('/applewatch', (req, res) => {
	pool.query(`SELECT * FROM products WHERE subcategory = 'Apple Watch' ORDER BY price ASC`, (err, results) => {
		if (err) {
			throw err;
		}

		res.send(results.rows);
	});
});

module.exports = othersRouter;
