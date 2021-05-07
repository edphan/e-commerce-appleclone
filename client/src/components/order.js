import React from 'react';

function Order({ order }) {
	return (
		<div className='order-container'>
			{order.map((order) => (
				<div key={order.id} className='order-product'>
					<img src={order.product_image} alt='' />
					<p>{order.product_name}</p>
					<p>quantity: {order.quantity}</p>
				</div>
			))}
		</div>
	);
}

export default Order;
