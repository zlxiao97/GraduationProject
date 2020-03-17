import { Select, Typography, Card } from 'antd';
import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { queryAttendanceRate } from './service';
import SliderChart from './components/SliderChart';
import StackChart from './components/StackChart';
import getSliderChartData from './utils/getSliderChartData';
import getStackChartData from './utils/getStackChartData';
import styles from './index.less';
const { Option } = Select;
const { Text } = Typography;

let localAction = null;

const TableList = ({ curCourse }) => {
  const [chartData, setChartData] = useState([]);

  const headerContent = (
    <div className="headerContent-wrapper">
      <Text>课程名称：</Text>
      <Select
        style={{ width: 150 }}
        onChange={async course_name => {
          const { data, success } = await queryAttendanceRate({ course_name });
          if (success) {
            setChartData(data);
          }
        }}
        placeholder="请选择课程"
      >
        {curCourse.map(({ course_id, course_name }) => (
          <Option value={course_name} key={course_name}>
            {course_name}
          </Option>
        ))}
      </Select>
    </div>
  );
  return (
    <PageHeaderWrapper content={headerContent}>
      <div className={styles.chartContainer}>
        <Card bordered={false}>
          <SliderChart data={getSliderChartData(chartData)} />
        </Card>
        <Card bordered={false}>
          <StackChart data={getStackChartData(chartData)} />
        </Card>
      </div>
    </PageHeaderWrapper>
  );
};

export default connect(({ attendanceSt: { curCourse } }) => ({
  curCourse,
}))(TableList);
