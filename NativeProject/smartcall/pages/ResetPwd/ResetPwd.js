import * as React from 'react';
import {Container, Text, Button, Content} from 'native-base';

export default class ResetPwd extends React.Component {
  static navigationOptions = {
    title: '找回密码',
  };
  render() {
    const {navigation} = this.props;
    const currentUser = this.props.navigation.state.params;
    console.log(currentUser);
    return (
      <Container>
        <Text>找回密码</Text>
        <Button
          onPress={() => {
            navigation.pop();
          }}>
          <Text>确定</Text>
        </Button>
      </Container>
    );
  }
}
