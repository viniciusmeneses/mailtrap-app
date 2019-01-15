import React, { Component, Fragment } from 'react';
import createRouter from './routes';
import {
  View,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default class App extends Component {
  state = {
    logged: null,
  };

  componentDidMount() {
    setTimeout(() => this.checkUserLogged(), 1000);
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
        <Fragment>
          <StatusBar barStyle="light-content" />
          <Routes />
        </Fragment>
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
