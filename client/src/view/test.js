import { useEffect, useState } from 'react';
import React from 'react';

function Test() {
	const [state, setState] = useState('');
	useEffect(() => {
		const fetchUser = async () => {
			const response = await fetch('/test', { credentials: 'include' });
			const json = await response.json();
			setState(json);
		};
		fetchUser();
	}, []);

	return (
		<div>
			<p>{state}</p>
		</div>
	);
}

export default Test;
