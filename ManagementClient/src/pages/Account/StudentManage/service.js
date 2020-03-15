import request from '@/utils/request';
import { genAsyncSearch } from '@/utils/search/searchInCurPage';

async function queryRule2(params) {
  return request('/api/rule', {
    params,
  });
}

export const queryRule = genAsyncSearch(queryRule2);

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}

export async function add({ username, account_pwd, account_name }) {
  return request('/api/manage/account', {
    method: 'POST',
    data: {
      username,
      account_pwd,
      account_name,
    },
  });
}
