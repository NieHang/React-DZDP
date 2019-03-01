/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./style.css";

export default class Discount extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="discount">
        <a className="discount__header">
          <span className="discount__title">超值特惠</span>
          <span className="discount__more">更多优惠</span>
          <span className="discount__arrow" />
        </a>
        <div className="discount__content">
          {data.map((item, index) => {
            return (
              <div
                key={item.id}
                to={`/detail/${item.id}`}
                className="discount__item"
              >
                <div className="discount__itemPic">
                  <img alt="" width="100%" height="100%" src={item.picture} />
                </div>
                <div className="discount__itemTitle">{item.shop}</div>
                <div className="discount__itemPriceWrapper">
                  <ins className="discount__itemCurrentPrice">
                    {item.currentPrice}
                  </ins>
                  <del className="discount__itemOldPrice">{item.oldPrice}</del>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}