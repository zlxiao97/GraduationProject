import * as React from 'react';
import {Container, Text, Button, Content} from 'native-base';

export default class Settings extends React.Component {
  static navigationOptions = {
    title: '设置',
  };
  render() {
    const {navigation} = this.props;
    const currentUser = this.props.navigation.state.params;
    console.log(currentUser);
    return (
      <Container>
        <Text>设置</Text>
      </Container>
    );
  }
}
