const express = require('express');
const ipadRouter = express.Router();
const pool = require('../db/index');

// get all iPad Pro products
ipadRouter.get('/ipadpro', (req, res) => {
	pool.query(`SELECT * FROM products WHERE subcategory = 'iPad Pro' ORDER BY price ASC`, (err, results) => {
		if (err) {
			throw err;
		}

		res.send(results.rows);
	});
});

// get all iPad Air products
ipadRouter.get('/ipadair', (req, res) => {
	pool.query(`SELECT * FROM products WHERE subcategory = 'iPad Air' ORDER BY price ASC`, (err, results) => {
		if (err) {
			throw err;
		}

		res.send(results.rows);
	});
});

// get all iPad Mini products
ipadRouter.get('/ipadmini', (req, res) => {
	pool.query(`SELECT * FROM products WHERE subcategory = 'iPad Mini' ORDER BY price ASC`, (err, results) => {
		if (err) {
			throw err;
		}

		res.send(results.rows);
	});
});

module.exports = ipadRouter;
