import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import AtStatistics from '../pages/AtStatistics/AtStatistics';

export default createStackNavigator(
  {
    At: AtStatistics,
  },
  {
    initialRouteName: 'At',
    navigationOptions: ({navigation}) => ({
      tabBarVisible: true,
    }),
  },
);
