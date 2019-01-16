import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import MessageDetails from '../../components/MessageDetails';
import MessageContent from '../../components/MessageContent';
import PropTypes from 'prop-types';

const Message = ({ navigation }) => {
  const message = {
    subject: navigation.getParam('subject', 'Subject'),
    sent_at: navigation.getParam('sent_at', new Date()),
    to_email: navigation.getParam('to_email', 'to@email.com'),
    from_email: navigation.getParam('from_email', 'from@email.com'),
    content: navigation.getParam('content', 'Message content'),
  };

  return (
    <View style={styles.wrapper}>
      <Header mode="message" />
      <MessageDetails {...message} fullSubject />
      <MessageContent content={message.content} />
    </View>
  );
};

Message.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

export default Message;
