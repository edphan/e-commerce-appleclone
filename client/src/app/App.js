import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from '../view/home';
import Login from '../view/login';
import Register from '../view/register';
import Nav from '../components/nav';
import Test from '../view/test';

function App() {
	return (
		<Router>
			<div className='App'>
				<Nav />
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/login' exact component={Login} />
					<Route path='/register' exact component={Register} />
					<Route path='/test' exact component={Test} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
