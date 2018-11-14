import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import emails from '../constants/Emails';

export default class NoMessagesScreen extends React.Component {
  seeInbox = () => {
    console.log('inbox');
  }

  render() {
    const starred = emails.filter(email => email.starred).length;
    const deleted = emails.filter(email => email.deleted).length;
    return (
      <View styles={styles.container}>
        <Text style={styles.announcement}>No new messages!</Text>
        {starred > 0 && <Text style={styles.starAnnouncement}>You starred {starred} messages</Text>}
        {deleted > 0
          ? <Text style={styles.deleteAnnouncement}>
          You deleted {deleted} messages. Great job! You saved {deleted * 0.01} CO2
          </Text>
          : <Text style={styles.deleteAnnouncement}>
          You didn't delete any messages. Keeping all of your old emails strains the environment.
          Consider deleting some of your irrelevant emails!
          </Text>}
        <TouchableOpacity onPress={this.seeInbox} style={styles.button}>
          <Text style={styles.buttonText}>Proceed to inbox</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  announcement: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#242424',
    padding: 35,
    paddingTop: 250,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'rgba(50, 167, 104, 0.75)',
    borderColor: 'rgba(50, 167, 104, 1.0)',
    borderRadius: 10,
    height: 70,
    margin: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  }

});
