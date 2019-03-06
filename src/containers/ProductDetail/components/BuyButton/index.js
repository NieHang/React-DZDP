import React, { Component } from 'react'

import './style.css';

export default class BuyButton extends Component {
  render() {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a className="buyButton">
        立即购买
      </a>
    )
  }
}
