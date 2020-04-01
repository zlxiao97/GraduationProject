import * as React from 'react';
import {Text} from 'native-base';
import BasicLayout from '../../components/BasicLayout';
export default class ResetPwd extends React.Component {
  static navigationOptions = {
    title: '考勤统计',
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
        <Text>考勤统计</Text>
      </BasicLayout>
    );
  }
}
