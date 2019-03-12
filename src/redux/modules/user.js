import url from "../../utils/url";
import { FETCH_DATA } from "../middleware/api";
import {
  schema,
  TO_PAY_TYPE,
  AVAILABLE_TYPE,
  REFUND_TYPE,
  getOrderById
} from "./entities/orders";
import { combineReducers } from "redux"

const initialState = {
	orders: {
		isFetching: false,
		ids: [],
		// 待付款的订单id
		toPayIds: [],
		// 可使用的订单id
		availableIds: [],
		// 退款订单id
		refundIds: []
	},
	currentTab: 0
}

export const types = {
  //获取订单列表
  FETCH_ORDERS_REQUEST: "USER/FETCH_ORDERS_REQUEST",
  FETCH_ORDERS_SUCCESS: "USER/FETCH_ORDERS_SUCCESS",
  FETCH_ORDERS_FAILURE: "USER/FETCH_ORDERS_FAILURE",
  //设置当选选中的tab
  SET_CURRENT_TAB: "USER/SET_CURRENT_TAB"
};

export const actions = {
  // 获取订单列表
  loadOrders: () => {
    return (dispatch, getState) => {
      const { ids } = getState().user.orders;
      if (ids.length > 0) {
        return null;
      }
      const endpoint = url.getOrders();
      return dispatch(fetchOrders(endpoint));
    };
  },
  // 切换tab
  setCurrentTab: index => ({
    type: types.SET_CURRENT_TAB,
    index
  })
};

const fetchOrders = endpoint => ({
	[FETCH_DATA]: {
    types: [
      types.FETCH_ORDERS_REQUEST,
      types.FETCH_ORDERS_SUCCESS,
      types.FETCH_ORDERS_FAILURE
    ],
    endpoint,
    schema
  }
})