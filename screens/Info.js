// JavaScript source code
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Info extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          page: 0
      }
      this.nextPage = this.nextPage.bind(this);
    }

    nextPage = () => {
      const oldPage = this.state.page;
      this.setState({
        page: oldPage + 1
      })
      if (oldPage == 1) this.closeInfo();
    }

    closeInfo = () => {
      this.props.close();
    }

    render() {
      return (
        <View style={{flex: 1, flexDirection: 'column', padding: 20}}>
          {this.state.page == 0 && <Text style={styles.text}>{"Welcome to MailStory!\n\nHere is a quick tutorial of how to use this product."} </Text>}
          {this.state.page == 1 && <Text style={styles.text}> Insert picture of UI in this page </Text>}
          <TouchableOpacity style={styles.button} onPress={this.nextPage}>
            <Text style={styles.buttonText}>Next page</Text>
          </TouchableOpacity>
        </View>
    )
    }
}

const styles = StyleSheet.create({
  text: {
      fontSize: 40,
      alignItems: 'center'
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