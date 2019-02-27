import React, { Component } from 'react';
import './style.css';

export default class HomeHeader extends Component {
  render() {
    return (
      <div className='homeHeader'>
        <header className='homeHeader__wrapper'>
          <span className='homeHeader__city'>北京</span>
          <span className='homeHeader__search'>输入商户名、地点</span>
          <span className='homeHeader__self'>
            <div className='homeHeader__portrait' />
          </span>
        </header>
      </div>
    );
  }
}
