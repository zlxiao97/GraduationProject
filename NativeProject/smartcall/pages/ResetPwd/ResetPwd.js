import * as React from 'react';
import {
  Text,
  Button,
  Content,
  Form,
  Item,
  Input,
  Label,
  Toast,
} from 'native-base';
import BasicLayout from '../../components/BasicLayout';
import {reset} from './service';
import validate from '../../utils/validate';

export default class ResetPwd extends React.Component {
  static navigationOptions = {
    title: '找回密码',
  };

  state = {
    stu_phoneno: '',
    stu_pwd: '',
  };

  handlePwdChange(stu_pwd) {
    this.setState({stu_pwd});
  }

  handlePhoneChange(stu_phoneno) {
    this.setState({stu_phoneno});
  }
  handleSubmit() {
    const {navigation} = this.props;
    const {stu_pwd, stu_phoneno} = this.state;
    if (validate({stu_phoneno, stu_pwd})) {
      reset({stu_phoneno, stu_pwd})
        .then(res => {
          const {success, message} = res;
          if (success) {
            Toast.show({
              text: message,
              buttonText: 'OK',
              type: 'success',
            });
            navigation.pop();
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
            text: '网络错误，请重试',
            buttonText: 'OK',
            type: 'danger',
          });
        });
    } else {
      Toast.show({
        text: '请输入新密码',
        buttonText: 'OK',
        type: 'warning',
      });
    }
  }
  render() {
    return (
      <BasicLayout>
        <Content padder style={{marginTop: 100}}>
          <Form>
            <Item floatingLabel>
              <Label>手机号码</Label>
              <Input
                value={this.state.stu_phoneno}
                onChangeText={this.handlePhoneChange.bind(this)}
              />
            </Item>
            <Item floatingLabel>
              <Label>新密码</Label>
              <Input
                value={this.state.stu_pwd}
                onChangeText={this.handlePwdChange.bind(this)}
              />
            </Item>
          </Form>
          <Button
            full
            rounded
            danger
            style={{marginTop: 40}}
            onPress={this.handleSubmit.bind(this)}>
            <Text>完成</Text>
          </Button>
        </Content>
      </BasicLayout>
    );
  }
}
