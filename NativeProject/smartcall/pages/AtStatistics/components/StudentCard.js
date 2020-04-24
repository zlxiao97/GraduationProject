import React, {PureComponent} from 'react';
import {
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  DatePicker,
} from 'native-base';
import TextAvatar from 'react-native-text-avatar';
import moment from 'moment';

export default class ClassCard extends PureComponent {
  formatChosenDate(date) {
    return moment(date).format('YYYY.MM');
  }

  render() {
    const {getBg, currentUser, onDateChange, atCount, abCount} = this.props;
    return (
      <Card style={{paddingBottom: 30}}>
        <CardItem>
          <Left>
            <TextAvatar
              backgroundColor={getBg()}
              textColor={'#ffffff'}
              size={60}
              type={'circle'}>
              {currentUser
                ? currentUser.name
                    .trim()
                    .split('')
                    .slice(0, 2)
                    .join('')
                : ''}
            </TextAvatar>
            <Body>
              <Text>{currentUser ? currentUser.name : ''}</Text>
              <Text note>{currentUser ? currentUser.id : ''}</Text>
            </Body>
          </Left>
          <Right>
            <DatePicker
              defaultDate={moment()
                .startOf('month')
                .toDate()}
              minimumDate={moment()
                .startOf('month')
                .subtract(1, 'Y')
                .toDate()}
              maximumDate={moment()
                .startOf('month')
                .add(1, 'Y')
                .toDate()}
              formatChosenDate={this.formatChosenDate.bind(this)}
              locale={'zh-CN'}
              timeZoneOffsetInMinutes={0}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'spinner'}
              placeHolderText={<Text color="#595959">请选择月份</Text>}
              textStyle={{color: 'green'}}
              placeHolderTextStyle={{color: '#d3d3d3'}}
              onDateChange={onDateChange}
              disabled={false}
            />
          </Right>
        </CardItem>
        <CardItem cardBody style={{marginHorizontal: 50, color: '#d3d3d3'}}>
          <Left>
            <Text
              style={{
                fontSize: 18,
              }}>
              缺勤：
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 24,
                  color: '#B8000F',
                }}>
                {abCount}
              </Text>
            </Text>
          </Left>
          <Right>
            <Text style={{fontSize: 18}}>
              出勤：
              <Text
                style={{fontWeight: 'bold', fontSize: 24, color: '#00AC2D'}}>
                {atCount}
              </Text>
            </Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
