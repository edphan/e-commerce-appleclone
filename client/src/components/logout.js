import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router';

function Logout() {
	const [isLogout, setIsLogout] = useState();

	const handleClick = async () => {
		const response = await axios.get('/logout', { withCredentials: true });
		setIsLogout(response.data);
	};

	if (isLogout === true) {
		return <Redirect to='/' />;
	} else {
		return (
			<div>
				<button onClick={handleClick}>log out</button>
			</div>
		);
	}
}

export default Logout;
