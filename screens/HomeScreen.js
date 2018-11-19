import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import NoMessagesScreen from './NoMessagesScreen';
import SwipeableEmail from './SwipeableEmail';
import emails from '../constants/Emails';
import EmptyStar from '../assets/images/EmptyStar.jpeg';
import FullStar from '../assets/images/FullStar.png';

export default class HomeScreen extends React.Component {
  state = {
    emailIndex: 0,
    deleted: 0,
    starred: 0,
  };

  constructor(props) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  shouldRender = index => {
    return index >= this.state.emailIndex;
  }

  static navigationOptions = {
    header: null,
  };

  deleteEmail = () => {
    const { emailIndex } = this.state;
    emails[emailIndex].deleted = true;
  }

  starEmail = amount => {
	  const { emailIndex, starred } = this.state;
    emails[emailIndex].starred = !emails[emailIndex].starred;
    this.setState({ starred: starred + amount })
  }

  render() {
    const i = this.state.emailIndex;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {i < emails.length
            ? (<View>
                {emails.map((email, j) => this.shouldRender(j) &&
                  <View key={j}>
                    <SwipeableEmail
                      email={email}
                      index={j}
                      deleteEmail={this.deleteEmail}
                      starEmail={this.starEmail}
                      onDismiss={() => {
                    if ([...new Array(emails.length)].slice(j + 1, emails.length).some(this.shouldRender)) {
                      LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.easeOut, duration: 10000 });
                    }
                    this.setState({ emailIndex: this.state.emailIndex + 1 })
                  }}/></View>)}
              </View>)
            : <NoMessagesScreen />}
        </ScrollView>
        {i < emails.length && (<View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => emails[i].starred ? this.starEmail(-1) : this.starEmail(1)}>
            <Image source={emails[i].starred ? FullStar : EmptyStar} style={styles.image} />
          </TouchableOpacity>
        </View>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
    height: '100%'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '15%',
  },
  image: {
    height: 70,
    width: 70,
  }
});
