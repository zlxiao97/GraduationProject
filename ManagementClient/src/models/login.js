import { stringify } from 'querystring';
import { router } from 'umi';
import { accountLogin } from '@/services/login';
import { setAuthority, setToken as setTokenInStorage } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { setToken } from '@/utils/request';

const rbacMap = {
  '0': 'admin',
  '1': 'user',
};

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      let response = yield call(accountLogin, payload);
      const { token } = response;

      if (token) {
        response = {
          ...response,
          status: 'ok', // TODO: hardcoded prop to be removed
          type: 'account', // TODO: hardcoded prop to be removed
        };

        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); // Login successfully

        if (response.status === 'ok') {
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let { redirect } = params;

          if (redirect) {
            const redirectUrlParams = new URL(redirect);
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);

              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
              }
            } else {
              window.location.href = '/';
              return;
            }
          } else {
            redirect = '/attendance/attendanceap';
          }
          router.replace(redirect || '/');
        }
      } else {
        // message.error('登陆失败,请检查用户名或密码是否输入正确');
      }
    },

    *logout(_, { call }) {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      yield call(setTokenInStorage, '');
      yield call(setToken, '');
      yield call(setAuthority, '');
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      const { token, role } = payload;
      setTokenInStorage(token);
      setToken(token);
      setAuthority(rbacMap[role]);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
