import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import HomeScreen from '../pages/HomeScreen/HomeScreen';
import FaceScreen from '../pages/FaceScreen/FaceScreen';
import AtStatistics from '../pages/AtStatistics/AtStatistics';
import ClassList from '../pages/ClassList/ClassList';
import InfoCompelete from '../pages/InfoCompelete/InfoCompelete';
import ResetPwd from '../pages/ResetPwd/ResetPwd';
import Settings from '../pages/Settings/Settings';

const RouteConfigs = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: '登录',
      tabBarIcon: ({focused}) => {
        return (
          <Image
            source={require('../res/list.png')}
            style={styles.BottomTabBarItem}></Image>
        );
      },
    },
  },
  Face: {
    screen: FaceScreen,
    navigationOptions: {
      tabBarLabel: '开始打卡',
      tabBarIcon: ({focused}) => {
        return (
          <Image
            source={require('../res/list.png')}
            style={styles.BottomTabBarItem}></Image>
        );
      },
    },
  },
  Info: {
    screen: InfoCompelete,
    navigationOptions: {
      tabBarLabel: '信息完善',
      tabBarIcon: ({focused}) => {
        return (
          <Image
            source={require('../res/list.png')}
            style={styles.BottomTabBarItem}></Image>
        );
      },
    },
  },
  Reset: {
    screen: ResetPwd,
    navigationOptions: {
      tabBarLabel: '重置密码',
      tabBarIcon: ({focused}) => {
        return (
          <Image
            source={require('../res/list.png')}
            style={styles.BottomTabBarItem}></Image>
        );
      },
    },
  },
  At: {
    screen: AtStatistics,
    navigationOptions: {
      tabBarLabel: '考勤统计',
      tabBarIcon: ({focused}) => {
        return (
          <Image
            source={require('../res/analysis.png')}
            style={styles.BottomTabBarItem}></Image>
        );
      },
    },
  },
  Class: {
    screen: ClassList,
    navigationOptions: {
      tabBarLabel: '课程列表',
      tabBarIcon: ({focused}) => {
        return (
          <Image
            source={require('../res/list.png')}
            style={styles.BottomTabBarItem}></Image>
        );
      },
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: '设置',
      tabBarIcon: ({focused}) => {
        return (
          <Image
            source={require('../res/setting.png')}
            style={styles.BottomTabBarItem}></Image>
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
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

const styles = StyleSheet.create({
  BottomTabBarItem: {
    width: 30,
    height: 30,
  },
});

export default createAppContainer(AppNavigator);
