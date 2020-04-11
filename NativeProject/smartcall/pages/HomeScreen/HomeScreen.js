import * as React from 'react';
import {
  Container,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem,
  Toast,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import BasicLayout from '../../components/BasicLayout';
import Logo from '../../components/Logo';
import {login} from './service';
import {setToken} from '../../utils/authorized';
import validate from '../../utils/validate';

//TODO：remove
const fakeUser = {
  account: '2020822325',
  pwd: '123',
};

const LogoTitle = ({title}) => {
  return (
    <Content
      padder
      contentContainerStyle={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Logo width={60} height={44} />
      <Text
        style={{
          fontSize: 33,
          fontWeight: 'bold',
          fontFamily: 'Avenir,Helvetica Neue,Arial,Helvetica,sans-serif',
        }}>
        {title}
      </Text>
    </Content>
  );
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
      currentUser: null,
      account: '',
      pwd: '',
    };
  }

  setCurrentUser(currentUser) {
    this.setState({currentUser});
  }

  handleAccountChange(account) {
    this.setState({account});
  }

  handlePwdChange(pwd) {
    this.setState({pwd});
  }

  handleLogin() {
    const {navigation} = this.props;
    const {account, pwd} = this.state;
    if (validate({account, pwd})) {
      login({account, pwd})
        .then(res => {
          const {success, token, message} = res;
          if (success) {
            setToken(token).then(() => {
              Toast.show({
                text: message,
                buttonText: 'OK',
                type: 'success',
              });
              navigation.navigate('Info');
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
    } else {
      Toast.show({
        text: '请输入学号和密码',
        buttonText: 'OK',
        type: 'warning',
      });
    }
  }

  render() {
    return (
      <BasicLayout setCurrentUser={this.setCurrentUser.bind(this)}>
        <Content padder style={{paddingHorizontal: 20, paddingTop: '10%'}}>
          <LogoTitle style={{width: '100%'}} title={'Smart Call Mobile'} />
          <Form>
            <Item floatingLabel>
              <Label>学号</Label>
              <Input
                value={this.state.account}
                onChangeText={this.handleAccountChange.bind(this)}
              />
            </Item>
            <Item floatingLabel last>
              <Label>密码</Label>
              <Input
                secureTextEntry={true}
                value={this.state.pwd}
                onChangeText={this.handlePwdChange.bind(this)}
              />
            </Item>
          </Form>
          <Button
            full
            rounded
            danger
            style={{marginTop: 40}}
            onPress={this.handleLogin.bind(this)}>
            <Text>登录</Text>
          </Button>
          <Content
            padder
            contentContainerStyle={{
              alignItems: 'flex-end',
            }}>
            <Button
              transparent
              small
              onPress={() => {
                const {navigation} = this.props;
                navigation.navigate('Reset');
              }}>
              <Text>找回密码</Text>
            </Button>
          </Content>
        </Content>
      </BasicLayout>
    );
  }
}
