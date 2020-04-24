import moment from 'moment';
export default data =>
  data
    .filter(({attendance_status}) => +attendance_status)
    .map(({course_name, start_time, end_time}) => ({
      left: course_name,
      right: `${moment(+start_time).format('YYYY-MM-DD')} ${moment(
        +start_time,
      ).format('HH:mm')}-${moment(+end_time).format('HH:mm')}`,
    }));
