import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { selectBag } from '../components/bag/bagSlice';
import ProductsInBag from '../components/bag/productsInBag';
import { clearBag } from '../components/bag/bagSlice';
const axios = require('axios');

function Bag() {
	const dispatch = useDispatch();
	const [isLoggedIn, setIsLoggedIn] = useState('');
	const [isOrderPosted, setIsOrderPosted] = useState('');
	const bag = useSelector(selectBag);

	let sumOfBag = 0;
	bag.forEach((product) => {
		let price = Number(product.productInfo.price.replace(/[^0-9.-]+/g, ''));
		sumOfBag += price * product.quantity;
	});

	const postOrderGetOrderId = async () => {
		try {
			const getOrderId = await axios.post('/order/placeorder', { withCredentials: true });
			if (getOrderId.data === false) {
				setIsLoggedIn(getOrderId.data);
			} else {
				const jsonOrderId = getOrderId.data;
				const orderId = jsonOrderId.max;
				for (let i = 0; i < bag.length; i++) {
					const postToOrderProducts = await fetch('/order/postorderdetail', {
						method: 'post',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							order_id: parseInt(orderId, 10),
							product_id: bag[i].productInfo.id,
							quantity: bag[i].quantity,
							product_name: bag[i].productInfo.name,
							product_image: bag[i].productInfo.image,
						}),
						credentials: 'include',
					});
					const response = await postToOrderProducts.json();
					setIsOrderPosted(response);
				}
				dispatch(clearBag());
			}
		} catch (err) {
			console.log(err);
		}
	};

	if (isLoggedIn === false) {
		return (
			<div>
				<Redirect to='/login' />
			</div>
		);
	} else if (isOrderPosted) {
		return (
			<div>
				<Redirect to='/profile' />
			</div>
		);
	} else {
		return (
			<div className='bag-summary-container'>
				<div className='bag-amount-checkout-button'>
					<h3>Your bag total is ${sumOfBag}</h3>
					<button
						type='submit'
						onClick={async () => {
							postOrderGetOrderId();
						}}>
						Check out
					</button>
				</div>
				<div className='bag-summary'>
					<div className='bag-products'>
						{bag.map((product) => (
							<div key={product.productInfo.id}>
								<ProductsInBag product={product} />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default Bag;
