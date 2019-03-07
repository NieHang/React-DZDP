import { combineReducers } from 'redux';
import comments from './comments';
import orders from './orders';
import products from './products';
import shops from './shops';
import keywords from './keywords';

// 合并领域状态
const rootReducer = combineReducers({
  comments,
  orders,
  products,
  shops,
  keywords
});

export default rootReducer;