import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { selectBag } from '../components/bag/bagSlice';
import ProductsInBag from '../components/bag/productsInBag';
import { clearBag } from '../components/bag/bagSlice';
import '../components/styles/bag.css';
const axios = require('axios');

function Bag() {
	const dispatch = useDispatch();
	const [isLoggedIn, setIsLoggedIn] = useState('');
	const [isOrderPosted, setIsOrderPosted] = useState('');
	const bag = useSelector(selectBag);

	// Stripe stuffs
	const [succeeded, setSucceeded] = useState(false);
	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState('');
	const stripe = useStripe();
	const elements = useElements();

	// Styling stripe card
	const cardStyle = {
		style: {
			base: {
				color: '#32325d',
				fontFamily: 'Arial, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '16px',
				'::placeholder': {
					color: '#32325d',
				},
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a',
			},
		},
	};

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		const fetchData = async () => {
			try {
				const response = await fetch('/create-payment-intent', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ items: [{ id: 'orders' }] }),
				});
				const json = await response.json();
				setClientSecret(json.clientSecret);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, []);

	// Listen for changes in the CardElement
	// and display any errors as the customer types their card details
	const handleChange = async (event) => {
		setDisabled(event.empty);
		setError(event.error ? event.error.message : '');
	};

	const handleSubmit = async (ev) => {
		console.log(`before the try block`);
		// try {
		// 	console.log(`goes here NOT logged in`);
		// 	const getOrderId = await axios.post('/order/placeorder', { withCredentials: true });
		// 	if (getOrderId.data === false) {
		// 		setIsLoggedIn(getOrderId.data);
		// 	} else {
		// 		//handle stripe payment
		// 		console.log(`goes here logged in`);
		// 		ev.preventDefault();
		// 		setProcessing(true);
		// 		const payload = await stripe.confirmCardPayment(clientSecret, {
		// 			payment_method: {
		// 				card: elements.getElement(CardElement),
		// 			},
		// 		});
		// 		if (payload.error) {
		// 			setError(`Payment failed ${payload.error.message}`);
		// 			setProcessing(false);
		// 		} else {
		// 			setError(null);
		// 			setProcessing(false);
		// 			setSucceeded(true);
		// 		}
		// 		//handle logging order to database
		// 		const jsonOrderId = getOrderId.data;
		// 		const orderId = jsonOrderId.max;
		// 		for (let i = 0; i < bag.length; i++) {
		// 			const postToOrderProducts = await fetch('/order/postorderdetail', {
		// 				method: 'post',
		// 				headers: {
		// 					'Content-Type': 'application/json',
		// 				},
		// 				body: JSON.stringify({
		// 					order_id: parseInt(orderId, 10),
		// 					product_id: bag[i].productInfo.id,
		// 					quantity: bag[i].quantity,
		// 					product_name: bag[i].productInfo.name,
		// 					product_image: bag[i].productInfo.image,
		// 				}),
		// 				credentials: 'include',
		// 			});
		// 			const response = await postToOrderProducts.json();
		// 			setIsOrderPosted(response);
		// 		}
		// 		// clear bag action
		// 		dispatch(clearBag());
		// 	}
		// } catch (err) {
		// 	console.log(err);
		// }
	};

	let sumOfBag = 0;
	bag.forEach((product) => {
		let price = Number(product.productInfo.price.replace(/[^0-9.-]+/g, ''));
		sumOfBag += price * product.quantity;
	});

	// const postOrderGetOrderId = async () => {
	// 	try {
	// 		const getOrderId = await axios.post('/order/placeorder', { withCredentials: true });
	// 		if (getOrderId.data === false) {
	// 			setIsLoggedIn(getOrderId.data);
	// 		} else {
	// 			const jsonOrderId = getOrderId.data;
	// 			const orderId = jsonOrderId.max;
	// 			for (let i = 0; i < bag.length; i++) {
	// 				const postToOrderProducts = await fetch('/order/postorderdetail', {
	// 					method: 'post',
	// 					headers: {
	// 						'Content-Type': 'application/json',
	// 					},
	// 					body: JSON.stringify({
	// 						order_id: parseInt(orderId, 10),
	// 						product_id: bag[i].productInfo.id,
	// 						quantity: bag[i].quantity,
	// 						product_name: bag[i].productInfo.name,
	// 						product_image: bag[i].productInfo.image,
	// 					}),
	// 					credentials: 'include',
	// 				});
	// 				const response = await postToOrderProducts.json();
	// 				setIsOrderPosted(response);
	// 			}
	// 			dispatch(clearBag());
	// 		}
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

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
					<form id='payment-form' onSubmit={handleSubmit}>
						<CardElement id='card-element' options={cardStyle} onChange={handleChange} />
						<button disabled={processing || disabled || succeeded} id='submit'>
							<span id='button-text'>{processing ? <div className='spinner' id='spinner'></div> : 'Pay now'}</span>
						</button>
						{/* Show any error that happens when processing the payment */}
						{error && (
							<div className='card-error' role='alert'>
								{error}
							</div>
						)}
						{/* Show a success message upon completion */}
						<p className={succeeded ? 'result-message' : 'result-message hidden'}>
							Payment succeeded, see the result in your
							<a href={`https://dashboard.stripe.com/test/payments`}> Stripe dashboard.</a> Refresh the page to pay again.
						</p>
						{/* <button
							// disabled={processing || disabled || succeeded}
							// id='submit'
							type='submit'
							onClick={async () => {
								handleSubmit();
							}}>
							Check out
						</button> */}
					</form>
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
