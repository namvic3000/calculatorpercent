import React, {Component} from 'react'
import {Platform, StyleSheet, View} from 'react-native';
import PercentAndStandardCalculator from "./PercentAndStandardCalculator";
import { Provider } from "react-redux";
import store from '../store'



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
export default class App extends Component {//<Props> {
  render() {
    return (
      
        <Provider store={store}>
          <View style={styles.container}>
              <PercentAndStandardCalculator />
          </View>
       </Provider>
    );
  }
}

