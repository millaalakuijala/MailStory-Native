import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
 
class Email extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      gestureName: 'none',
    };
  }
 
  onSwipeLeft(gestureState) {
    this.props.deleteEmail();
  }
 
  onSwipeRight(gestureState) {
    this.props.moveToNextEmail();
  }
 
  onSwipe(gestureName, gestureState) {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName });
    switch (gestureName) {
      case SWIPE_LEFT:
        break;
      case SWIPE_RIGHT:
        break;
    }
  }
 
  render() {
    
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    const { title, sender, senderShort, content, deleted } = this.props.email;
    const { index } = this.props;
 
    return (
      <View style={styles.container}>
        <GestureRecognizer
          onSwipe={(direction, state) => this.onSwipe(direction, state)}
          onSwipeLeft={(state) => this.onSwipeLeft(state)}
          onSwipeRight={(state) => this.onSwipeRight(state)}
          config={config}
          style={{
            flex: 1,
            backgroundColor: '#fff'
          }}
        >
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.sender}>
            <View style={{
              ...styles.circle, backgroundColor: colors[index]}}>
              <Text style={styles.senderShort}>{senderShort}</Text>
            </View>
            <Text>{sender}</Text>
          </View>
        </View>
          <Text style={styles.content}>{content}</Text>
        </GestureRecognizer>
      </View>
    );
  }
}

const colors = ['rgba(112, 91, 196, 0.5)','rgba(85, 127, 190, 0.5)',
'rgba(132, 46, 176, 0.5)', 'rgba(7, 45, 102, 0.5)'];

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header: {
    backgroundColor: 'rgba(154, 154, 154, 0.15)',
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
  content: {
    fontSize: 20,
    padding: 15,
  }
});
 
export default Email;
