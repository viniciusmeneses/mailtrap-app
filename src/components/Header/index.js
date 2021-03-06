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
import PropTypes from 'prop-types';

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

  createIcon = name => <Icon name={name} color="#4cb3b2" size={25} />;

  closeMessage = () => {
    const { navigation } = this.props;
    navigation.navigate('Inbox');
  };

  render() {
    const { mode } = this.props;
    return (
      <View style={styles.header}>
        {mode === 'inbox' ? (
          <Menu onSelect={this.handleInboxSelect}>
            <MenuTrigger
              customStyles={{ TriggerTouchableComponent: TouchableOpacity }}
            >
              {this.createIcon('inbox')}
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: styles.menuOptionContainer,
              }}
            >
              {this.renderInboxes()}
            </MenuOptions>
          </Menu>
        ) : (
          <TouchableOpacity onPress={this.closeMessage}>
            {this.createIcon('chevron-left')}
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={this.goToMailTrap}>
          <Text style={styles.title}>MailTrap</Text>
        </TouchableOpacity>

        {mode === 'inbox' ? (
          <TouchableOpacity onPress={this.signOut}>
            {this.createIcon('times-circle')}
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  onInboxChange: PropTypes.func,
  mode: PropTypes.string.isRequired,
  inboxes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  selected: PropTypes.string,
};

Header.defaultProps = {
  onInboxChange: () => {},
  inboxes: [],
  selected: '',
};

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
