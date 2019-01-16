import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import HTML from 'react-native-render-html';

const MessageContent = ({ content }) => (
  <ScrollView style={styles.container} onPress={() => {}}>
    <View style={styles.wrapper}>
      {/<html>/gi.test(content) ? (
        <HTML html={content} baseFontStyle={styles.text} />
      ) : (
        <Text style={styles.text}>{content}</Text>
      )}
    </View>
  </ScrollView>
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
  text: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
  wrapper: {
    marginBottom: 30,
  },
});

export default MessageContent;
