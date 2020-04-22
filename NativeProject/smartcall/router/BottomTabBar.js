import React from 'react';
import {StyleSheet} from 'react-native';
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
        return focused ? (
          <Icon name="list" style={{color: '#00BFA0'}} />
        ) : (
          <Icon name="list" style={{color: '#8c8c8c'}} />
        );
      },
    },
  },
  Class: {
    screen: ClassStackNavigator,
    navigationOptions: {
      tabBarLabel: '课程列表',
      tabBarIcon: ({focused}) => {
        return focused ? (
          <Icon type="FontAwesome" name="list-ul" style={{color: '#00BFA0'}} />
        ) : (
          <Icon type="FontAwesome" name="list-ul" style={{color: '#8c8c8c'}} />
        );
      },
    },
  },
  At: {
    screen: AtStatisticsStackNavigator,
    navigationOptions: {
      tabBarLabel: '考勤统计',
      tabBarIcon: ({focused}) => {
        return focused ? (
          <Icon type="Ionicons" name="ios-stats" style={{color: '#00BFA0'}} />
        ) : (
          <Icon type="Ionicons" name="ios-stats" style={{color: '#8c8c8c'}} />
        );
      },
    },
  },
  Settings: {
    screen: SettingStackNavigator,
    navigationOptions: {
      tabBarLabel: '设置',
      tabBarIcon: ({focused}) => {
        return focused ? (
          <Icon type="AntDesign" name="setting" style={{color: '#00BFA0'}} />
        ) : (
          <Icon type="AntDesign" name="setting" style={{color: '#8c8c8c'}} />
        );
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
