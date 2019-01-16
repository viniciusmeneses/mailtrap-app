import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const MessageContent = ({ content }) => (
  <View style={styles.container}>
    <Text>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#dfdfdf',
    borderWidth: 1,
    margin: 10,
    padding: 15,
    flex: 1,
    ...ifIphoneX({
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      marginBottom: 20,
    }),
  },
});

export default MessageContent;
