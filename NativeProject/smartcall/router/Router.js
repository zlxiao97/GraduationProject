import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../pages/HomeScreen/HomeScreen';
import FaceScreen from '../pages/FaceScreen/FaceScreen';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Face: FaceScreen,
});

export default createAppContainer(AppNavigator);
