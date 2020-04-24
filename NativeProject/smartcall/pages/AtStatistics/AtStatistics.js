import * as React from 'react';
import {Content, Card, CardItem, Text, Grid} from 'native-base';
import BasicLayout from '../../components/BasicLayout';
import TableRow from './components/TableRow';
import StudentCard from './components/StudentCard';
import moment from 'moment';
import {query} from './service';
import resolve from './utils/resolve';
import normalize from './utils/normalize';

const defaultDate = {
  begin: moment()
    .startOf('month')
    .valueOf(),
  end: moment()
    .endOf('month')
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
    this.setState({currentUser});
  }

  setDate(date) {
    const begin = moment(date)
      .startOf('month')
      .valueOf();
    const end = moment(date)
      .endOf('month')
      .valueOf();
    query({stu_id: this.state.currentUser.id, begin, end}).then(
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
              ...resolve(this.state.data),
            }}
          />
          <Card>
            <CardItem>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: 'bold',
                  width: '100%',
                  textAlign: 'center',
                }}>
                缺勤记录
              </Text>
            </CardItem>
            <CardItem>
              <Grid style={{flexDirection: 'column'}}>
                <TableRow left="课程" right="时间" />
                {normalize(this.state.data).map(rows => (
                  <TableRow {...rows} />
                ))}
              </Grid>
            </CardItem>
          </Card>
        </Content>
      </BasicLayout>
    );
  }
}
