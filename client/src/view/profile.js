import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import Logout from '../components/logout';
import Order from '../components/order';
const axios = require('axios');

function Profile() {
	const [isLoggedIn, setIsLoggedIn] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);
	const [profile, setProfile] = useState('');
	const { name, email } = profile;
	const [address, setAddress] = useState('');
	const { number, street_name, apt_unit, city, state, country } = address;
	const [orders, setOrders] = useState('');
	const [orderRemoved, setRemovedOrder] = useState('');

	// function to check login status and to get profile
	const checkLoginAndGetProfile = async () => {
		try {
			const response = await axios.get('/profile/getuser', { withCredentials: true });
			if (response.data === false) {
				setIsLoggedIn(response.data);
			} else {
				setProfile(response.data);
				const responseAddress = await axios.get('/profile/getaddress', { withCredentials: true });
				const responseOrders = await axios.get('/profile/getorders', { withCredentials: true });
				setAddress(responseAddress.data);
				setOrders(responseOrders.data);
				setIsLoaded(true);
			}
		} catch (err) {
			console.log(err);
		}
	};

	//function to remove a particular order
	const removeOrder = async (orderId) => {
		try {
			const response = await fetch('/order/removeOrder', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					order_id: orderId,
				}),
				credentials: 'include',
			});
			const json = await response.json();
			// if the order was successfully removed, json will be equal to true
			// then use a random number in setRemovedOrder to set orderRemoved to that random number
			// this is to re-render the page whenever orderRemoved changes value, to make the removed order disappear from the page
			if (json) {
				setRemovedOrder(Math.random() * 9999);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		checkLoginAndGetProfile();
	}, [orderRemoved]);

	// if not logged in, redirect to /login
	if (isLoggedIn === false) {
		return (
			<div>
				<Redirect to='/login' />
			</div>
		);
	} else if (isLoaded === true) {
		// render this when isLoaded === true
		// get unique order_id
		let arrayOfOrderId = [];
		orders.forEach((order) => arrayOfOrderId.push(order.order_id));
		let uniqueOrderId = [...new Set(arrayOfOrderId)]; //an array that holds the unique order IDs
		uniqueOrderId.sort((a, b) => b - a);

		// sorted orders: order details are grouped by their order_id
		let sortedOrders = [];
		for (let i = 0; i < uniqueOrderId.length; i++) {
			sortedOrders.push(orders.filter((order) => order.order_id === uniqueOrderId[i]));
		}

		return (
			<div className='dashboard-container'>
				<div className='dashboard-user-info'>
					<h3>User Info</h3>
					<p>Name: {name}</p>
					<p>Email: {email}</p>
					<div>
						<Logout />
					</div>
				</div>
				<div className='dashboard-address'>
					<h3>Address</h3>
					<p>
						{number} {street_name} {apt_unit} {city}, {state}, {country}
					</p>
				</div>
				<div className='dashboard-orders'>
					<h3>Orders</h3>
					{sortedOrders.map((order) => (
						<div>
							<Order order={order} />
							<button onClick={async () => removeOrder(order[0].order_id)}>remove order</button>
						</div>
					))}
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<p>...loading</p>
			</div>
		);
	}
}

export default Profile;
