import { Button, Divider, message, Select, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { connect } from 'dva';
import CreateForm from './components/CreateForm';
import data2ExcelJson from '@/utils/excel/data2ExcelJson';
import exportJson2Sheet from '@/utils/excel/exportJson2Sheet';
import { columns } from './config/col-config-list';
import { queryRule, queryStudents, remove, add } from './service';
const { Option } = Select;
const { Text } = Typography;
const { Search } = Input;

let localAction = null;
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (stu_ids, course_id) => {
  const hide = message.loading('正在新增');
  const results = [];
  try {
    for (let i = 0; i < stu_ids.length; i++) {
      const res = await add({
        stu_id: stu_ids[i],
        course_id,
      });
      results.push(res);
    }
  } catch (e) {
    return false;
  }
  hide();
  const { length: success } = results.filter(({ success }) => !success);
  if (!success) {
    return false;
  }
  message.success('新增成功');
  return true;
};

/**
 *  删除节点
 * @param s2c_id
 */

const handleRemove = async s2c_id => {
  const hide = message.loading('正在删除');
  try {
    await remove({
      s2c_id,
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = ({
  curCourse,
  match: {
    params: { courseid },
  },
}) => {
  const [sorter, setSorter] = useState({});
  const [createModalVisible, handleModalVisible] = useState(false);
  const [datasource, setDatasource] = useState(null);
  const [courseId, setCourseId] = useState(~courseid.indexOf(':') ? '' : courseid);
  const [studentList, setStudentList] = useState([]);
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');

  const actionRef = useRef();

  const headerContent = (
    <div className="headerContent-wrapper">
      <Text>课程编号：</Text>
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
        onClick={async () => {
          const data = await queryStudents();
          await setStudentList(data);
          handleModalVisible(true);
        }}
      >
        添加学生
      </Button>
    </div>
  );
  return (
    <PageHeaderWrapper content={headerContent}>
      <div className="pageHeaderWrapper-fix-ahead-panel">
        <Button
          type="primary"
          onClick={() => {
            const body = data2ExcelJson(datasource, columns);
            const headerOrder = ['规则名称', '描述', '服务调用次数', '状态', '上次调度时间'];
            const sheetname = '范例报表';
            const filename = '范例报表';
            return exportJson2Sheet(body, headerOrder, sheetname, filename);
          }}
        >
          导出报表
        </Button>
      </div>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        options={{
          fullScreen: false,
          reload: true,
          setting: true,
        }}
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
            <Text>学生名称：</Text>,
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
        request={async params => {
          const data = await queryRule(params);
          const { data: datasource2 } = data;
          await setDatasource(datasource2);
          return data;
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
                    await handleRemove(record['s2c_id']);
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
        data={studentList}
        selected={[]}
        onSubmit={async value => {
          await handleAdd(value, courseId);
          handleModalVisible(false);
          localAction.resetPageIndex(1);
          localAction.reload();
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ studentList: { curCourse } }) => ({
  curCourse,
}))(TableList);
