import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { withNavigation } from 'react-navigation';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

class Header extends Component {
  signOut = () => {
    const { navigation } = this.props;
    AsyncStorage.removeItem('@MailTrap:user').then(() =>
      navigation.navigate('Auth')
    );
  };

  renderInboxes = () => {
    const { inboxes, selected } = this.props;
    return inboxes.map(inbox => (
      <MenuOption
        key={inbox.id}
        text={inbox.name}
        value={inbox.id}
        customStyles={{
          optionText:
            selected === inbox.id ? styles.inboxTextSelected : styles.inboxText,
        }}
        disabled={selected === inbox.id}
      />
    ));
  };

  handleInboxSelect = inbox => {
    const { onInboxChange } = this.props;
    onInboxChange(inbox);
  };

  goToMailTrap = () => Linking.openURL('https://mailtrap.io');

  render() {
    return (
      <View style={styles.header}>
        <Menu onSelect={this.handleInboxSelect}>
          <MenuTrigger
            customStyles={{ TriggerTouchableComponent: TouchableOpacity }}
          >
            <Icon name="inbox" size={25} color="#4cb3b2" />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: styles.menuOptionContainer,
            }}
          >
            {this.renderInboxes()}
          </MenuOptions>
        </Menu>
        <TouchableOpacity onPress={this.goToMailTrap}>
          <Text style={styles.title}>MailTrap</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.signOut}>
          <Icon name="times-circle" size={25} color="#4cb3b2" />
        </TouchableOpacity>
      </View>
    );
  }
}

const inboxStyle = {
  fontSize: 15,
  fontWeight: 'bold',
};

const styles = StyleSheet.create({
  header: {
    paddingTop: getStatusBarHeight(true),
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
  inboxText: {
    ...inboxStyle,
    color: '#303945',
  },
  inboxTextSelected: {
    ...inboxStyle,
    color: '#303945aa',
  },
  menuOptionContainer: {
    width: 90,
    borderColor: '#303945',
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default withNavigation(Header);
