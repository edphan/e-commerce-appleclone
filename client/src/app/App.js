import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from '../view/home';
import Login from '../view/login';
import Register from '../view/register';
import Nav from '../components/nav';
import Test from '../view/test';
import Subcategory from '../components/subcategory/subcategory';
import Profile from '../view/profile';
import Logout from '../components/logout';
import Bag from '../view/bag';

function App() {
	return (
		<Router>
			<div className='App'>
				<Nav />
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/login' exact component={Login} />
					<Route path='/register' exact component={Register} />
					<Route path='/logout' exact component={Logout} />
					<Route path='/profile' exact component={Profile} />
					<Route path='/test' exact component={Test} />
					<Route path='/bag' exact component={Bag} />
					<Route path='/:category/:subcategory' component={Subcategory} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
