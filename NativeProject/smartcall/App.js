import 'react-native-gesture-handler';
import {Root} from 'native-base';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Router from './router/Router';

export default class App extends Component {
  render() {
    return (
      <Root>
        <Router />
      </Root>
    );
  }
}
