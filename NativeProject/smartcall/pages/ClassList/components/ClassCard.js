import React, {PureComponent} from 'react';
import {Text, Card, CardItem, Right, Left} from 'native-base';
import TextAvatar from 'react-native-text-avatar';

export default class ClassCard extends PureComponent {
  render() {
    const {navigation, getBg, item} = this.props;
    return (
      <Card>
        <CardItem
          header
          button
          onPress={() => {
            navigation.navigate('Face', {data: item});
          }}>
          <Text
            style={{
              fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
              color: '#808080',
            }}>
            {item.timerange}
          </Text>
        </CardItem>
        <CardItem
          button
          onPress={() => {
            navigation.navigate('Face', {data: item});
          }}>
          <Left>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#808080',
                fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
              }}>
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
          <Text
            style={{
              fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
              color: '#808080',
            }}>
            {item.subname}
          </Text>
        </CardItem>
      </Card>
    );
  }
}
