import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import Logout from '../components/logout';
const axios = require('axios');

function Profile() {
	const [isLoggedIn, setIsLoggedIn] = useState('');
	const [profile, setProfile] = useState('');
	const { id, name, email } = profile;

	// function to check login status and to get profile
	const checkLoginAndGetProfile = async () => {
		try {
			const response = await axios.get('/profile', { withCredentials: true });
			if (response.data === false) {
				setIsLoggedIn(response.data);
			} else {
				setProfile(response.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		checkLoginAndGetProfile();
	}, []);

	if (isLoggedIn === false) {
		return (
			<div>
				<Redirect to='/login' />
			</div>
		);
	} else {
		return (
			<div className='dashboard-container'>
				<div className='dashboard-user-info'>
					<h3>User Info</h3>
					<p>Name: {name}</p>
					<p>Email: {email}</p>
					<button>change password</button>
				</div>
				<Logout />
			</div>
		);
	}
}

export default Profile;
