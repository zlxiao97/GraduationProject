import request from '../api/api';
export default async () => {
  const currentUser = await request(`/student/currentAccount`);
  return currentUser;
};
