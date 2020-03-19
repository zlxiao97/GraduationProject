import request from '@/utils/request';
import { genAsyncSearch } from '@/utils/search/searchInCurPage';
import transformApiToData from './utils/transformApiToData';

async function queryRule2({ current, pageSize, course_id }) {
  const data = await request('/api/manage/lesson', {
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

export async function remove({ lesson_id }) {
  return request('/api/manage/lesson', {
    method: 'DELETE',
    data: { lesson_id },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function update({
  lesson_id,
  lesson_name,
  start_time,
  end_time,
  lat,
  lng,
  range_radius,
}) {
  return request('/api/manage/lesson', {
    method: 'PUT',
    data: { lesson_id, lesson_name, start_time, end_time, lat, lng, range_radius },
  });
}

export async function add({
  course_id,
  lesson_name,
  start_time,
  end_time,
  lat,
  lng,
  range_radius,
}) {
  return request('/api/manage/lesson', {
    method: 'POST',
    data: {
      course_id,
      lesson_name,
      start_time,
      end_time,
      lat,
      lng,
      range_radius,
    },
  });
}
