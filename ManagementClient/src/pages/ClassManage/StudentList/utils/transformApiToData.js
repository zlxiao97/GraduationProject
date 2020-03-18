import uuid from '@/utils/uuid';

export default ({ success, total, data }) => {
  data = data.map(item => ({
    ...item,
    key: uuid(),
  }));
  return { success, total, data };
};
