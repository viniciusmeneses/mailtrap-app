import React, { Component } from 'react';
import { View, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import Header from '../../components/Header';
import MessageDetails from '../../components/MessageDetails';
import client from '../../services/client';

export default class Inbox extends Component {
  state = {
    user: {},
    inboxes: [],
    messages: [],
    currentInbox: '',
    refreshing: true,
  };

  componentDidMount() {
    this.loadAll();
  }

  loadAll = () =>
    this.loadUser()
      .then(user => this.fetchInboxes(user))
      .then(({ user, inboxes }) => {
        return this.fetchMessages(user, inboxes[0].id).then(data => ({
          ...data,
          inboxes,
        }));
      })
      .then(data => this.setState({ ...data, refreshing: false }));

  loadUser = () =>
    AsyncStorage.getItem('@MailTrap:user').then(user => JSON.parse(user));

  fetchInboxes = user =>
    client.getInboxes(user.api_token).then(inboxes => ({ user, inboxes }));

  fetchMessages = (user, inbox) =>
    client
      .getMessages(user.api_token, inbox)
      .then(messages => ({ user, messages, currentInbox: inbox }));

  extractKeyFromMessage = item => String(item.id);

  renderMessage = ({ item }) => <MessageDetails {...item} />;

  refreshMessages = (currentInbox = this.state.currentInbox) => {
    const { user } = this.state;
    this.setState({ refreshing: true });
    this.fetchMessages(user, currentInbox).then(({ messages }) =>
      this.setState({ messages, refreshing: false })
    );
  };

  handleInboxChange = inbox => this.refreshMessages(inbox);

  render() {
    const { messages, refreshing, inboxes, currentInbox } = this.state;

    return (
      <View style={styles.wrapper}>
        <Header
          inboxes={inboxes}
          selected={currentInbox}
          onInboxChange={this.handleInboxChange}
          mode="inbox"
        />
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
