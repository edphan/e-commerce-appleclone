// import { addToBag } from '../components/bag/bagSlice';

const React = require('react');

function subcategoryProduct({ product }) {
	// const dispatch = useDispatch();

	return (
		<div className='subcategory-product-container'>
			<div className='subcategory-product'>
				<div className='subcategory-product-image'>
					<img src={product.image} alt='product' />
				</div>
				<p>{product.name}</p>
				<p>{product.price}</p>
			</div>
			<div className='add-to-bag-button'>
				<button>Add to Bag</button>
			</div>
		</div>
	);
}

export default subcategoryProduct;
