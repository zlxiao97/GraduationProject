import * as React from 'react';
import {Container, Text, Button, Content, Icon} from 'native-base';

export default class Settings extends React.Component {
  static navigationOptions = {
    title: '设置',
  };
  render() {
    const {navigation} = this.props;
    return (
      <Container>
        <Content>
          <Icon name="home" />
          <Icon
            ios="ios-menu"
            android="md-menu"
            style={{fontSize: 20, color: 'red'}}
          />
          <Icon type="FontAwesome" name="home" />
        </Content>
      </Container>
    );
  }
}
