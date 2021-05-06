const express = require('express');
const macRouter = express.Router();
const pool = require('../db/index');

//get all MacBook Pro products
macRouter.get('/macbookpro', (req, res) => {
	pool.query(`SELECT * FROM products WHERE subcategory = 'MacBook Pro' ORDER BY price ASC`, (err, results) => {
		if (err) {
			throw err;
		}

		res.send(results.rows);
	});
});

//get all MacBook Air products
macRouter.get('/macbookair', (req, res) => {
	pool.query(`SELECT * FROM products WHERE subcategory = 'MacBook Air' ORDER BY price ASC`, (err, results) => {
		if (err) {
			throw err;
		}

		res.send(results.rows);
	});
});

//get all iMac products
macRouter.get('/imac', (req, res) => {
	pool.query(`SELECT * FROM products WHERE subcategory = 'iMac' ORDER BY price ASC`, (err, results) => {
		if (err) {
			throw err;
		}

		res.send(results.rows);
	});
});

//get all Mac Pro products
macRouter.get('/macpro', (req, res) => {
	pool.query(`SELECT * FROM products WHERE subcategory = 'Mac Pro' ORDER BY price ASC`, (err, results) => {
		if (err) {
			throw err;
		}

		res.send(results.rows);
	});
});

//get all Mac Mini products
macRouter.get('/macmini', (req, res) => {
	pool.query(`SELECT * FROM products WHERE subcategory = 'Mac Mini' ORDER BY price ASC`, (err, results) => {
		if (err) {
			throw err;
		}

		res.send(results.rows);
	});
});

module.exports = macRouter;
