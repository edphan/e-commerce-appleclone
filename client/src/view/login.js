import React from 'react';
import { Link } from 'react-router-dom';
import FormButton from '../components/formButton';

function Login() {
	return (
		<div className='page-container'>
			<h2>Please log in.</h2>
			<div className='form-container'>
				<form method='POST' action='/login'>
					<div>
						<label htmlFor='email'>
							<span className='visually-hidden'>Email</span>
						</label>
						<input type='email' id='email' name='email' placeholder='Email' required />
					</div>
					<div>
						<label htmlFor='password'>
							<span className='visually-hidden'>Password</span>
						</label>
						<input type='password' id='password' name='password' placeholder='Password' required />
					</div>
					<p>Don't have an account?</p>
					<Link to='/register'>
						<p>Register here</p>
					</Link>
					<FormButton text='Login' />
				</form>
				<p>for testing purposes, use:</p>
				<p>email: test@gmail.com</p>
				<p>password: password</p>
			</div>
		</div>
	);
}

export default Login;
