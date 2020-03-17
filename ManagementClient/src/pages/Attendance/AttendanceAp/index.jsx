import { Button, message, Select, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { connect } from 'dva';
import data2ExcelJson from '@/utils/excel/data2ExcelJson';
import exportJson2Sheet from '@/utils/excel/exportJson2Sheet';
import uuid from '@/utils/uuid';
import { columns } from './config/col-config-list';
import { queryRule, queryLessons, updateAtStatus } from './service';
const { Option } = Select;
const { Text } = Typography;
const { Search } = Input;

let localAction = null;

const TableList = ({ curCourse }) => {
  const [lessonName, setLessonName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [lessons, setLessons] = useState([]);
  const [datasource, setDatasource] = useState(null);
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');

  const actionRef = useRef();

  const headerContent = (
    <div className="headerContent-wrapper">
      <Text>课程名称：</Text>
      <Select
        style={{ width: 150 }}
        onChange={async json => {
          const { course_id, course_name } = JSON.parse(json);
          await setCourseName(course_name);
          const { data, success } = await queryLessons({ course_id });
          if (success) {
            setLessons(data);
          }
        }}
        placeholder="请选择课程"
      >
        {curCourse.map(({ course_id, course_name }) => (
          <Option value={JSON.stringify({ course_id, course_name })} key={course_id}>
            {course_name}
          </Option>
        ))}
      </Select>
      <Text>功课名称：</Text>
      <Select
        style={{ width: 150 }}
        onChange={val => {
          setLessonName(val);
        }}
        placeholder="请选择功课"
      >
        {lessons.map(({ lesson_name }) => (
          <Option value={lesson_name} key={uuid()}>
            {lesson_name}
          </Option>
        ))}
      </Select>
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
        options={{ fullScreen: false, reload: true, setting: true }}
        params={{
          keywords,
          course_name: courseName,
          lesson_name: lessonName,
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
            render: (_, { attendance_status, attendance_id }) => (
              <>
                {attendance_status === '1' ? (
                  <a
                    onClick={async () => {
                      const { success, message: msg } = await updateAtStatus({
                        attendance_id,
                        attendance_status: '0',
                      });
                      if (success) {
                        message.success(msg);
                        if (actionRef.current) {
                          actionRef.current.reload();
                        }
                      }
                    }}
                  >
                    审批
                  </a>
                ) : null}
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
    </PageHeaderWrapper>
  );
};

export default connect(({ attendanceAp: { curCourse } }) => ({
  curCourse,
}))(TableList);
