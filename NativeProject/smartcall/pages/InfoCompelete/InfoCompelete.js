import * as React from 'react';
import {Container, Text, Button, Content} from 'native-base';

export default class InfoCompelete extends React.Component {
  static navigationOptions = {
    title: '信息完善',
  };
  render() {
    const {navigation} = this.props;
    return (
      <Container>
        <Text>信息完善</Text>
        <Button
          onPress={() => {
            navigation.navigate('Class');
          }}>
          <Text>首页</Text>
        </Button>
      </Container>
    );
  }
}
