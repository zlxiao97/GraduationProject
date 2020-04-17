import * as React from 'react';
import BasicLayout from '../../components/BasicLayout';
import moment from 'moment';
import {Content, Spinner} from 'native-base';
import _ from 'lodash';
import {Agenda} from 'react-native-calendars';
import {query} from './service';
import ClassCard from './components/ClassCard';
import EmptyCard from './components/EmptyCard';

export default class ClassList extends React.Component {
  static navigationOptions = {
    title: '课程列表',
  };

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      items: {},
      data: [],
    };
  }

  _queryData() {
    const currentUser = this.state.currentUser;
    query({stu_id: currentUser.id}).then(({data}) => {
      this.setState({
        data,
      });
    });
  }

  setCurrentUser(currentUser) {
    this.setState({currentUser}, this._queryData.bind(this));
  }

  render() {
    return (
      <BasicLayout setCurrentUser={this.setCurrentUser.bind(this)}>
        {this.state.data && this.state.data.length > 0 ? (
          <Agenda
            items={this.state.items}
            loadItemsForMonth={_.debounce(this.loadItems.bind(this), 600, {
              leading: true,
              trailing: false,
            })}
            selected={moment()
              .subtract(1, 'days')
              .format('YYYY-MM-DD')}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
          />
        ) : (
          <Content padder>
            <Spinner color="#9B15A9" />
          </Content>
        )}
      </BasicLayout>
    );
  }

  loadItems(day) {
    const items = this.state.items;
    const {timestamp} = day;
    for (let i = -15; i < 85; i++) {
      let time;
      if (i >= 0) time = moment(timestamp).add(i, 'days');
      if (i < 0) time = moment(timestamp).subtract(Math.abs(i), 'days');
      const strTime = time.format('YYYY-MM-DD');
      const data = this.state.data.filter(
        ({start_time}) =>
          moment(start_time)
            .startOf('day')
            .valueOf() === time.startOf('day').valueOf(),
      );
      if (!items[strTime]) {
        items[strTime] = [];
      }
      items[strTime] = data.map(item => {
        const {course_name, lesson_name, start_time, end_time} = item;
        return {
          ...item,
          name: course_name,
          subname: lesson_name,
          timerange: `${moment(start_time).format('HH:mm')} - ${moment(
            end_time,
          ).format('HH:mm')}`,
        };
      });
    }
    this.setState({
      items: {...items},
    });
  }

  renderItem(item) {
    const {navigation} = this.props;
    const getBg = () => {
      const bgs = ['#00B075', '#EB7F24', '#9B15A9'];
      const i = Math.floor(Math.random() * bgs.length);
      return bgs[i];
    };
    return (
      <Content padder>
        <ClassCard navigation={navigation} getBg={getBg} item={item} />
      </Content>
    );
  }

  renderEmptyDate() {
    return (
      <Content padder>
        <EmptyCard />
      </Content>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.lesson_id !== r2.lesson_id;
  }
}
