import request from '@/utils/request';

export async function queryAttendanceRate({ course_name }) {
  return request('/api/manage/record/rate', {
    params: {
      course_name,
    },
  });
}

export async function queryCourses(params) {
  return request('/api/manage/account/courses', {});
}
