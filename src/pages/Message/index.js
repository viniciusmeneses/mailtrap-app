import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../../components/Header';

export default class Message extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Header mode="message" />
        <View style={styles.container} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#dfdfdf',
    borderWidth: 1,
    margin: 10,
    padding: 15,
    flex: 1,
  },
});
