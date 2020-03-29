import * as React from 'react';
import {Container, Toast, Text, Button, Content} from 'native-base';
import {login} from './service';
import {setToken} from '../../utils/authorized';

const fakeUser = {
  account: '2020822325',
  pwd: '123',
};

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '登录',
    headerStyle: {
      backgroundColor: '#F2F2F2',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
    };
  }

  handleLogin() {
    const {navigation} = this.props;
    login({account: fakeUser.account, pwd: fakeUser.pwd})
      .then(res => {
        const {success, token, message} = res;
        if (success) {
          setToken(token).then(() => {
            Toast.show({
              text: message,
              buttonText: 'OK',
              type: 'success',
            });
            navigation.navigate('Info', fakeUser);
          });
        } else {
          Toast.show({
            text: message,
            buttonText: 'OK',
            type: 'danger',
          });
        }
      })
      .catch(() => {
        Toast.show({
          text: '登录失败请重试',
          buttonText: 'OK',
          type: 'danger',
        });
      });
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Button
            style={{width: 120, marginVertical: 10}}
            onPress={this.handleLogin.bind(this)}>
            <Text>登录</Text>
          </Button>
          <Button
            style={{width: 120, marginVertical: 10}}
            onPress={() => {
              const {navigation} = this.props;
              navigation.navigate('Reset', fakeUser);
            }}>
            <Text>找回密码</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
