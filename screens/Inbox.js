import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import emails from '../constants/Emails';

export default class Inbox extends React.Component {

  render() {
    const starred = emails.filter(email => email.starred && !email.deleted);
    const notDeleted = emails.filter(email => !email.starred && !email.deleted);
    const noStarredMailsText = ( starred.length == 0 && <Text style={styles.noMailsText}>Ei tärkeitä viestejä.</Text> );
    const noNormalMailsText = ( notDeleted.length == 0 && <Text style={styles.noMailsText}>Ei viestejä.</Text> );
    return (
      <View>
        <Text style={styles.inboxTitle}>Postilaatikko</Text>
        <Text style={styles.inboxSubTitle}>Tärkeät</Text>
        <View>{starred.map(email => (
          <View style={styles.header} key={email.id}>
            <Text style={styles.sender}>{email.sender}</Text>
            <View style={styles.title}>
              <Text>{email.title}</Text>
            </View>
          </View> ))}
        </View>
        {noStarredMailsText}
        
        <Text style={styles.inboxSubTitle}>Saapuneet</Text>
        <View>{notDeleted.map(email => (
          <View style={styles.header} key={email.id}>
            <Text style={styles.sender}>{email.sender}</Text>
            <View style={styles.title}>
              <Text>{email.title}</Text>
            </View>
          </View> ))}
        </View>
        {noNormalMailsText}

      </View>
      /*<View>
        <View>{emails.filter(email => email.starred).map(email =>
          <Text key={email.id}>{email.content}</Text>)}
        </View>
        <View>{emails.filter(email => !email.deleted && !email.starred).map(email =>
          <Text key={email.id}>{email.content}</Text>)}
        </View>
      </View>*/
    );
  }
}

//header, title & sender just copy-pasted from Email.js. Better way to do this?
const styles = StyleSheet.create({
  inboxTitle: {
    fontSize: 36,
    padding: 10
  },
  inboxSubTitle: {
    fontSize: 30,
    padding: 10
  },
  header: {
    backgroundColor: 'rgba(154, 154, 154, 0.15)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(154, 154, 154, 1.0)',
    padding: 15,
  },
  sender: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  noMailsText: {
      padding: 10
  }
});
