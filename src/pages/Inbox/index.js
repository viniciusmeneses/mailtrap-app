import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../../components/Header';

export default class Inbox extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Header />
        <View style={styles.container}>{/* <FlatList /> */}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
});
