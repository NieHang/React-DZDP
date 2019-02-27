import React, { Component } from 'react';
import HomeHeader from './components/HomeHeader';
import Banner from './components/Banner';
import Category from './components/Category';
import Activity from './components/Activity';
import Headline from './components/Headline';
import Discount from './components/Discount';
import LikeList from './components/LikeList';
import Footer from '../../components/Footer';

export default class Home extends Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <Banner />
        <Category />
        <Headline />
        <Activity />
        <Discount />
        <LikeList />
        <Footer />
      </div>
    );
  }
}
