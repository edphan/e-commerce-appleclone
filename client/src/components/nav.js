import React from 'react';
//import LogoutButton from '../components/logoutButton';
import logo from '../icon/apple-grey.png';
import bag from '../icon/shopping-bag.png';
import profile from '../icon/profile.png';
import search from '../icon/search.png';

function Nav() {
	return (
		<div className='nav-container'>
			<div className='nav'>
				<a className='nav-home' href='/'>
					<img src={logo} alt='' />
				</a>
				{/* <a className='nav-mac' href='/mac'>
					Mac
				</a>
				<a className='nav-iphone' href='/iphone'>
					iPhone
				</a>
				<a className='nav-ipad' href='/ipad'>
					iPad
				</a>
				<a className='nav-others' href='/others'>
					Others
				</a> */}
				<a className='nav-search' href='/'>
					<img src={search} alt='' />
				</a>
				<a className='nav-profile' href='/profile'>
					<img src={profile} alt='' />
				</a>
				<a className='nav-search' href='/login'>
					Login
				</a>
				<a className='nav-bag' href='/bag'>
					<img src={bag} alt='' />
				</a>
				{/* <LogoutButton /> */}
			</div>
		</div>
	);
}

export default Nav;
