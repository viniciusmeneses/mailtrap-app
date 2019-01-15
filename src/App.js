import React, { Component } from 'react';
import createRouter from './routes';
import {
  View,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

export default class App extends Component {
  state = {
    logged: null,
  };

  componentDidMount() {
    setTimeout(() => this.checkUserLogged(), 0);
  }

  checkUserLogged = () =>
    AsyncStorage.getItem('@MailTrap:user').then(user =>
      user ? this.setState({ logged: true }) : this.setState({ logged: false })
    );

  render() {
    const { logged } = this.state;
    if (logged !== null) {
      const Routes = createRouter(logged);
      return (
        <MenuProvider>
          <StatusBar barStyle="light-content" />
          <Routes />
        </MenuProvider>
      );
    }
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#303945',
  },
});
