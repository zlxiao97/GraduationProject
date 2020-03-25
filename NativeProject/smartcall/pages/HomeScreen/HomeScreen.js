import * as React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const fakeUser = {
  id: '750dc5ae-b42c-4cd2-9f79-f91889acda36',
  account: '2020822325',
  name: '测试人员4',
  system: 'student',
  stu_face_isreg: 0,
  remind_time: '5',
  stu_code: '2020822325',
  stu_img: 'faceImg-1583900351851.jpg',
  stu_phoneno: '',
  stu_school: '',
  stu_avatar: '',
};

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '首页',
  };
  render() {
    const {navigation} = this.props;
    return (
      <View style={[styles.container]}>
        <Button
          title="人脸识别"
          onPress={() => {
            navigation.navigate('Face', fakeUser);
          }}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});
