import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Agenda} from 'react-native-calendars';
import {query} from './service';

const fakeUser = {
  id: 'cqupt2016213931',
  account: '2020822325',
  name: '测试人员4',
  system: 'student',
  stu_face_isreg: 0,
  remind_time: '5',
  stu_code: '2020822325',
  stu_img: 'faceImg-1583900351851.jpg',
  stu_phoneno: '',
  stu_school: '',
  stu_avatar: '',
};

export default class ClassList extends React.Component {
  static navigationOptions = {
    title: '课程列表',
  };

  constructor(props) {
    super(props);

    this.state = {
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

  componentDidMount() {
    query({stu_id: fakeUser.id}).then(({data}) => {
      this.setState({
        data,
      });
    });
  }
  render() {
    const {navigation} = this.props;
    const currentUser = this.props.navigation.state.params;
    if (currentUser) console.log(currentUser);
    if (this.state.data && this.state.data.length > 0) {
      return (
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={'2020-03-15'}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          // 日历标注
          // markedDates={{
          //    '2017-05-08': {textColor: '#43515c'},
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
      );
    }
    return <Text>暂无数据</Text>;
  }
  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
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
    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]}
        onPress={() => Alert.alert(item.name)}>
        <View style={[styles.itemContent]}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <View style={[styles.itemContent]}>
          <Text>This is empty date!</Text>
        </View>
      </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
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
