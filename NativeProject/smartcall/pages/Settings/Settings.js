import * as React from 'react';
import {Container, Text, Button, Content} from 'native-base';

export default class Settings extends React.Component {
  static navigationOptions = {
    title: '设置',
  };
  render() {
    const {navigation} = this.props;
    return (
      <Container>
        <Text>设置</Text>
      </Container>
    );
  }
}
