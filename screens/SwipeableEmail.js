import React from 'react';
import {
  Animated, Dimensions, Image, PanResponder, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

import type {PanResponderInstance, GestureState} from 'PanResponder';
import EmptyStar from '../assets/images/EmptyStar.jpeg';
import FullStar from '../assets/images/FullStar.png';

export default class SwipeableEmail extends React.Component {
  translateX = new Animated.Value(0);
  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: Animated.event([null, {dx: this.translateX}]),
    onPanResponderRelease: (e, {vx, dx}) => {
      const screenWidth = Dimensions.get("window").width;
      if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) {
        if (dx < 0) { this.props.deleteEmail(); };
        Animated.timing(this.translateX, {
          toValue: dx > 0 ? screenWidth : -screenWidth,
          duration: 200
        }).start(this.props.onDismiss);
      } else {
        Animated.spring(this.translateX, {
          toValue: 0,
          bounciness: 5
        }).start();
      }
    }
  });

  starEmail = () => {
    this.props.starEmail();
  }

  render() {
    const { title, sender, senderShort, content, deleted, starred } = this.props.email;
    const { index } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View
          style={{transform: [{translateX: this.translateX}], height: '100%'}} {...this._panResponder.panHandlers}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.sender}>
              <View style={{
                ...styles.circle, backgroundColor: colors[index % colors.length]}}>
                <Text style={styles.senderShort}>{senderShort}</Text>
              </View>
              <Text>{sender}</Text>
            </View>
          </View>
            <Text style={styles.content}>{content}</Text>
        </Animated.View>
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
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingTop: 20,
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

