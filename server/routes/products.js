const express = require('express');
const pool = require('../db');
const productsRouter = express.Router();

// get all products
productsRouter.get('/', (req, res, next) => {
	pool.query(`SELECT * FROM products ORDER BY id ASC`, (err, results) => {
		if (err) {
			throw err;
		}
		res.status(200).send(results.rows);
	});
});

// get products by subcategory
productsRouter.get('/subcategory', (req, res) => {
	pool.query(`SELECT DISTINCT ON (subcategory) subcategory, id, category, name, price, image FROM products`, (err, results) => {
		if (err) {
			throw err;
		}
		res.status(200).send(results.rows);
	});
});

module.exports = productsRouter;
