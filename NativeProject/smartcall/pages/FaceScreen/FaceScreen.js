import React, {Component} from 'react';
import {
  Platform,
  NativeModules,
  NativeEventEmitter,
  PermissionsAndroid,
} from 'react-native';
import BasicLayout from '../../components/BasicLayout';
import {
  Text,
  Button,
  Content,
  Toast,
  List,
  ListItem,
  Body,
  Icon,
} from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import {searchByFace} from './service';
import config from './config/config.js';
import getDistance from '../../utils/getDistance';
import moment from 'moment';

const FaceView = NativeModules.PushFaceViewControllerModule;
const FaceCheckHelper = Platform.select({
  android: () => FaceView,
});
const NativeModule = new NativeEventEmitter(FaceCheckHelper);

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'This App needs access to your location ' +
          'so we can know where you are.',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      throw new Error('定位权限请求失败');
    }
  } catch (err) {
    console.warn(err);
  }
}

export default class FaceScreen extends Component {
  static navigationOptions = {
    title: '开始打卡',
  };
  watchID = 0;
  state = {
    currentUser: null,
    isInRange: false,
    isInTime: false,
    curLng: 'unknown',
    curLat: 'unknown',
    name: '',
    distance: 0,
    isCanCompare: false,
  };

  setCurrentUser(currentUser) {
    this.setState({currentUser});
  }

  getPosition({lat, lng, range_radius, start_time, end_time}) {
    requestLocationPermission()
      .then(() => {
        Geolocation.getCurrentPosition(
          position => {
            const {
              coords: {longitude, latitude},
            } = position;
            const distance = getDistance(lat, lng, latitude, longitude);
            const isInTime = moment().isBetween(start_time, end_time);
            this.setState({
              curLng: longitude,
              curLat: latitude,
              isInTime,
              isInRange: distance <= range_radius ? true : false,
              distance,
            });
          },
          error => {
            Toast.show({
              text: '请检查您的手机是否打开了位置信息按钮',
              buttonText: 'OK',
              type: 'danger',
              duration: 5000,
            });
          },
          {enableHighAccuracy: true, timeout: 2000},
        );
        this.watchID = Geolocation.watchPosition(position => {
          const {
            coords: {longitude, latitude},
          } = position;
          const distance = getDistance(lat, lng, latitude, longitude);
          const isInTime = moment().isBetween(start_time, end_time);
          this.setState({
            curLng: longitude,
            curLat: latitude,
            isInTime,
            isInRange: distance <= range_radius ? true : false,
            distance,
          });
        });
      })
      .catch(err => {
        Toast.show({
          text: err,
          buttonText: 'OK',
          type: 'danger',
        });
      });
  }

  componentDidMount() {
    const data = this.props.navigation.state.params.data;
    NativeModule.addListener('FaceCheckHelper', data =>
      this.faceCheckCallback(data),
    );
    this.getPosition(data);
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }
  /* 
      Object.keys(data.images)
        liveEye: 眨眼
        liveMouth: 张嘴
        yawLeft: 向左摇头
        yawRight: 向右摇头
        pitchUp: 抬头
        pitchDown: 低头
        liveYaw: 摇头
        bestImage: 最佳识别
    */
  faceCheckCallback(data) {
    if (data.remindCode == 0) {
      const bestImage = data.images['bestImage'];
      if (bestImage) {
        if (this.state.isCanCompare) {
          this._afterCollectImage(bestImage);
        }
        this.setState({
          isCanCompare: false,
        });
      }
    } else if (data.remindCode == 36) {
      Toast.show({
        text: '采集超时！',
        buttonText: 'OK',
        type: 'danger',
      });
    } else {
      Toast.show({
        text: '采集失败！',
        buttonText: 'OK',
        type: 'danger',
      });
    }
  }

  _afterCollectImage(bestImage) {
    const {lesson_id} = this.props.navigation.state.params.data;
    searchByFace({
      stu_id: this.state.currentUser.id,
      imgUrl: bestImage,
      lesson_id,
      attendance_time: moment().valueOf(),
      attendance_lat: this.state.curLat,
      attendance_lng: this.state.curLng,
    })
      .then(({success, message}) => {
        Toast.show({
          text: message,
          buttonText: 'OK',
          type: success ? 'success' : 'danger',
        });
        if (success) {
          this.props.navigation.pop();
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  _onPressMatch() {
    const {configObj} = config;
    if (!true) {
      Toast.show({
        text: '请进入打卡范围后再进行打卡',
        buttonText: 'OK',
        type: 'danger',
      });
      return false;
    }
    if (!true) {
      Toast.show({
        text: '请进入打卡时间后再进行打卡',
        buttonText: 'OK',
        type: 'danger',
      });
      return false;
    }
    this.setState({
      isCanCompare: true,
    });
    FaceView.openPushFaceViewController(configObj);
  }

  render() {
    const data = this.props.navigation.state.params.data;
    return (
      <BasicLayout setCurrentUser={this.setCurrentUser.bind(this)}>
        <Content padder>
          <List
            style={{
              backgroundColor: '#f5f5f5',
            }}>
            {this.state.isInRange ? (
              <ListItem>
                <Body>
                  <Text>考勤范围：在范围内</Text>
                </Body>
                <Icon
                  style={{color: 'green'}}
                  type="AntDesign"
                  name="checkcircleo"
                />
              </ListItem>
            ) : (
              <ListItem>
                <Body>
                  <Text>
                    距离考勤范围还差：
                    <Text style={{color: 'red'}}>
                      {this.state.distance !== 0
                        ? Math.round(this.state.distance - data.range_radius)
                        : '∞'}
                    </Text>
                    米
                  </Text>
                </Body>
                <Icon
                  style={{color: 'red'}}
                  type="AntDesign"
                  name="closecircleo"
                />
              </ListItem>
            )}
            {this.state.isInTime ? (
              <ListItem>
                <Body>
                  <Text>考勤时间段：在时间段内</Text>
                </Body>
                <Icon
                  style={{color: 'green'}}
                  type="AntDesign"
                  name="checkcircleo"
                />
              </ListItem>
            ) : (
              <ListItem>
                <Body>
                  <Text>
                    考勤时间段：<Text style={{color: 'red'}}>不在时间段内</Text>
                  </Text>
                </Body>
                <Icon
                  style={{color: 'red'}}
                  type="AntDesign"
                  name="closecircleo"
                />
              </ListItem>
            )}
            <Button
              style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              onPress={this._onPressMatch.bind(this)}>
              <Text>开始打卡</Text>
            </Button>
          </List>
        </Content>
      </BasicLayout>
    );
  }
}
