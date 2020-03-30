import * as React from 'react';
import {Container, Text, Button} from 'native-base';

export default class ResetPwd extends React.Component {
  static navigationOptions = {
    title: '考勤统计',
  };
  render() {
    const {navigation} = this.props;
    const currentUser = this.props.navigation.state.params;
    console.log(currentUser);
    return (
      <Container>
        <Text>考勤统计</Text>
      </Container>
    );
  }
}
