import React, {Component} from 'react';
import {Platform, NativeModules, NativeEventEmitter} from 'react-native';
import BasicLayout from '../../components/BasicLayout';
import {
  Text,
  Button,
  Content,
  List,
  ListItem,
  Image,
  Toast,
} from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import {regFace, searchByFace} from './service';
import {validateName} from '../../utils/validate.js';
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
    mode: 0, //0：人脸采集模式，1: 人脸识别模式
  };

  setCurrentUser(currentUser) {
    this.setState({currentUser});
  }

  componentDidMount() {
    const data = this.props.navigation.state.params.data;
    const {lat, lng, range_radius, start_time, end_time} = data;
    NativeModule.addListener('FaceCheckHelper', data =>
      this.faceCheckCallback(data),
    );
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
      if (distance <= range_radius) {
        this.setState({
          curLng: longitude,
          curLat: latitude,
          isInTime,
          isInRange: true,
        });
      } else {
        this.setState({
          curLng: longitude,
          curLat: latitude,
          isInTime,
          isInRange: false,
        });
      }
    });
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
      let imgs = Object.keys(data.images).map((k, idx) => {
        return (
          <Content key={idx}>
            <Image source={{uri: `data:image/jpg;base64,${data.images[k]}`}} />
            <Text>{k}</Text>
          </Content>
        );
      });
      let bestImage = data.images['bestImage'];
      this._afterCollectImage(bestImage);
      this.setState({
        images: imgs,
      });
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
    const {ImgType, Group} = config;
    if (this.state.mode == 0) {
      regFace(bestImage, ImgType, Group, this.state.name, {
        name: this.state.name,
      })
        .then(data => {
          if (data.error_code == 0) {
            Toast.show({
              text: '人脸注册成功',
              buttonText: 'OK',
              type: 'success',
            });
          } else {
            Toast.show({
              text: '人脸注册失败',
              buttonText: 'OK',
              type: 'danger',
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else if (this.state.mode == 1) {
      searchByFace(bestImage, ImgType, Group)
        .then(data => {
          if (data.error_code == 0) {
            let recSuccess = false;
            let faceList = data.result.user_list;
            let successFaces = faceList
              .map(ele => {
                return {
                  ...ele,
                  user_info: JSON.parse(ele.user_info),
                };
              })
              .filter(ele => {
                return ele.score > 80 && ele.user_info.name == this.state.name;
              });
            recSuccess = successFaces.length > 0 ? true : false;
            if (recSuccess) {
              alert(`Welcome ${successFaces[0].user_info.name}！`);
            } else {
              alert('没有识别出您的信息，请确认您的人脸已被采集');
            }
          } else {
            alert('人脸识别失败');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  _onPressCollection() {
    const {configObj} = config;
    if (this.state.name && validateName(this.state.name)) {
      this.setState({
        mode: 0,
      });
      FaceView.openPushFaceViewController(configObj);
    } else {
      Toast.show({
        text: '请输入您的姓名（由字母、数字、下划线组成）',
        buttonText: 'OK',
        type: 'warning',
      });
    }
  }

  _onPressRecognize() {
    const {configObj} = config;
    if (this.state.name && validateName(this.state.name)) {
      this.setState({
        mode: 1,
      });
      FaceView.openPushFaceViewController(configObj);
    } else {
      Toast.show({
        text: '请输入您的姓名（由字母、数字、下划线组成）',
        buttonText: 'OK',
        type: 'warning',
      });
    }
  }

  render() {
    const data = this.props.navigation.state.params.data;
    return (
      <BasicLayout setCurrentUser={this.setCurrentUser.bind(this)}>
        <Content padder>
          <Content padder>
            <Text>
              考勤地点：（{data.lat}，{data.lng}）
            </Text>
            <Text>范围：{data.range_radius}</Text>
          </Content>
          <Content>
            <Text>
              <Text>当前位置: </Text>({this.state.curLat},{this.state.curLng})
            </Text>
          </Content>
          <Text>是否在考勤范围内：{this.state.isInRange ? '是' : '否'}</Text>
          <Text>是否在考勤时间段：{this.state.isInTime ? '是' : '否'}</Text>
          <Text></Text>
          <Button onPress={this._onPressCollection.bind(this)}>
            <Text>人脸采集</Text>
          </Button>
          <Button onPress={this._onPressRecognize.bind(this)}>
            <Text>人脸识别</Text>
          </Button>
          <List>
            {this.state.images.map(item => (
              <ListItem>{item}</ListItem>
            ))}
          </List>
        </Content>
      </BasicLayout>
    );
  }
}
