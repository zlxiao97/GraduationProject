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

const SliderChart = ({ data }) => {
  return (
    <Chart data={data} width={600} height={400} forceFit placeholder>
      <Geom type="intervalStack" position="count" color="name"></Geom>
      <Legend />
      <Tooltip showTitle={false} />
      <Coord type="theta" />
    </Chart>
  );
};
export default SliderChart;
