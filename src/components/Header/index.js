import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { withNavigation } from 'react-navigation';

class Header extends Component {
  signOut = () => {
    const { navigation } = this.props;
    AsyncStorage.removeItem('@MailTrap:user').then(() =>
      navigation.navigate('Auth')
    );
  };

  render() {
    return (
      <View style={styles.header}>
        <View>
          <Icon name="inbox" size={25} color="#4cb3b2" />
        </View>
        <View>
          <Text style={styles.title}>MailTrap</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.signOut}>
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

export default withNavigation(Header);
