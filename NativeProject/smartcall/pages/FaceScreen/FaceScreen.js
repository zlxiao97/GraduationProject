import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  NativeModules,
  NativeEventEmitter,
  Image,
  TouchableHighlight,
  FlatList,
  TextInput,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {regFace, searchByFace} from './service';
import {validateName} from '../../utils/validate.js';
import config from './config/config.js';

const FaceView = NativeModules.PushFaceViewControllerModule;
const FaceCheckHelper = Platform.select({
  android: () => FaceView,
});
const NativeModule = new NativeEventEmitter(FaceCheckHelper);

export default class FaceScreen extends Component {
  static navigationOptions = {
    title: '开始打卡',
  };
  state = {
    images: [],
    name: '',
    mode: 0, //0：人脸采集模式，1: 人脸识别模式
  };

  componentDidMount() {
    NativeModule.addListener('FaceCheckHelper', data =>
      this.faceCheckCallback(data),
    );
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
          <View key={idx} style={styles.item}>
            <Image
              style={styles.image}
              source={{uri: `data:image/jpg;base64,${data.images[k]}`}}
            />
            <Text>{k}</Text>
          </View>
        );
      });
      let bestImage = data.images['bestImage'];
      this._afterCollectImage(bestImage);
      this.setState({
        images: imgs,
      });
    } else if (data.remindCode == 36) {
      alert('采集超时！');
    } else {
      alert('采集失败！');
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
            alert('人脸注册成功');
          } else {
            alert('人脸注册失败');
            console.log(data);
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
      alert(`请输入您的姓名（由字母、数字、下划线组成）`);
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
      alert(`请输入您的姓名（由字母、数字、下划线组成）`);
    }
  }

  render() {
    const currentUser = this.props.navigation.state.params;
    console.log(currentUser);
    return (
      <View style={[styles.body, styles.container, styles.centerM]}>
        <TextInput
          style={[styles.input]}
          placeholder="请输入您的姓名："
          value={this.state.name}
          onChangeText={name => this.setState({name})}></TextInput>
        <TouchableHighlight onPress={this._onPressCollection.bind(this)}>
          <Text style={styles.button}>人脸采集</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressRecognize.bind(this)}>
          <Text style={styles.button}>人脸识别</Text>
        </TouchableHighlight>
        <FlatList
          style={styles.flex5}
          data={this.state.images}
          renderItem={({item}) => item}></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  container: {
    marginTop: 60,
    flex: 1,
  },
  item: {
    margin: 50,
  },
  image: {
    width: 180,
    height: 320,
    backgroundColor: 'red',
  },
  centerM: {
    justifyContent: 'center',
  },
  input: {
    height: 40,
    marginVertical: 40,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    backgroundColor: 'teal',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
