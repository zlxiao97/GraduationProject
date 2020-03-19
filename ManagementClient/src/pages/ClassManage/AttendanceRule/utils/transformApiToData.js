import uuid from '@/utils/uuid';
import momemnt from 'moment';

export default apidata => {
  const { data: apiarr } = apidata;
  const data = apiarr.map(item => {
    const { start_time, end_time } = item;
    const date = momemnt(start_time).format('YYYY-MM-DD');
    const time = `${momemnt(start_time).format('HH:mm')}-${momemnt(end_time).format('HH:mm')}`;
    return {
      ...item,
      key: uuid(),
      date,
      time,
    };
  });
  return {
    ...apidata,
    data,
  };
};
