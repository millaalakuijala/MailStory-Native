import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import emails from '../constants/Emails';

export default class Inbox extends React.Component {

  render() {
    return (
      <View>
        <View>{emails.filter(email => email.starred).map(email =>
          <Text key={email.id}>{email.content}</Text>)}
        </View>
        <View>{emails.filter(email => !email.deleted && !email.starred).map(email =>
          <Text key={email.id}>{email.content}</Text>)}
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({

});
