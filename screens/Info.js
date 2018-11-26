// JavaScript source code
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import ExampleEmail from '../assets/images/example_email_with_instructions.png';

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
      if (oldPage == 3) this.closeInfo();
    }

    closeInfo = () => {
      this.props.close();
    }

    render() {
      return (
        <View style={{flex: 1, flexDirection: 'column', padding: 20}}>
          {this.state.page == 0 && (
            <View>
              <View style={{fontSize: 40, paddingVertical: 50, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.text}>Welcome to</Text>
                <Text style={styles.text}>MailStory!</Text>
              </View>
              <Text style={{fontSize: 20}}>Here is a quick tutorial to show you how to use this product.</Text>
              <TouchableOpacity style={styles.button} onPress={this.nextPage}>
                <Text style={styles.buttonText}>Show tutorial</Text>
              </TouchableOpacity>
            </View>
          )}
          {this.state.page == 1 && (
            <View>
              <Text style={{fontSize: 20, paddingVertical: 10}}>MailStory is an app which helps you to handle your incoming mails fast and easily.</Text>
              <Text style={{fontSize: 20, paddingVertical: 10}}>When starting the app, you are shown your new emails, one mail at a time and you can react to them appropiately,
                                                                for example by deleting or starring them. This way your inbox will always stay clean and organized.</Text>
              <Text style={{fontSize: 20, paddingVertical: 10}}>Possible actions are illustrated on the next page.</Text>
              <TouchableOpacity style={styles.button} onPress={this.nextPage}>
                <Text style={styles.buttonText}>Next page</Text>
              </TouchableOpacity>
            </View>
          )}
          {this.state.page == 2 && (
            <View>
              <Image source={ExampleEmail} style={{padding: 10, height: Dimensions.get('window').height*0.7, width: Dimensions.get('window').width*0.9}} resizeMode="contain"/>
              <TouchableOpacity style={styles.button} onPress={this.nextPage}>
                <Text style={styles.buttonText}>Next page</Text>
              </TouchableOpacity>
            </View>
          )}
          {this.state.page == 3 && (
            <View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 20, paddingVertical: 10}}>You are now ready to use MailStory. Select Start to open your mails and...</Text>
                <Text style={{fontSize: 30}}>Swipe your inbox</Text>
                <Text style={{fontSize: 30}}>clean!</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={this.nextPage}>
                  <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
            </View>
          )}
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
      fontSize: 40  
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