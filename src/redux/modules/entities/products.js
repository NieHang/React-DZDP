export const schema = {
  // 表名
  name: 'products',
  id: 'id'
}

const reducer = (state = {}, action) => {
  if (action.response && action.response.products) {
    return { ...state, ...action.response.products }
  }
  return state;
}

export default reducer;