import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';

const detailsIcon = name => <Icon name={name} color="#4cb3b2" size={15} />;

export default class Message extends Component {
  render() {
    const { subject, sent_at, to_email, from_email } = this.props;
    return (
      <TouchableOpacity style={styles.container}>
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
            <Text style={styles.detailsText}>{moment(sent_at).fromNow()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#dfdfdf',
    borderWidth: 1,
    margin: 10,
    padding: 15,
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
