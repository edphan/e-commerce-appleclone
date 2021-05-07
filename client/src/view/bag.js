import { useSelector } from 'react-redux';
import { clearBag, selectBag } from '../components/bag/bagSlice';
import ProductsInBag from '../components/bag/productsInBag';

function Bag() {
	// const [orderId, setOrderId] = useState('');
	const bag = useSelector(selectBag);

	let sumOfBag = 0;
	bag.forEach((product) => {
		let price = Number(product.productInfo.price.replace(/[^0-9.-]+/g, ''));
		sumOfBag += price * product.quantity;
	});

	const postOrderGetOrderId = async () => {
		const getOrderId = await fetch('/order/placeorder', { method: 'POST', credentials: 'include' });
		const jsonOrderId = await getOrderId.json();
		const orderId = jsonOrderId.max;
		for (let i = 0; i < bag.length; i++) {
			// eslint-disable-next-line
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
		}
	};

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

export default Bag;
