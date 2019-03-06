import React, { Component } from 'react';
import Header from '../../components/Header';
import ProductOverview from './components/ProductOverview';
import ShopInfo from './components/ShopInfo';
import Detail from './components/Detail';
import Remark from './components/Remark';
import BuyButton from './components/BuyButton';

export default class ProductDetail extends Component {
	render() {
		return (
			<div>
				<Header title='团购详情' obBack={this.handleBack} grey/>
				<ProductOverview />
				<ShopInfo />
				<Detail />
				<Remark />
				<BuyButton />
			</div>
		);
	}

	handleBack = () => {
		
	}
}
