import url from '../../utils/url';
import { FETCH_DATA } from '../middleware/api';
import { schema as keywordSchema, getKeywordById } from './entities/keywords';
import { schema as shopSchema, getShopById } from './entities/shops';
import { combineReducers } from "redux";

export const types = {
  //获取热门关键词请求
  FETCH_POPULAR_KEYWORDS_REQUEST: "HOME/FETCH_POPULAR_KEYWORDS_REQUEST",
  //获取热门关键词请求成功
  FETCH_POPULAR_KEYWORDS_SUCCESS: "HOME/FETCH_POPULAR_KEYWORDS_SUCCESS",
  //获取热门关键词请求失败
  FETCH_POPULAR_KEYWORDS_FAILURE: "HOME/FETCH_POPULAR_KEYWORDS_FAILURE",
  //根据输入的文本获取相关关键词请求
  FETCH_RELEATED_KEYWORDS_REQUEST: "HOME/FETCH_RELEATED_KEYWORDS_REQUEST",
  //根据输入的文本获取相关关键词请求成功
  FETCH_RELEATED_KEYWORDS_SUCCESS: "HOME/FETCH_RELEATED_KEYWORDS_SUCCESS",
  //根据输入的文本获取相关关键词请求失败
  FETCH_RELEATED_KEYWORDS_FAILURE: "HOME/FETCH_RELEATED_KEYWORDS_FAILURE",
  // 设置当前输入
  SET_INPUT_TEXT: 'SEARCH/SET_INPUT_TEXT',
  CLEAR_INPUT_TEXT: 'SEARCH/CLEAR_INPUT_TEXT',
  // 历史查询记录
  ADD_HISTORY_KEYWORD: 'SEARCH/ADD_HISTORY_KEYWORD',
  CLEAR_HISTORY_KEYWORD: 'SEARCH/CLEAR_HISTORY_KEYWORD',
  // 根据关键词查询结果
  FETCH_SHOPS_REQUEST: "HOME/FETCH_SHOPS_REQUEST",
  //获取热门关键词请求成功
  FETCH_SHOPS_SUCCESS: "HOME/FETCH_SHOPS_SUCCESS",
  //获取热门关键词请求失败
  FETCH_SHOPS_FAILURE: "HOME/FETCH_SHOPS_FAILURE",
}

const initialState = {
  inputText: '',
  popularKeywords: {
    isFetching: false,
    ids: []
  },
  relatedKeywords: {

  },
  historyKeywords: [],  //保存关键词id
  searchedShopsByKeyword: {}
}

export const actions = {
  // 获取热门关键词
  loadPopularKeywords: () => {
    return (dispatch, getState) => {
      const { ids } = getState().search.popularKeywords;
      if (ids.length > 0) {
        return null;
      }
      const endpoint = url.getPopularKeywords();
      return dispatch(fetchPopularKeywords(endpoint));
    }
  },
  // 根据输入获取相关关键词
  loadRelatedKeywords: text => {
    return (dispatch, getState) => {
      const { relatedKeywords } = getState().search;
      if (relatedKeywords[text]) {
        return null;
      }
      const endpoint = url.getRelatedKeywords(text);
      return dispatch(fetchRelatedKeywords(text, endpoint));
    } 
  },
  loadRelatedShops: keyword => {
    return (dispatch, getState) => {
      const { searchedShopsByKeyword } = getState().search;
      if (searchedShopsByKeyword[keyword]) {
        return null;
      }
      const endpoint = url.getRelatedShops(keyword);
      return dispatch(fetchRelatedShops(keyword, endpoint));
    }
    
  },
  // 搜索框输入文本相关action
  setInputText: text => ({
    type: types.SET_INPUT_TEXT,
    text
  }),
  clearInputText: () => ({
    type: types.CLEAR_INPUT_TEXT
  }),
  // 历史查询记录相关action
  addHistoryKeyword: keywordId => ({
    type: types.ADD_HISTORY_KEYWORD,
    text: keywordId
  }),
  clearHistoryKeywords: () => ({
    type: types.CLEAR_HISTORY_KEYWORD
  }),
}

const fetchPopularKeywords = endpoint => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_POPULAR_KEYWORDS_REQUEST,
      types.FETCH_POPULAR_KEYWORDS_SUCCESS,
      types.FETCH_POPULAR_KEYWORDS_FAILURE
    ],
    endpoint,
    schema: keywordSchema
  }
})

