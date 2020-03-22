import { Button, Divider, message, Select, Input, Typography, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { columns } from './config/col-config-list';
import { connect } from 'dva';
import { queryRule, update, remove, add } from './service';
const { Option } = Select;
const { Text } = Typography;
const { Search } = Input;

let localAction = null;
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields, course_id) => {
  const hide = message.loading('正在新增');
  const res = await add({
    course_id,
    lesson_name: fields.lesson_name,
    start_time: fields.start_time,
    end_time: fields.end_time,
    lat: fields.lat,
    lng: fields.lng,
    range_radius: fields.range_radius,
  });
  hide();
  if (res && !res.success) {
    message.error('新增失败');
    return false;
  }
  message.success('新增成功');
  return true;
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async fields => {
  const hide = message.loading('正在修改');
  const res = await update({
    lesson_id: fields.lesson_id,
    lesson_name: fields.lesson_name,
    start_time: fields.start_time,
    end_time: fields.end_time,
    lat: fields.lat,
    lng: fields.lng,
    range_radius: fields.range_radius,
  });
  hide();
  if (res && !res.success) {
    message.error('修改失败');
    return false;
  }
  message.success('修改成功');
  return true;
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async lesson_id => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: '删除规则',
      content: '确定删除该规则吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        try {
          await remove({
            lesson_id,
          });
          hide();
          message.success('删除成功，即将刷新');
          resolve(true);
        } catch (error) {
          hide();
          message.error('删除失败，请重试');
          reject(new Error('删除失败'));
        }
      },
    });
  });
};

const TableList = ({
  curCourse,
  match: {
    params: { courseid },
  },
}) => {
  const [sorter, setSorter] = useState({});
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [courseId, setCourseId] = useState(~courseid.indexOf(':') ? '' : courseid);
  const [updateModalValue, setUpdateModalValue] = useState({});
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');

  const actionRef = useRef();

  const headerContent = (
    <div className="headerContent-wrapper">
      <Text>课程名称：</Text>
      <Select
        style={{ width: 360 }}
        value={courseId}
        onChange={async course_id => {
          setCourseId(course_id);
        }}
        placeholder="请选择课程编号"
      >
        {curCourse.map(({ course_id, course_name }) => (
          <Option value={course_id} key={course_id}>
            {course_id}
          </Option>
        ))}
      </Select>
      <Button
        type="primary"
        onClick={() => {
          handleModalVisible(true);
        }}
      >
        创建规则
      </Button>
    </div>
  );
  return (
    <PageHeaderWrapper content={headerContent}>
      <ProTable
        headerTitle={false}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        options={{ fullScreen: false, reload: true, setting: true }}
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={{
          sorter,
          keywords,
          course_id: courseId,
        }}
        toolBarRender={(action, { selectedRows }) => {
          localAction = action;
          return [
            <Text>功课名称：</Text>,
            <Search
              placeholder="搜索..."
              onSearch={val => {
                setKeywords(val);
              }}
              onChange={e => {
                setKeywordsValue(e.target.value);
              }}
              value={keywordsValue}
              style={{ width: 200 }}
            />,
          ];
        }}
        tableAlertRender={false}
        request={params => {
          return queryRule(params);
        }}
        columns={[
          ...columns,
          {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
              <>
                <a
                  onClick={async () => {
                    const { date, start_time, end_time } = record;
                    const values = {
                      ...record,
                      date: moment(date),
                      time: [moment(start_time), moment(end_time)],
                    };
                    await setUpdateModalValue(values);
                    setUpdateModalVisible(true);
                  }}
                >
                  编辑
                </a>
                <Divider type="vertical" />
                <a
                  onClick={async () => {
                    const { lesson_id } = record;
                    await handleRemove(lesson_id);
                    localAction.resetPageIndex(1);
                    localAction.reload();
                  }}
                >
                  删除
                </a>
              </>
            ),
          },
        ]}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 10,
          defaultCurrent: 1,
        }}
      />
      <CreateForm
        onSubmit={async (value, callback) => {
          const { date, time } = value;
          const dateValue = date.startOf('day').valueOf();
          const [from, to] = time;
          const fromValue = from.diff(moment(from).startOf('day'));
          const toValue = to.diff(moment(to).startOf('day'));
          const props = {
            ...value,
            start_time: dateValue + fromValue,
            end_time: dateValue + toValue,
          };
          const success = await handleAdd(props, courseId);
          if (success) {
            handleModalVisible(false);
            callback(true);
            localAction.resetPageIndex(1);
            localAction.reload();
          } else {
            callback(false);
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />

      {updateModalValue && Object.keys(updateModalValue).length ? (
        <UpdateForm
          onSubmit={async (value, callback) => {
            const { date, time } = value;
            const dateValue = date.startOf('day').valueOf();
            const [from, to] = time;
            const fromValue = from.diff(moment(from).startOf('day'));
            const toValue = to.diff(moment(to).startOf('day'));
            const props = {
              ...value,
              start_time: dateValue + fromValue,
              end_time: dateValue + toValue,
            };
            const success = await handleUpdate(props);
            if (success) {
              setUpdateModalVisible(false);
              setUpdateModalValue({});
              callback(true);
              localAction.resetPageIndex(1);
              localAction.reload();
            } else {
              setUpdateModalVisible(false);
              setUpdateModalValue({});
              callback(false);
            }
          }}
          onCancel={() => {
            setUpdateModalVisible(false);
            setUpdateModalValue({});
          }}
          updateModalVisible={updateModalVisible}
          values={updateModalValue}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default connect(({ attendanceRule: { curCourse } }) => ({
  curCourse,
}))(TableList);
