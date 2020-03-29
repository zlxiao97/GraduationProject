import request from '../../api/api';

export const login = async ({account, pwd}) => {
  return request('/student/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      account,
      pwd,
    }),
  });
};
