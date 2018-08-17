import React, {Component} from 'react'
import {Platform,NativeModules, StyleSheet, View, StatusBar} from 'react-native';
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

  state = {
    statusBarHeight: 0
  }

  componentDidMount = () => {
    // if(Platform.OS === 'ios' {
    //   const {StatusBarManager} = NativeModules
    //   StatusBarManager.getHeight( result => console.log('STATUS BAR HEIGHT IS ', result.height))
    // }
    
  }
  
  render() {
    return (
      
        <Provider store={store}>
          <View style={styles.container}>
              <StatusBar hidden={false}/>
              <PercentAndStandardCalculator />
          </View>
       </Provider>
    );
  }
}

