import request from '../../api/api';
import qs from 'qs';

export async function query({stu_id, begin, end}) {
  return request(`/student/record?${qs.stringify({stu_id, begin, end})}`);
}
