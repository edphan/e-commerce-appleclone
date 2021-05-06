import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
const axios = require('axios');

function Profile() {
	const [isLoggedIn, setIsLoggedIn] = useState('');

	// function to check login status
	const checkLoginStatus = async () => {
		try {
			const response = await axios.get('/user/checklogin', { withCredentials: true });
			setIsLoggedIn(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		checkLoginStatus();
	}, []);

	if (isLoggedIn === false) {
		return (
			<div>
				<Redirect to='/login' />
			</div>
		);
	} else {
		return (
			<div>
				<p>user's profile stuffs go here</p>
			</div>
		);
	}
}

export default Profile;
