import uuid from '@/utils/uuid';

export default apidata => {
  const { data: apiarr } = apidata;
  const data = apiarr.map(item => {
    return {
      ...item,
      key: uuid(),
    };
  });
  return {
    ...apidata,
    data,
  };
};
