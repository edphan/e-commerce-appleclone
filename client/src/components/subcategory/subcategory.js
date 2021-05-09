import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SubcategoryProduct from './subcategoryProducts';
import { selectCategoryProducts, loadSubcategory, selectIsCategoryLoaded } from './subcategorySlice';

function Subcategory({ match }) {
	const dispatch = useDispatch();
	const products = useSelector(selectCategoryProducts);
	const isLoaded = useSelector(selectIsCategoryLoaded);
	const { category, subcategory } = match.params;

	const subcategoryNoSpace = subcategory.replace(/\s/g, '').toLowerCase();

	useEffect(() => {
		dispatch(loadSubcategory({ category: category, subcategory: subcategoryNoSpace }));
	}, []);

	//[dispatch, category, subcategoryNoSpace]

	// filter out the subcategory from all products
	const filteredProducts = products.filter((product) => product.subcategory === subcategory);

	// map over the subcategory to render out the products from that subcategory
	if (isLoaded) {
		return (
			<div className='product-page-container'>
				<div className='subcategory-page'>
					<h2>{subcategory}</h2>
					<p>{filteredProducts[0].description}</p>

					<div className='subcategory-page-products-container'>
						{filteredProducts.map((product) => (
							<div key={product.id}>
								<SubcategoryProduct product={product} />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<p>loading...</p>
			</div>
		);
	}
}

export default Subcategory;
