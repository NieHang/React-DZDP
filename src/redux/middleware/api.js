import { get } from '../../utils/request';

// 经过中间件处理的 action 所具有的标识
export const FETCH_DATA = 'FETCH_DATA';

export default store => next => action => {
  const callAPI = action[FETCH_DATA];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, schema, types } = callAPI;

  if (typeof endpoint !== 'string') {
    throw new Error('endpoint 必须为字符串类型的 url');
  }

  if (!schema) {
    throw new Error('必须指定领域实体的schema');
  }

  if (!Array.isArray(types) && types.length !== 3) {
    throw new Error('需要制定一个包含3个 action type 的数组');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('action type 必须为字符串类型');
  }

  // 详细请看7-9 前端架构之抽象2：网络请求层封装（redux中间件）（2）
  const actionWith = data => {
    const finalAction = [...action, ...data];
    delete finalAction[FETCH_DATA];
  }

  const [requestType, successType, failureType] = types;

  next(actionWith({ type: requestType }));

  return fetchData(endpoint, schema).then(
    response =>
      next(actionWith({
        type: successType,
        response
      })),
    error => (actionWith({
      type: failureType,
      error
    }))
  );
};

// 执行网络请求
const fetchData = (endpoint, schema) => {
  return get(endpoint).then(data => {
    // 对数据进行扁平化处理，将数据转换成 键值对 的形式
    return normalizeData(data, schema);
  });
};

const normalizeData = (data, schema) => {
  const {id, name} = schema;
  let kvObj = {};
  let ids = [];
  if (Array.isArray(data)) {
    data.forEach(item => {
      kvObj[item[id]] = item;
      ids.push(item[id]);
    })
  } else {
    kvObj[data[id]] = data;
    ids.push(data[id]);
  }
  return {
    [name]: kvObj,
    ids
  }
};
