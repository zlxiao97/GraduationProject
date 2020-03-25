import request from '@/utils/request';
export async function accountLogin({ account, pwd }) {
  return request('http://120.26.77.19:3000/manage/login', {
    method: 'POST',
    data: {
      account,
      pwd,
    },
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
