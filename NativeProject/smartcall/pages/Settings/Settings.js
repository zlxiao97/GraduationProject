import * as React from 'react';
import {Content, Icon} from 'native-base';
import BasicLayout from '../../components/BasicLayout';

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
          <Icon name="home" />
          <Icon
            ios="ios-menu"
            android="md-menu"
            style={{fontSize: 20, color: 'red'}}
          />
          <Icon type="FontAwesome" name="home" />
        </Content>
      </BasicLayout>
    );
  }
}
