import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import emails from '../constants/Emails';
import Inbox from './Inbox';

export default class NoMessagesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInbox: false
    }
  }

  seeInbox = () => {
    this.setState({ showInbox: true });
  }

  selectWord = length => {
    return length === 1 ? 'message' : 'messages';
  }

  render() {
    const starred = emails.filter(email => email.starred && !email.deleted).length;
    const deleted = emails.filter(email => email.deleted).length;
    const { showInbox } = this.state;
    const notEnoughDeleted = deleted / emails.length < 0.5
    ? ' Keeping all of your old emails strains the environment. Consider deleting some of your irrelevant emails!'
    : ' Great job!'
    const successColor = deleted / emails.length < 0.5 ? 'red' : 'green';
    return (
      showInbox
	      ? <Inbox />
        : <View styles={styles.container}>
		      <Text style={styles.announcement}>No new messages!</Text>
          {starred > 0 && <Text style={{ ...styles.message, color: '#D0A903' }}>
            You starred {starred} {this.selectWord(starred)}</Text>}
          {deleted > 0
            ? <Text style={{ ...styles.message, color: successColor }}>
              You deleted {deleted} {this.selectWord(deleted)}. You saved {Math.round(deleted * 0.4 * 100) / 100}g CO2.
               {notEnoughDeleted}
            </Text>
            : <Text style={{ ...styles.message, color: 'red' }}>
              You didn't delete any messages.{notEnoughDeleted}
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
    paddingTop: '40%',
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
  },
  message: {
    padding: '5%',
    textAlign: 'center',
    fontSize: 20,
  },
});
