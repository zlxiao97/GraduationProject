import * as React from 'react';
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
    return <Container>{this.props.children}</Container>;
  }
}
