import * as React from 'react';
import {Container, Text, Button, Content} from 'native-base';
import BasicLayout from '../../components/BasicLayout';

export default class ResetPwd extends React.Component {
  static navigationOptions = {
    title: '找回密码',
  };

  state = {
    currentUser: null,
  };

  setCurrentUser(currentUser) {
    this.setState({currentUser});
  }
  render() {
    const {navigation} = this.props;
    return (
      <BasicLayout setCurrentUser={this.setCurrentUser.bind(this)}>
        <Text>找回密码</Text>
        <Button
          onPress={() => {
            navigation.pop();
          }}>
          <Text>确定</Text>
        </Button>
      </BasicLayout>
    );
  }
}
