const express = require('express');
const iphoneRouter = express.Router();
const pool = require('../db/index');

// get all iPhone 12 products
iphoneRouter.get('/iphone12', (req, res) => {
	pool.query(`SELECT * FROM products WHERE subcategory = 'iPhone 12' ORDER BY price ASC`, (err, results) => {
		if (err) {
			throw err;
		}

		res.send(results.rows);
	});
});

// get all iPhone 11 products
iphoneRouter.get('/iphone11', (req, res) => {
	pool.query(`SELECT * FROM products WHERE subcategory = 'iPhone 11' ORDER BY price ASC`, (err, results) => {
		if (err) {
			throw err;
		}

		res.send(results.rows);
	});
});

// get all iPhone SE products
iphoneRouter.get('/iphonese', (req, res) => {
	pool.query(`SELECT * FROM products WHERE subcategory = 'iPhone SE' ORDER BY price ASC`, (err, results) => {
		if (err) {
			throw err;
		}

		res.send(results.rows);
	});
});

// get all iPhone XR products
iphoneRouter.get('/iphonexr', (req, res) => {
	pool.query(`SELECT * FROM products WHERE subcategory = 'iPhone XR' ORDER BY price ASC`, (err, results) => {
		if (err) {
			throw err;
		}

		res.send(results.rows);
	});
});

module.exports = iphoneRouter;
