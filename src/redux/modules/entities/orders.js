import createReducer from '../../../utils/createReducer';

export const schema = {
	// 表名
	name: 'orders',
	id: 'id'
};

// 已消费
export const USED_TYPE = 1;
// 待消费
export const TO_PAY_TYPE = 2; 
// 可使用
export const AVAILABLE_TYPE = 3;
// 退款
export const REFUND_TYPE = 4;

const reducer = createReducer(schema.name);

export default reducer;