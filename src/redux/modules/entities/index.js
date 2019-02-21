import { combineReducers } from 'redux';
import comments from './comments';
import orders from './orders';
import products from './products';
import shops from './shops';

// 合并领域状态
const rootReducer = combineReducers({
  comments,
  orders,
  products,
  shops
});

export default rootReducer;