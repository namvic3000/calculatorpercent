import React, {Component} from 'react'
import {Platform,NativeModules, StyleSheet, View, StatusBar} from 'react-native';
import PercentCalculator from "./PercentCalculator";
import { Provider } from "react-redux";
import store from '../store'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});


export default class App extends Component {//<Props> {
 
 
  
  render() {
    return (
      
        <Provider store={store}>
          <View style={styles.container}>
              <StatusBar hidden={false}/>
              <PercentCalculator />
          </View>
       </Provider>
    );
  }
}

