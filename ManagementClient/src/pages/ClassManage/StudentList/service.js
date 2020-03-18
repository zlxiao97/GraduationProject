import request from '@/utils/request';
import transformStudentsToData from './utils/transformStudentsToData';
import transformApiToData from './utils/transformApiToData';
import { genAsyncSearch } from '@/utils/search/searchInCurPage';

async function queryRule2({ current, pageSize, course_id }) {
  const data = await request('/api/manage/studentlist', {
    params: {
      current,
      pageSize,
      course_id,
    },
  });
  return transformApiToData(data);
}

export const queryRule = genAsyncSearch(queryRule2);

export async function queryCourses() {
  return request('/api/manage/account/courses');
}

export async function queryStudents() {
  const data = await request('/api/manage/student', {
    params: {
      current: -1,
      pageSize: 10,
    },
  });
  return transformStudentsToData(data);
}

export async function remove({ s2c_id }) {
  return request('/api/manage/studentlist', {
    method: 'DELETE',
    data: { s2c_id },
  });
}

export async function add({ stu_id, course_id }) {
  return request('/api/manage/studentlist', {
    method: 'POST',
    data: {
      stu_id,
      course_id,
    },
  });
}
