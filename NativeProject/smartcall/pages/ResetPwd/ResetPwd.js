import * as React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default class ResetPwd extends React.Component {
  static navigationOptions = {
    title: '找回密码',
  };
  render() {
    const {navigation} = this.props;
    const currentUser = this.props.navigation.state.params;
    console.log(currentUser);
    return (
      <View style={[styles.container]}>
        <Text>找回密码</Text>
        <Button
          title="确定"
          onPress={() => {
            navigation.pop();
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
