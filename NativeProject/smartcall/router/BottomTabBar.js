import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import AtStatisticsStackNavigator from './AtStatisticsStackNavigator';
import ClassStackNavigator from './ClassStackNavigator';
import SettingStackNavigator from './SettingStackNavigator';

const RouteConfigs = {
  Home: {
    screen: HomeStackNavigator,
    navigationOptions: {
      tabBarLabel: '登录',
      tabBarButtonComponent: () => false,
      tabBarIcon: ({focused}) => {
        return <Icon name="list" />;
      },
    },
  },
  Class: {
    screen: ClassStackNavigator,
    navigationOptions: {
      tabBarLabel: '课程列表',
      tabBarIcon: ({focused}) => {
        return <Icon type="FontAwesome" name="list-ul" />;
      },
    },
  },
  At: {
    screen: AtStatisticsStackNavigator,
    navigationOptions: {
      tabBarLabel: '考勤统计',
      tabBarIcon: ({focused}) => {
        return <Icon type="Ionicons" name="ios-stats" />;
      },
    },
  },
  Settings: {
    screen: SettingStackNavigator,
    navigationOptions: {
      tabBarLabel: '设置',
      tabBarIcon: ({focused}) => {
        return <Icon type="AntDesign" name="setting" />;
      },
    },
  },
};
const TabNavigatorConfig = {
  activeTintColor: '#e91e63',
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: 'blue',
  },
  tabBarComponent: props => (
    <BottomTabBar {...props} activeTintColor="rgb(62,187,175)" />
  ),
};

export default createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

const styles = StyleSheet.create({
  BottomTabBarItem: {
    width: 30,
    height: 30,
  },
});
