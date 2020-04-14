import * as React from 'react';
import {StyleSheet} from 'react-native';
import BasicLayout from '../../components/BasicLayout';
import moment from 'moment';
import {
  Container,
  Text,
  Content,
  Card,
  CardItem,
  Body,
  Spinner,
  Icon,
  Right,
  Left,
} from 'native-base';
import TextAvatar from 'react-native-text-avatar';
import {Agenda} from 'react-native-calendars';
import {query, currentUser} from './service';

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
      /**
       * items={{
          '2012-05-22': [{name: 'item 1 - any js object'}],
          '2012-05-23': [{name: 'item 2 - any js object', height: 80}],
          '2012-05-24': [],
          '2012-05-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
        }}
       */
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
            loadItemsForMonth={this.loadItems.bind(this)}
            selected={moment()
              .subtract(1, 'days')
              .format('YYYY-MM-DD')}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            // 日历标注
            // markedDates={{
            //    '2017-05-08': {textColor: '#43515c'},s
            //    '2017-05-09': {textColor: '#43515c'},
            //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
            //    '2017-05-21': {startingDay: true, color: 'blue'},
            //    '2017-05-22': {endingDay: true, color: 'gray'},
            //    '2017-05-24': {startingDay: true, color: 'gray'},
            //    '2017-05-25': {color: 'gray'},
            //    '2017-05-26': {endingDay: true, color: 'gray'}}}
            // 议程主题样式
            /**
           *  theme={{
              ...calendarTheme,
              agendaDayTextColor: 'yellow',日期文本样色
              agendaDayNumColor: 'green',日期数字颜色
              agendaTodayColor: 'red',选中日的标注颜色
            }}
           */
            // 日期小圆圈渲染函数
            // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
            // 日历：不要在当前月日历中显示其他月份的days
            // hideExtraDays={false}
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
    const {dateString, day: date, month, year, timestamp} = day;
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
      console.log(bgs[i]);
      return bgs[i];
    };
    return (
      <Content padder>
        <Card>
          <CardItem
            header
            button
            onPress={() => {
              navigation.navigate('Face', {data: item});
            }}>
            <Text>{item.timerange}</Text>
          </CardItem>
          <CardItem
            button
            onPress={() => {
              navigation.navigate('Face', {data: item});
            }}>
            <Left>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {item.name}
              </Text>
            </Left>
            <Right>
              <TextAvatar
                backgroundColor={getBg()}
                textColor={'#ffffff'}
                size={60}
                type={'circle'}>
                {item.name
                  .trim()
                  .split('')
                  .shift()}
              </TextAvatar>
            </Right>
          </CardItem>
          <CardItem
            footer
            button
            onPress={() => {
              navigation.navigate('Face', {data: item});
            }}>
            <Text>{item.subname}</Text>
          </CardItem>
        </Card>
      </Content>
    );
  }

  renderEmptyDate() {
    return (
      <Content padder>
        <Card>
          <CardItem bordered>
            <Body>
              <Text style={{height: 60, lineHeight: 60}}>今天没有课喔</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.lesson_id !== r2.lesson_id;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}
