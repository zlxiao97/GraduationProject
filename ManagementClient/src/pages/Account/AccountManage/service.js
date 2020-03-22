import request from '@/utils/request';
import transformApiToData from './utils/transformApiToData';

export async function queryRule({ current, pageSize }) {
  const data = await request('/api/manage/account', {
    params: {
      current,
      pageSize,
    },
  });
  return transformApiToData(data);
}

export async function remove({account_id}) {
  return request('/api/manage/account', {
    method: 'DELETE',
    data: { account_id },
  });
}

export async function update({ account_id, account_pwd, account_name }) {
  return request('/api/manage/account', {
    method: 'PUT',
    data: { account_id, account_pwd, account_name },
  });
}

export async function add({ account_id, account_pwd, account_name }) {
  return request('/api/manage/account', {
    method: 'POST',
    data: {
      account_id,
      account_pwd,
      account_name,
    },
  });
}
