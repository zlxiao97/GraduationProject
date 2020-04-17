import React, {PureComponent} from 'react';
import {Text, Card, CardItem, Body} from 'native-base';

export default class EmptyCard extends PureComponent {
  render() {
    return (
      <Card>
        <CardItem bordered>
          <Body>
            <Text
              style={{
                height: 60,
                lineHeight: 60,
                color: '#808080',
                fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
              }}>
              今天没有课喔
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
