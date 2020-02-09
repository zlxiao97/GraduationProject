/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  NativeModules,
  NativeEventEmitter,
  Image,
  Button,
  FlatList
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { regFace } from "./api/api.js";


const FaceView = NativeModules.PushFaceViewControllerModule;
const FaceCheckHelper = Platform.select({
  android: ()=> FaceView
});
const NativeModule  = new NativeEventEmitter(FaceCheckHelper);
const ImgType = 'BASE64';
const configObj = {
  'quality': {
    minFaceSize: 120,
    blurThreshold: 0.7,
    isCheckQuality: false
  },
  'liveActionArray': [
    0,//眨眨眼
    1,//张张嘴
    // 2,//向右摇头
    // 3,//向左摇头
    // 4,//抬头
    // 5,//低头
    // 6//摇头
  ],
  // "order": true,
  "sound": true
}

export default class App extends Component{

  state = {
    images: [],
    bestImage: ''
  };

  componentDidMount(){
    NativeModule.addListener('FaceCheckHelper',(data)=>this.faceCheckCallback(data));
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

  faceCheckCallback(data){
    if(data.remindCode == 0){
      let imgs = Object.keys(data.images).map((k,idx)=>{
        return (
          <View key={idx} style={styles.item}>
            <Image
              style={styles.image}
              source={{uri: `data:image/jpg;base64,${data.images[k]}`}} />
            <Text>{k}</Text>
          </View>
        );
      });
      let bestImage = data.images["bestImage"];
      regFace(bestImage,ImgType,'test2','user1',{name:'tadxiao'}).then(data=>{
        console.log(data);;
      }).catch(err=>{
        console.log(err);
      });
      this.setState({
        images: imgs,
        bestImage
      });
    }else if(data.remindCode == 36){
      alert('采集超时！');
    }else{
      alert('采集失败！');
    }
  }

  _onPressCollection(){
    FaceView.openPushFaceViewController(configObj);
  }

  render(){
      return (
        <View style={[styles.body,styles.container,styles.centerM]}>
          <Button onPress={this._onPressCollection.bind(this)} title="开始采集"></Button>
          <FlatList data={this.state.images} renderItem={({item})=>item}></FlatList>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  container: {
    marginTop: 60,
    flex: 1
  },
  item: {
    margin: 50
  },
  image: {
    width: 180,
    height: 320,
    backgroundColor: 'red'
  },
  centerM: {
    justifyContent: 'center'
  }
});