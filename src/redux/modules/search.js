import url from '../../utils/url';
import { FETCH_DATA } from '../middleware/api';
import { schema as keywordSchema } from './entities/keywords';

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
  CLEAR_HISTORY_KEYWORD: 'SEARCH/CLEAR_HISTORY_KEYWORD'
}

const initialState = {
  inputText: '',
  popularKeywords: {
    isFetching: false,
    ids: []
  },
  relatedKeywords: {

  },
  historyKeywords: []  //保存关键词id
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
      const endpoint = url.getRelatedKeywords();
      return dispatch(fetchRelatedKeywords(endpoint));
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
  clearHistoryKeyword: () => ({
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