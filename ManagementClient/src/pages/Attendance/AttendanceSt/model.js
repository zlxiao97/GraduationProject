import { queryCourses } from './service';

const Model = {
  namespace: 'attendanceSt',
  state: {
    curCourse: [],
  },
  reducers: {
    getCurCourse(state, { payload }) {
      return { ...state, curCourse: payload };
    },
  },
  effects: {
    *fetchCurCourse({ payload }, { call, put }) {
      const response = yield call(queryCourses, payload);
      const { data, success } = response;
      yield put({
        type: 'getCurCourse',
        payload: success ? data : [],
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/attendance/attendancest') {
          dispatch({
            type: 'fetchCurCourse',
            payload: '',
          });
        }
      });
    },
  },
};

export default Model;
