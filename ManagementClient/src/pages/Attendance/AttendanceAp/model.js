import { queryIvtList } from './service';

//获取下拉列表库存编号的默认参数
const defaultParams = {
    pageindex: 0,
    pagesize: 100,
};

const Model = {
  namespace: 'ivtlist',
  state: {
    ivtList: [],
  },
  reducers: {
    getIvtList(state, { payload }) {
      return { ...state, ivtList: payload };
    },
  },
  effects: {
    *fetchIvtList({ payload }, { call, put }) {
      const response = yield call(queryIvtList, payload);
      yield put({
        type: 'getIvtList',
        payload: response,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/cargo/cargolistivt') {
          dispatch({
            type: 'fetchIvtList',
            payload: defaultParams,
          });
        }
      });
    },
  },
};

export default Model;