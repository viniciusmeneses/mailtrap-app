import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';

const detailsIcon = name => <Icon name={name} color="#4cb3b2" size={15} />;

class MessageInbox extends Component {
  openMessage = () => {
    const {
      navigation,
      subject,
      sent_at,
      to_email,
      from_email,
      content,
    } = this.props;
    navigation.navigate('Message', {
      subject,
      sent_at,
      to_email,
      from_email,
      content,
    });
  };

  render() {
    const { subject, sent_at, to_email, from_email } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={this.openMessage}>
        <View style={styles.subjectWrapper}>
          <Text style={styles.subject} numberOfLines={1}>
            {subject}
          </Text>
        </View>
        <View>
          <View style={styles.detailsWrapper}>
            {detailsIcon('paper-plane')}
            <Text style={styles.detailsText}>{from_email}</Text>
          </View>
          <View style={styles.detailsWrapper}>
            {detailsIcon('envelope')}
            <Text style={styles.detailsText}>{to_email}</Text>
          </View>
          <View style={styles.detailsWrapper}>
            {detailsIcon('calendar')}
            <Text style={styles.detailsText}>{sent_at}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderColor: '#dfdfdf',
    borderWidth: 1,
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subjectWrapper: {
    marginBottom: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailsText: {
    fontSize: 15,
    color: '#444',
    marginLeft: 5,
  },
  detailsWrapper: {
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default withNavigation(MessageInbox);
