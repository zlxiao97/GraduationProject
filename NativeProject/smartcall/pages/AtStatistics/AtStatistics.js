import * as React from 'react';
import {
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Body,
  Right,
} from 'native-base';
import BasicLayout from '../../components/BasicLayout';
import StudentCard from './components/StudentCard';
import moment from 'moment';
export default class ResetPwd extends React.Component {
  static navigationOptions = {
    title: '考勤统计',
  };
  state = {
    currentUser: null,
    start: moment()
      .startOf('month')
      .valueOf(),
    end: moment()
      .startOf('month')
      .valueOf(),
  };

  setCurrentUser(currentUser) {
    console.log(currentUser);
    this.setState({currentUser});
  }

  setDate(date) {
    const start = moment(date)
      .startOf('month')
      .valueOf();
    const end = moment(date)
      .endOf('month')
      .valueOf();
    this.setState({start, end});
  }

  render() {
    const {navigation} = this.props;
    const getBg = () => {
      const bgs = ['#00B075', '#EB7F24', '#9B15A9'];
      const i = Math.floor(Math.random() * bgs.length);
      return bgs[i];
    };
    return (
      <BasicLayout setCurrentUser={this.setCurrentUser.bind(this)}>
        <Content>
          <StudentCard
            {...{
              getBg,
              currentUser: this.state.currentUser,
              onDateChange: this.setDate.bind(this),
            }}
          />
        </Content>
      </BasicLayout>
    );
  }
}
