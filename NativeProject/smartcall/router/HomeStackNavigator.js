import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../pages/HomeScreen/HomeScreen';
import ResetPwd from '../pages/ResetPwd/ResetPwd';
import InfoCompelete from '../pages/InfoCompelete/InfoCompelete';

export default createStackNavigator(
  {
    HomeScreen,
    Reset: ResetPwd,
    Info: InfoCompelete,
  },
  {
    initialRouteName: 'HomeScreen',
    navigationOptions: ({navigation}) => ({
      tabBarVisible: false,
    }),
  },
);
