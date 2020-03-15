export const columns = [
  {
    title: '规则名称',
    dataIndex: 'name',
    sorter: false,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    sorter: false,
  },
  {
    title: '服务调用次数',
    dataIndex: 'callNo',
    sorter: false,
    renderText: val => `${val} 万`,
  },
  {
    title: '状态',
    dataIndex: 'status',
    sorter: false,
    filters: false,
    valueEnum: {
      0: {
        text: '关闭',
        status: 'Default',
      },
      1: {
        text: '运行中',
        status: 'Processing',
      },
      2: {
        text: '已上线',
        status: 'Success',
      },
      3: {
        text: '异常',
        status: 'Error',
      },
    },
  },
  {
    title: '上次调度时间',
    dataIndex: 'updatedAt',
    sorter: false,
    valueType: 'dateTime',
  },
];
