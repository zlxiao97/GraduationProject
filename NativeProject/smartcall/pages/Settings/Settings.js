import * as React from 'react';
import {TouchableHighlight} from 'react-native';
import {Content, Card, CardItem, Text, Icon, Right} from 'native-base';
import BasicLayout from '../../components/BasicLayout';
import {setToken} from '../../utils/authorized';

const resetToken = () => setToken('');

export default class Settings extends React.Component {
  static navigationOptions = {
    title: '设置',
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
        <Content>
          <Card>
            <TouchableHighlight
              onPress={() => {
                resetToken().then(() => navigation.navigate('HomeScreen'));
              }}>
              <CardItem>
                <Text>登出</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
            </TouchableHighlight>
          </Card>
        </Content>
      </BasicLayout>
    );
  }
}
