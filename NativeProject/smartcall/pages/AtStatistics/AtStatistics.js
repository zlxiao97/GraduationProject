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
import {query} from './service';

const defaultDate = {
  begin: moment()
    .startOf('month')
    .valueOf(),
  end: moment()
    .startOf('month')
    .valueOf(),
};
export default class ResetPwd extends React.Component {
  static navigationOptions = {
    title: '考勤统计',
  };
  state = {
    currentUser: null,
    data: [],
  };

  setCurrentUser(currentUser) {
    const {begin, end} = defaultDate;
    query({stu_id: currentUser.id, begin, end}).then(({success, data}) => {
      if (success) {
        this.setState({data});
      }
    });
    console.log(currentUser);
    this.setState({currentUser});
  }

  setDate(date) {
    const begin = moment(date)
      .startOf('month')
      .valueOf();
    const end = moment(date)
      .endOf('month')
      .valueOf();
    query({stu_id: this.state.MathcurrentUser.id, begin, end}).then(
      ({success, data}) => {
        if (success) {
          this.setState({data});
        }
      },
    );
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
