const express = require('express');
const logoutRouter = express.Router();

// to logout, just get the cookie from the request and clear it
logoutRouter.get('/', (req, res) => {
	if (req.cookies['token']) {
		res.clearCookie('token').status(200).send(true);
	} else {
		res.send(false);
	}
});

module.exports = logoutRouter;
