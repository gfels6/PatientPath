import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './app/components/Login';

const Application = StackNavigator({
  Home: { screen: Login }
});

export default class App extends React.Component {
  render() {
    return (
      <Application />
    );
  }
}

