import * as React from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import {Container, Text, Button, Content} from 'native-base';
import {Agenda} from 'react-native-calendars';
import {query, currentUser} from './service';

export default class ClassList extends React.Component {
  static navigationOptions = {
    title: '课程列表',
  };

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
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

  componentDidMount() {
    currentUser().then(res => {
      const {success, data} = res;
      if (success) {
        this.setState(
          {
            currentUser: data,
          },
          this._queryData.bind(this),
        );
      } else {
        this.props.navigation.navigate('Home');
      }
    });
  }
  render() {
    if (this.state.data && this.state.data.length > 0) {
      return (
        <Container>
          <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            selected={moment().format('YYYY-MM-DD')}
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
        </Container>
      );
    }
    return (
      <Container>
        <Text>暂无数据</Text>
      </Container>
    );
  }
  loadItems(day) {
    const {dateString, day: date, month, year, timestamp} = day;
    const data = this.state.data.filter(
      ({start_time}) => moment(start_time).date() === date,
    );
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  renderItem(item) {
    const {navigation} = this.props;
    return (
      <Content>
        <Button
          onPress={() => {
            navigation.navigate('Face');
          }}>
          <Text>{item.name}</Text>
        </Button>
      </Content>
    );
  }

  renderEmptyDate() {
    return (
      <Content style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </Content>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemContent: {
    display: 'flex',
    height: 60,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    marginVertical: 10,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
