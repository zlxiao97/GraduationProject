import * as React from 'react';
import {Text, Button, Content} from 'native-base';
import BasicLayout from '../../components/BasicLayout';

export default class InfoCompelete extends React.Component {
  static navigationOptions = {
    title: '信息完善',
  };
  state = {
    currentUser: null,
  };

  setCurrentUser(currentUser) {
    this.setState({currentUser});
  }
  render() {
    const {navigation} = this.props;
    return (
      <BasicLayout setCurrentUser={this.setCurrentUser.bind(this)}>
        <Text>信息完善</Text>
        <Button
          onPress={() => {
            navigation.navigate('Class');
          }}>
          <Text>首页</Text>
        </Button>
      </BasicLayout>
    );
  }
}
