require('dotenv').config();
const { Pool } = require('pg');

// in Heroku, NODE_ENV will be set to 'production'
const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
	connectionString: isProduction ? process.env.DATABASE_URL : connectionString, //Heroku will provide with a string called DATABASE_URL
	ssl: isProduction,
});

// const pool = new Pool({
// 	user: 'edward',
// 	password: 'password',
// 	database: 'e_commerce_db',
// 	host: 'localhost',
// 	port: 5432,
// });

module.exports = {
	query: (text, params, callback) => {
		return pool.query(text, params, callback);
	},
};
