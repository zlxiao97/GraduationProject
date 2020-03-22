import request from '@/utils/request';
import transformApiToData from './utils/transformApiToData';

export async function queryRule({ current, pageSize, stu_code }) {
  const data = await request('/api/manage/student', {
    params: { current, pageSize, stu_code },
  });
  return transformApiToData(data);
}

export async function remove({ stu_id }) {
  return request('/api/manage/student', {
    method: 'DELETE',
    data: { stu_id },
  });
}
export async function update({ stu_id, stu_code, stu_name, stu_pwd }) {
  return request('/api/manage/student', {
    method: 'PUT',
    data: { stu_id, stu_code, stu_name, stu_pwd },
  });
}

export async function add({ stu_code, stu_pwd, stu_name, faceImg }) {
  const formData = new FormData();
  formData.append('stu_code', stu_code);
  formData.append('stu_pwd', stu_pwd);
  formData.append('stu_name', stu_name);
  formData.append('faceImg', faceImg, faceImg.name);
  return request('/api/manage/student', {
    method: 'POST',
    data: formData,
  });
}

export async function upload({ faceImg, stu_id }) {
  const formData = new FormData();
  formData.append('stu_id', stu_id);
  formData.append('faceImg', faceImg, faceImg.name);
  return request('/api/manage/student/uploads', {
    method: 'PUT',
    data: formData,
  });
}
