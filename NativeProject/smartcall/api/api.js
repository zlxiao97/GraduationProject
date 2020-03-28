import config from '../config/config';
const fakeToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMjAyMDgyMjMyNSIsInN5c3RlbSI6InN0dWRlbnQiLCJpYXQiOjE1ODU0MDA1NTQsImV4cCI6MTU4NjAwNTM1NH0.Ju3Sn8TvcITcQxVyRI3zur1Jks1uT8CHrRiaLyCZh0o';
const {server} = config;

export default async (path, options) => {
  const data = await fetch(`${server}${path}`, {
    ...options,
    headers: {
      Authorization: fakeToken,
    },
  });
  //TODO:统一错误处理
  return data.json();
};
