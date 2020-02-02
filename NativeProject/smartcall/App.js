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
  Button
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const FaceView = NativeModules.PushFaceViewControllerModule;
const FaceCheckHelper = Platform.select({
  android: ()=> FaceView
});
const NativeModule  = new NativeEventEmitter(FaceCheckHelper);
const configObj = {
  // 'liveActionArray': [
  //   0,//眨眨眼
  //   1,//张张嘴
  //   2,//向右摇头
  //   3,//向左摇头
  //   4,//抬头
  //   5,//低头
  //   6//摇头
  // ],
  // "order": true,
  "sound": true
}

export default class App extends Component{

  state = {
    images: []
  };

  componentDidMount(){
    NativeModule.addListener('FaceCheckHelper',(data)=>this.faceCheckCallback(data));
  }

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
      this.setState({
        images: imgs
      });
    }else if(data.remindCode == 36){
      alert('采集超时！');
    }else{
      alert('采集失败！');
    }
  }

  _onPressCollection(){
    FaceView.faceDetectExp(configObj);
  }

  render(){
      return (
        <View style={[styles.body,styles.container,styles.centerM]}>
          <Button onPress={this._onPressCollection.bind(this)} title="开始采集"></Button>
          {this.state.images}
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