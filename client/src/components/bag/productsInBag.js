import React from 'react';
import { useDispatch } from 'react-redux';
import { removeProduct, addQuantity, subtractQuantity } from './bagSlice';

function ProductsInBag({ product }) {
	const dispatch = useDispatch();
	const { id, name, price, image } = product.productInfo;
	const quantity = product.quantity;
	let priceInNumber = Number(price.replace(/[^0-9.-]+/g, ''));
	const sum = quantity * priceInNumber;

	return (
		<div className='bag-one-product'>
			<div className='bag-one-image'>
				<img src={image} alt='' />
			</div>
			<p className='bag-one-product-name'>{name}</p>
			<div className='bag-one-product-price-quantity'>
				<p>${sum}</p>
				<div className='quantity-change'>
					<button onClick={() => dispatch(subtractQuantity(product))}>-</button>
					<p>{quantity}</p>
					<button onClick={() => dispatch(addQuantity(product))}>+</button>
				</div>
				<button onClick={() => dispatch(removeProduct(id))}>remove</button>
			</div>
		</div>
	);
}

export default ProductsInBag;
