import React, { Component } from 'react';
import ProductOverview from './components/ProductOverview';
import ShopInfo from './components/ShopInfo';
import Detail from './components/Detail';
import Remark from './components/Remark';
import BuyButton from './components/BuyButton';

export default class ProductDetail extends Component {
	render() {
		return (
			<div>
				<ProductOverview />
				<ShopInfo />
				<Detail />
				<Remark />
				<BuyButton />
			</div>
		);
	}
}
