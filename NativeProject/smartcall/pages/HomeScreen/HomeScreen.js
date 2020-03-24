import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default () => {
  return (
    <View style={[styles.container]}>
      <Text>Home Screen1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});
