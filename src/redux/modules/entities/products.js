import createReducer from '../../../utils/createReducer';

export const schema = {
  // 表名
  name: 'products',
  id: 'id'
}

const reducer = createReducer(schema.name);

export default reducer;