// will render out the small product blocks for the home page
import React from 'react';
import ProductPreviewSingle from './productPreviewSingle';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllProducts, selectProducts } from './productsPreviewSlice';

function ProductsPreview() {
	const dispatch = useDispatch();
	const allProducts = useSelector(selectProducts);

	// dispatch 2 async calls, one to get all products, one to get all categories
	useEffect(() => {
		dispatch(loadAllProducts());
	}, [dispatch]);

	const allMac = allProducts.filter((product) => product.category === 'Mac');

	const allIphone = allProducts.filter((product) => product.category === 'iPhone');

	const allIpad = allProducts.filter((product) => product.category === 'iPad');

	const allOthers = allProducts.filter((product) => product.category === 'Others');

	// const mac = categories.find((category) => category.category === 'Mac');

	return (
		<div className='products-preview-container'>
			<div className='category-container'>
				<div className='category-name'>
					<p>Mac</p>
				</div>
				<div className='category-products'>
					{allMac.map((product) => (
						<div key={product.id}>
							<ProductPreviewSingle product={product} />
						</div>
					))}
				</div>
			</div>

			<div className='category-container'>
				<div className='category-name'>
					<p>iPhone</p>
				</div>
				<div className='category-products'>
					{allIphone.map((product) => (
						<div key={product.id}>
							<ProductPreviewSingle product={product} />
						</div>
					))}
				</div>
			</div>

			<div className='category-container'>
				<div className='category-name'>
					<p>iPad</p>
				</div>
				<div className='category-products'>
					{allIpad.map((product) => (
						<div key={product.id}>
							<ProductPreviewSingle product={product} />
						</div>
					))}
				</div>
			</div>

			<div className='category-container'>
				<div className='category-name'>
					<p>Other</p>
				</div>
				<div className='category-products'>
					{allOthers.map((product) => (
						<div key={product.id}>
							<ProductPreviewSingle product={product} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ProductsPreview;
