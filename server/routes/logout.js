const express = require('express');
const logoutRouter = express.Router();

// to logout, just get the cookie from the request and clear it
logoutRouter.get('/', (req, res) => {
	if (req.cookies['token']) {
		res.clearCookie('token').status(200).json({ message: 'you have logged out' });
	} else {
		res.json({ message: 'cannot logout' });
	}
});

module.exports = logoutRouter;
