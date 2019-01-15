import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <View>
          <Icon name="envelope" size={25} color="#4cb3b2" />
        </View>
        <View>
          <Text style={styles.title}>MailTrap</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Icon name="times-circle" size={25} color="#4cb3b2" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: getStatusBarHeight(),
    paddingBottom: 10,
    backgroundColor: '#303945',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});
