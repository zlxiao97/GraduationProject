import * as React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Container} from 'native-base';
import currentUser from '../model/currentUser';

export default class BasicLayout extends React.Component {
  state = {
    currentUser: null,
  };
  componentDidMount() {
    currentUser().then(res => {
      const {success, data: currentUser} = res;
      const {setCurrentUser} = this.props;
      if (success) {
        setCurrentUser && setCurrentUser(currentUser);
      } else {
        this.props.navigation.navigate('Home');
      }
    });
  }
  render() {
    return (
      <ImageBackground
        style={{flex: 1}}
        source={require('../res/background.jpg')}>
        <Container style={styles.backgroundImage}>
          {this.props.children}
        </Container>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
