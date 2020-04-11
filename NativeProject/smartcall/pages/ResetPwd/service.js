import request from '../../api/api';

export const reset = async ({stu_phoneno, stu_pwd}) => {
  return request('/student/updatePwd', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      stu_phoneno,
      stu_pwd,
    }),
  });
};
