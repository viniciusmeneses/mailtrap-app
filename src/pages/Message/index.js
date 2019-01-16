import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../../components/Header';
import MessageDetails from '../../components/MessageDetails';

export default class Message extends Component {
  render() {
    const { navigation } = this.props;
    const message = {
      subject: navigation.getParam('subject'),
      sent_at: navigation.getParam('sent_at'),
      to_email: navigation.getParam('to_email'),
      from_email: navigation.getParam('from_email'),
      content: navigation.getParam('content'),
    };

    return (
      <View style={styles.wrapper}>
        <Header mode="message" />
        <MessageDetails {...message} fullSubject />
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
