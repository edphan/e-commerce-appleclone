import React from 'react';
import FormButton from '../components/formButton';

function Register() {
	return (
		<div className='page-container'>
			<h2>Register your account.</h2>
			<div className='form-container'>
				<form method='POST' action='/register'>
					<div>
						<label for='name'>
							<span className='visually-hidden'>Name</span>
						</label>
						<input type='text' id='name' name='name' placeholder='Name' required />
					</div>

					<div>
						<label for='dob'>
							<span className='visually-hidden'>Date of birth</span>
						</label>
						<input type='date' id='dob' name='dob' placeholder='Date of birth' />
					</div>

					<div>
						<label for='email'>
							<span className='visually-hidden'>Email</span>
						</label>
						<input type='email' id='email' name='email' placeholder='Email' required />
					</div>

					<div>
						<label for='password'>
							<span className='visually-hidden'>Password</span>
						</label>
						<input type='password' id='password' name='password' placeholder='Password' required />
					</div>

					<div>
						<label for='password2'>
							<span className='visually-hidden'>Password</span>
						</label>
						<input type='password' id='password2' name='password2' placeholder='Confirm password' required />
					</div>

					<FormButton text='Register' />
				</form>
			</div>
		</div>
	);
}

export default Register;
