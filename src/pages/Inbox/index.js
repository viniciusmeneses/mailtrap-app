import React, { Component } from 'react';
import { View, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import Header from '../../components/Header';
import Message from '../../components/Message';
import client from '../../services/client';

export default class Inbox extends Component {
  state = {
    user: {},
    inbox: {},
    messages: [],
    refreshing: false,
  };

  componentDidMount() {
    this.loadAll();
  }

  loadAll = () =>
    this.loadUser()
      .then(user => this.fetchInboxes(user))
      .then(({ user, inbox }) => this.fetchMessages(user, inbox))
      .then(data => this.setState(data));

  loadUser = () =>
    AsyncStorage.getItem('@MailTrap:user').then(user => JSON.parse(user));

  fetchInboxes = user =>
    client
      .getInboxes(user.api_token)
      .then(inboxes => ({ user, inbox: inboxes[0] }));

  fetchMessages = (user, inbox) =>
    client
      .getMessages(user.api_token, inbox.id)
      .then(messages => ({ user, inbox, messages }));

  extractKeyFromMessage = item => String(item.id);

  renderMessage = ({ item }) => <Message {...item} />;

  refreshMessages = () => {
    const { user, inbox } = this.state;
    this.setState({ refreshing: true });
    this.fetchMessages(user, inbox).then(({ messages }) =>
      this.setState({ messages, refreshing: false })
    );
  };

  render() {
    const { messages, refreshing } = this.state;
    console.log(this.state);
    return (
      <View style={styles.wrapper}>
        <Header />
        <View style={styles.container}>
          <FlatList
            data={messages}
            keyExtractor={this.extractKeyFromMessage}
            renderItem={this.renderMessage}
            refreshing={refreshing}
            onRefresh={this.refreshMessages}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});
