import request from '../../api/api';
import qs from 'qs';

export async function query({stu_id}) {
  return request(`/student/lesson?${qs.stringify({stu_id})}`);
}

export async function currentUser() {
  return request(`/student/currentAccount`);
}
