const express = require('express');
const pool = require('../db/index');
const bcrypt = require('bcryptjs');
const registerRouter = express.Router();

registerRouter.post('/', async (req, res) => {
	const { name, dob, email, password, password2 } = req.body;

	// check if any field is missing
	if (!name || !dob || !email || !password || !password2) {
		console.log('Please enter all fields');
		console.log(dob);
	}
	// check if password and password2 are identical
	if (password !== password2) {
		console.log('Passwords do not match');
	}
	// check password length
	if (password.length <= 6) {
		console.log('Password should be more than 6 characters');
	}

	const hashedPassword = await bcrypt.hash(password, 10); //hash password to store in database
	// check to see if the email is registered in the database
	pool.query(`SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
		if (err) {
			throw err;
		}
		if (results.rows.length > 0) {
			console.log(`Email already registered`);
		} else {
			pool.query(`INSERT INTO users (name, dob, email, password) VALUES ($1, $2, $3, $4)`, [name, dob, email, hashedPassword], (err, results) => {
				if (err) {
					throw err;
				}
				console.log(dob);
				console.log(`users has successfully registered`);
				res.status(201).redirect('/');
			});
		}
	});
});

module.exports = registerRouter;
