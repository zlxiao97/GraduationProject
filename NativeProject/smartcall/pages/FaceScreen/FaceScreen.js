import React, {Component} from 'react';
import {Platform, NativeModules, NativeEventEmitter} from 'react-native';
import BasicLayout from '../../components/BasicLayout';
import {
  Text,
  Button,
  Content,
  Toast,
  List,
  ListItem,
  CheckBox,
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
    images: [],
    name: '',
    distance: 0,
  };

  setCurrentUser(currentUser) {
    this.setState({currentUser});
  }

  getPosition({lat, lng, range_radius, start_time, end_time}) {
    Geolocation.getCurrentPosition(
      position => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      error => {
        Toast.show({
          text: error.message,
          buttonText: 'OK',
          type: 'danger',
        });
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
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
      let bestImage = data.images['bestImage'];
      this._afterCollectImage(bestImage);
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
    searchByFace({stu_id: this.state.currentUser.id, imgUrl: bestImage})
      .then(({success, message}) => {
        Toast.show({
          text: message,
          buttonText: 'OK',
          type: success ? 'success' : 'danger',
        });
        if (success) {
          this.navigation.pop();
        }
      })
      .catch(err => {
        console.log(err);
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
                      {Math.round(this.state.distance - data.range_radius)}
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
