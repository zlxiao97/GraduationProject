import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Settings from '../pages/Settings/Settings';

export default createStackNavigator(
  {
    Settings: Settings,
  },
  {
    initialRouteName: 'Settings',
    navigationOptions: ({navigation}) => ({
      tabBarVisible: true,
    }),
  },
);
