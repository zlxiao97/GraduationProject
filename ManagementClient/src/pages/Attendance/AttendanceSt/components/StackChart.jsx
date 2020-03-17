import React from 'react';
import styles from './index.less';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';

const StackChart = ({ data }) => {
  const ds = new DataSet();
  const dv = ds
    .createView()
    .source(data)
    .transform({
      type: 'percent',
      field: 'count',
      dimension: 'status',
      groupBy: ['lesson_name'],
      as: 'percent',
    });
  const cols = {
    percent: {
      min: 0,
      formatter(val) {
        return (val * 100).toFixed(2) + '%';
      },
    },
  };
  return (
    <Chart data={dv} scale={cols} width={600} height={400} forceFit placeholder>
      <Legend />
      <Axis name="lesson_name" />
      <Axis name="percent" />
      <Tooltip />
      <Geom type="intervalStack" position="lesson_name*percent" color={'status'} />
    </Chart>
  );
};
export default StackChart;
