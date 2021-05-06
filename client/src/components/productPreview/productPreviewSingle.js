import React from 'react';
import { Link } from 'react-router-dom';

function ProductPreviewSingle({ product }) {
	return (
		<div className='product-container'>
			<Link to={`/${product.category}/${product.subcategory}`}>
				<button className='product-container-button'>
					<div className='product-image'>
						<img src={product.image} alt='' />
					</div>
					<div className='product-info'>
						<p>{product.subcategory}</p>
						<p>From {product.price}</p>
					</div>
				</button>
			</Link>
		</div>
	);
}

export default ProductPreviewSingle;
