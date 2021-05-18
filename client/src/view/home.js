import React from 'react';
import Banner from '../components/banner';
import ProductsPreview from '../components/productPreview/productsPreview';
import '../components/styles/homepage.css';

function Home() {
	return (
		<div>
			<Banner />
			<ProductsPreview />
		</div>
	);
}

export default Home;
