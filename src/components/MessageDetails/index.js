import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import PropTypes from 'prop-types';

const detailsIcon = name => <Icon name={name} color="#4cb3b2" size={15} />;

class MessageDetails extends Component {
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
    const {
      subject,
      sent_at,
      to_email,
      from_email,
      fullSubject,
      roundBorderBottom,
    } = this.props;
    return (
      <TouchableOpacity
        style={
          roundBorderBottom ? styles.containerBottomRound : styles.container
        }
        onPress={this.openMessage}
      >
        <View style={styles.subjectWrapper}>
          <Text
            style={fullSubject ? styles.fullSubject : styles.subject}
            numberOfLines={fullSubject ? 0 : 1}
          >
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

MessageDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  subject: PropTypes.string.isRequired,
  sent_at: PropTypes.string.isRequired,
  to_email: PropTypes.string.isRequired,
  from_email: PropTypes.string.isRequired,
  fullSubject: PropTypes.bool,
  roundBorderBottom: PropTypes.bool,
};

MessageDetails.defaultProps = {
  fullSubject: false,
  roundBorderBottom: false,
};

const subjectStyle = {
  fontWeight: 'bold',
  color: '#333',
};

const containerStyle = {
  borderRadius: 5,
  borderColor: '#dfdfdf',
  borderWidth: 1,
  margin: 10,
  padding: 15,
  backgroundColor: 'white',
};

const styles = StyleSheet.create({
  container: {
    ...containerStyle,
  },
  containerBottomRound: {
    ...containerStyle,
    ...ifIphoneX({
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      marginBottom: 20,
    }),
  },
  subject: {
    ...subjectStyle,
    fontSize: 18,
  },
  fullSubject: {
    ...subjectStyle,
    fontSize: 16,
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

export default withNavigation(MessageDetails);
