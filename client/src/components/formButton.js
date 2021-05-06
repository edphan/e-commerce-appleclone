import React from 'react';

function FormButton({ text }) {
	return (
		<div>
			<button className='form-button' type='submit'>
				{text}
			</button>
		</div>
	);
}

export default FormButton;
