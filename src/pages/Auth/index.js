import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import client from '../../services/client';
import { prop } from 'ramda';

export default class Auth extends Component {
  state = {
    tokenInput: '31fa4b731a43bcccabed51ed1e23fdc4',
    error: '',
  };

  handleLoginButton = () => {
    const { tokenInput } = this.state;
    const { navigation } = this.props;

    if (tokenInput) {
      client
        .getUser(tokenInput)
        .then(response =>
          AsyncStorage.setItem('@MailTrap:user', JSON.stringify(response))
        )
        .then(() => navigation.navigate('Inbox'))
        .catch(error => this.setState({ error }));
    }
  };

  handleTokenInput = text => this.setState({ tokenInput: text, error: null });

  render() {
    const { tokenInput, error } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>MailTrap</Text>
        <Text style={styles.instructions}>
          Enter your API Token above to login in your MailTrap account:
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Your API Token..."
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            value={tokenInput}
            onChangeText={this.handleTokenInput}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={this.handleLoginButton}
          >
            <Icon name="send" color="#fff" size={17} />
          </TouchableOpacity>
        </View>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303945',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  instructions: {
    margin: 10,
    textAlign: 'center',
    color: '#ddd',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 0,
    fontSize: 17,
    flex: 1,
    marginRight: 10,
  },
  loginButton: {
    backgroundColor: '#4cb3b2',
    padding: 13,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 10,
  },
  error: {
    margin: 5,
    color: '#DD544D',
  },
});