const fetchRelatedKeywords = (text, endpoint) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_RELEATED_KEYWORDS_REQUEST,
      types.FETCH_RELEATED_KEYWORDS_SUCCESS,
      types.FETCH_RELEATED_KEYWORDS_FAILURE
    ],
    endpoint,
    schema: keywordSchema
  },
  text
})

const fetchRelatedShops = (text, endpoint) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_SHOPS_REQUEST,
      types.FETCH_SHOPS_SUCCESS,
      types.FETCH_SHOPS_FAILURE
    ],
    endpoint,
    schema: shopSchema
  },
  text
})

// reducers
const popularKeywords = (state = initialState.popularKeywords, action) => {
  switch(action.type) {
    case types.FETCH_POPULAR_KEYWORDS_REQUEST:
      return { ...state, isFetching: true }
    case types.FETCH_POPULAR_KEYWORDS_SUCCESS:
      return { ...state, isFetching: false, ids: state.ids.concat(action.response.ids) }
    case types.FETCH_POPULAR_KEYWORDS_FAILURE:
      return { ...state, isFetching: false }
    default: 
      return state;
  }
}

const relatedKeywords = (state = initialState.relatedKeywords, action) => {
  switch (action.type) {
    case types.FETCH_RELEATED_KEYWORDS_REQUEST:
    case types.FETCH_RELEATED_KEYWORDS_SUCCESS:
    case types.FETCH_RELEATED_KEYWORDS_FAILURE:
      return {
        ...state,
        [action.text]: relatedKeywordsByText(state[action.text], action)
      };
    default:
      return state;
  }
};

const relatedKeywordsByText = (
  state = { isFetching: false, ids: [] },
  action
) => {
  switch (action.type) {
    case types.FETCH_RELEATED_KEYWORDS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_RELEATED_KEYWORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids)
      };
    case types.FETCH_RELEATED_KEYWORDS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

const searchedShopsByKeyword = (state = initialState.searchedShopsByKeyword, action) => {
  switch (action.type) {
    case types.FETCH_SHOPS_REQUEST:
    case types.FETCH_SHOPS_SUCCESS:
    case types.FETCH_SHOPS_FAILURE:
      return {
        ...state,
        [action.text]: searchedShops(state[action.text], action)
      };
    default:
      return state;
  }
};

const searchedShops = (
  state = { isFetching: false, ids: [] },
  action
) => {
  switch (action.type) {
    case types.FETCH_SHOPS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_SHOPS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: action.response.ids
      };
    case types.FETCH_SHOPS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

const inputText = (state = initialState.inputText, action) =>{
  switch(action.type) {
    case types.SET_INPUT_TEXT:
      return action.text
    case types.CLEAR_INPUT_TEXT:
      return ""
    default:
      return state
  }
}

const historyKeywords = (state = initialState.historyKeywords, action) => {
  switch(action.type) {
    case types.ADD_HISTORY_KEYWORD: 
      const data = state.filter(item => {
        if(item !== action.text) {
          return true;
        }
        return false;
      })
      return [action.text, ...data];
    case types.CLEAR_HISTORY_KEYWORD:
      return [];
    default:
      return state;
  }
};

const reducer = combineReducers({
  popularKeywords,
  relatedKeywords,
  searchedShopsByKeyword,
  inputText,
  historyKeywords
})

export default reducer;

// selectors
export const getPopularKeywords = state => {
  return state.search.popularKeywords.ids.map(id => getKeywordById(state, id))
}

export const getRelatedKeywords = state => {
  const text = state.search.inputText;
  if (!text || text.trim().length === 0) {
    return [];
  }
  const relatedKeywords = state.search.relatedKeywords[text];
  if (!relatedKeywords) {
    return [];
  }
  return relatedKeywords.ids.map(id => getKeywordById(state, id));
}

export const getInputText = state => state.search.inputText;

export const getHistoryKeywords = state => {
  return state.search.historyKeywords.map(id => getKeywordById(state, id));
}

// 获取店铺列表
export const getSearchedShops = state => {
  const keywordId = state.search.historyKeywords[0];
  if (!keywordId) {
    return [];
  }
  const shops = state.search.searchedShopsByKeyword[keywordId];
  return shops.ids.map(id => getShopById(state, id));
}

// 获取当前关键词
export const getCurrentKeyword = state => {
  const keywordId = state.search.historyKeywords[0];
  if (!keywordId) {
    return '';
  }
  return getKeywordById(state, keywordId).keyword;
}