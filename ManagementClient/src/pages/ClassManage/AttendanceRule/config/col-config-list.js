export const columns = [
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
    title: '考勤地点纬度',
    dataIndex: 'lat',
    sorter: false,
  },
  {
    title: '考勤地点经度',
    dataIndex: 'lng',
    sorter: false,
  },
  {
    title: '允许打卡范围',
    dataIndex: 'range_radius',
    sorter: false,
    renderText: val => `${val}米`,
  },
  {
    title: '考勤日期',
    dataIndex: 'date',
    sorter: false,
  },
  {
    title: '考勤时间段',
    dataIndex: 'time',
    sorter: false,
  },
];
