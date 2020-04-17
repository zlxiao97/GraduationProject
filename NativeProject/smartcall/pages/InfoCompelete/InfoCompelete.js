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
import {update} from './service';
import validate from '../../utils/validate';

export default class InfoCompelete extends React.Component {
  static navigationOptions = {
    title: '信息完善',
  };
  state = {
    currentUser: null,
    stu_name: '',
    stu_school: '',
    stu_phoneno: '',
  };

  setCurrentUser(currentUser) {
    const {stu_school, name, stu_phoneno} = currentUser;
    if (stu_school && name && stu_phoneno) {
      this.props.navigation.navigate('Class');
    }
    this.setState({currentUser, stu_name: name, stu_school, stu_phoneno});
  }

  handleNameChange(stu_name) {
    this.setState({stu_name});
  }

  handleSchoolChange(stu_school) {
    this.setState({stu_school});
  }

  handlePhoneChange(stu_phoneno) {
    this.setState({stu_phoneno});
  }

  handleSubmit() {
    const {navigation} = this.props;
    const {stu_name, stu_school, stu_phoneno} = this.state;
    const stu_id = this.state.currentUser.id;
    if (validate({stu_id, stu_name, stu_school, stu_phoneno})) {
      update({stu_id, stu_name, stu_school, stu_phoneno})
        .then(res => {
          const {success, message} = res;
          if (success) {
            Toast.show({
              text: message,
              buttonText: 'OK',
              type: 'success',
            });
            navigation.navigate('Class');
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
        text: '请输入完整的信息',
        buttonText: 'OK',
        type: 'warning',
      });
    }
  }
  render() {
    return (
      <BasicLayout setCurrentUser={this.setCurrentUser.bind(this)}>
        <Content padder style={{marginTop: 100}}>
          <Form>
            <Item floatingLabel>
              <Label>学校名称</Label>
              <Input
                value={this.state.stu_school}
                onChangeText={this.handleSchoolChange.bind(this)}
              />
            </Item>
            <Item floatingLabel>
              <Label>姓名</Label>
              <Input
                value={this.state.stu_name}
                onChangeText={this.handleNameChange.bind(this)}
              />
            </Item>
            <Item floatingLabel last>
              <Label>手机号码</Label>
              <Input
                value={this.state.stu_phoneno}
                onChangeText={this.handlePhoneChange.bind(this)}
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
