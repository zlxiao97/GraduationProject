import request from '@/utils/request';

export async function queryRule({ current, pageSize, account_id }) {
  return request('/api/manage/course', {
    params: {
      current,
      pageSize,
      account_id,
    },
  });
}
export async function remove({ course_id }) {
  return request('/api/manage/course', {
    method: 'DELETE',
    data: { course_id },
  });
}

export async function update({ course_id, course_name }) {
  return request('/api/manage/course', {
    method: 'PUT',
    data: { course_id, course_name },
  });
}

export async function add({ account_id, course_name }) {
  return request('/api/manage/course', {
    method: 'POST',
    data: {
      account_id,
      course_name,
    },
  });
}
