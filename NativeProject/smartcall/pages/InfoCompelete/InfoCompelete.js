import * as React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default class InfoCompelete extends React.Component {
  static navigationOptions = {
    title: '信息完善',
  };
  render() {
    const {navigation} = this.props;
    const currentUser = this.props.navigation.state.params;
    console.log(currentUser);
    return (
      <View style={[styles.container]}>
        <Text>信息完善</Text>
        <Button
          title="首页"
          onPress={() => {
            navigation.navigate('Class');
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
