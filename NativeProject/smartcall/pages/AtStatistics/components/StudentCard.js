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
import {Image} from 'react-native';
import TextAvatar from 'react-native-text-avatar';
import moment from 'moment';

export default class ClassCard extends PureComponent {
  formatChosenDate(date) {
    return moment(date).format('YYYY.MM');
  }

  render() {
    const {getBg, currentUser, onDateChange} = this.props;
    return (
      <Card>
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
                .subtract(6, 'M')
                .toDate()}
              maximumDate={moment()
                .startOf('month')
                .add(6, 'M')
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
        <CardItem cardBody>
          <Image
            source={{uri: 'Image URL'}}
            style={{height: 200, width: null, flex: 1}}
          />
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>12 Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text>4 Comments</Text>
            </Button>
          </Body>
          <Right>
            <Text>11h ago</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
