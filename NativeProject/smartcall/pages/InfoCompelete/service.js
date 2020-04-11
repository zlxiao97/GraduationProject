import request from '../../api/api';

export const update = async ({stu_id, stu_name, stu_school, stu_phoneno}) => {
  return request('/student/updateStuInfo', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      stu_id,
      stu_name,
      stu_school,
      stu_phoneno,
    }),
  });
};
