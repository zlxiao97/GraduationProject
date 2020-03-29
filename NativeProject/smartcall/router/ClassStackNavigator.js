import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import ClassList from '../pages/ClassList/ClassList';
import FaceScreen from '../pages/FaceScreen/FaceScreen';

export default createStackNavigator(
  {
    Class: ClassList,
    Face: FaceScreen,
  },
  {
    initialRouteName: 'Class',
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index === 0,
    }),
  },
);
