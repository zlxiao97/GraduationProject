import request from '@/utils/request';
import { genAsyncSearch } from '@/utils/search/searchInCurPage';

async function queryRule2({ current, pageSize, course_name = '', lesson_name = '' }) {
  return request('/api/manage/record', {
    params: {
      current,
      pageSize,
      course_name,
      lesson_name,
    },
  });
}

export const queryRule = genAsyncSearch(queryRule2);

export async function queryCourses(params) {
  return request('/api/manage/account/courses', {});
}

export async function queryLessons({ course_id }) {
  return request('/api/manage/course/lesson', {
    params: {
      course_id,
    },
  });
}

export async function updateAtStatus({ attendance_id, attendance_status }) {
  return request('/api/manage/record', {
    method: 'PUT',
    data: {
      attendance_id,
      attendance_status,
    },
  });
}
