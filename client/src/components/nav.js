import React from 'react';
import logo from '../icon/apple-grey.png';
import bag from '../icon/shopping-bag.png';
import profile from '../icon/profile.png';
import github from '../icon/github.png';
import { useSelector } from 'react-redux';
import { selectBag } from './bag/bagSlice';
import './styles/nav.css';

function Nav() {
	const productsInBag = useSelector(selectBag);
	const quantityArray = productsInBag.map((item) => item.quantity);
	const quantity = quantityArray.reduce((a, b) => a + b, 0);

	return (
		<div className='nav-container'>
			<div className='nav'>
				<a className='nav-home' href='/'>
					<img src={logo} alt='' />
				</a>

				<a className='nav-profile' href='/profile'>
					<img src={profile} alt='' />
				</a>
				<a className='nav-bag' href='/bag'>
					<img src={bag} alt='' />
					<div className={quantity === 0 ? 'bag-quantity-zero' : 'bag-quantity'}>{quantity}</div>
				</a>
				<a className='nav-bag' href='https://github.com/edphan'>
					<img src={github} alt='' />
				</a>
			</div>
		</div>
	);
}

export default Nav;
