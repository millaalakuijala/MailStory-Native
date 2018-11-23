import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import emails from '../constants/Emails';
import FullStar from '../assets/images/FullStar.png';

export default class Inbox extends React.Component {

  render() {
    const starred = emails.filter(email => email.starred && !email.deleted);
    const notDeleted = emails.filter(email => !email.starred && !email.deleted);
    const noStarredMailsText = ( starred.length == 0
      && <Text style={styles.noMailsText}>No starred messages.</Text> );
    const noNormalMailsText = ( notDeleted.length === 0 && starred.length === 0
      && <Text style={styles.noMailsText}>No messages.</Text> );
    return (
      <View>
        <Text style={styles.inboxTitle}>Inbox</Text>
        <ScrollView>{starred.map((email, i) => (
          <View key={email.id} style={{
            ...styles.header,
            backgroundColor: i % 2 === 0 && 'rgba(154, 154, 154, 0.15)'
          }}>
            <Text style={styles.title}>{email.title}</Text>
            <View style={styles.sender}>
              <ImageBackground source={FullStar} style={styles.image}>
                <Text style={{ ...styles.senderShort, color: '#000' }}>
                  {email.senderShort}
                </Text>
              </ImageBackground>
              <Text>{email.sender}</Text>
            </View>
          </View> ))}
          <View>{notDeleted.map((email, i) => (
            <View key={email.id} style={{
              ...styles.header,
              backgroundColor: (i + starred.length) % 2 === 0 && 'rgba(154, 154, 154, 0.15)'
            }}>
              <Text style={styles.title}>{email.title}</Text>
              <View style={styles.sender}>
                <View style={{
                  ...styles.circle,
                  backgroundColor: colors[(i + starred.length) % colors.length]}}>
                  <Text style={styles.senderShort}>{email.senderShort}</Text>
                </View>
                <Text>{email.sender}</Text>
              </View>
            </View> ))}
          </View>
          {noNormalMailsText}
        </ScrollView>
      </View>
    );
  }
}

const colors = ['rgba(112, 91, 196, 0.5)','rgba(85, 127, 190, 0.5)',
'rgba(132, 46, 176, 0.5)', 'rgba(7, 45, 102, 0.5)'];

//header, title & sender just copy-pasted from Email.js. Better way to do this?
// e.g. styled-components?
const styles = StyleSheet.create({
  inboxTitle: {
    fontSize: 40,
    padding: 10,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(154, 154, 154, 1.0)',
  },
  inboxSubTitle: {
    fontSize: 30,
    padding: 10
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(154, 154, 154, 1.0)',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  sender: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  noMailsText: {
      padding: 10
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 100/2,
    backgroundColor: 'rgba(112, 91, 196, 0.5)',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  senderShort: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
