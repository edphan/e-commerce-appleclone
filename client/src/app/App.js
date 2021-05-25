import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from '../view/home';
import Login from '../view/login';
import Register from '../view/register';
import Nav from '../components/nav';
import Subcategory from '../components/subcategory/subcategory';
import Profile from '../view/profile';
import Logout from '../components/logout';
import Bag from '../view/bag';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe('pk_test_51ItQyDLKmuKf5Y8N7SmOVrfyk6RUm4le1LYeh2ZK3RmqXNiUIvBy7pR8KiCSN0vttzVMR2e70M109Lq5SwSJUoab00hn4CFmNY');

function App() {
	return (
		<Elements stripe={promise}>
			<Router>
				<div className='App'>
					<Nav />
					<Switch>
						<Route path='/' exact component={Home} />
						<Route path='/login' exact component={Login} />
						<Route path='/register' exact component={Register} />
						<Route path='/logout' exact component={Logout} />
						<Route path='/profile' exact component={Profile} />
						<Route path='/bag' exact component={Bag} />
						<Route path='/:category/:subcategory' component={Subcategory} />
					</Switch>
				</div>
			</Router>
		</Elements>
	);
}

export default App;
