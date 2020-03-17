export const columns = [
  {
    title: '学生编号',
    dataIndex: 'stu_code',
    sorter: false,
  },
  {
    title: '学生名称',
    dataIndex: 'stu_name',
    sorter: false,
  },
  {
    title: '功课编号',
    dataIndex: 'lesson_id',
    sorter: false,
  },
  {
    title: '功课名称',
    dataIndex: 'lesson_name',
    sorter: false,
  },
  {
    title: '考勤日期',
    dataIndex: 'attendance_time',
    sorter: false,
    valueType: 'dateTime',
  },
  {
    title: '开始时间',
    dataIndex: 'start_time',
    sorter: false,
    valueType: 'time',
  },
  {
    title: '结束时间',
    dataIndex: 'end_time',
    sorter: false,
    valueType: 'time',
  },
  {
    title: '考勤状态',
    dataIndex: 'attendance_status',
    sorter: false,
    filters: false,
    valueEnum: {
      '0': {
        text: '出勤',
      },
      '1': {
        text: '缺勤',
      },
    },
  },
];
