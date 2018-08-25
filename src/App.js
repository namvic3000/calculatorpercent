import React, {Component} from 'react'
import {Platform,NativeModules, StyleSheet, View, StatusBar} from 'react-native';
import PercentCalculator from "./PercentCalculator";
import { Provider } from "react-redux";
import store from '../store'



class App extends Component {//<Props> {
 
 
  render() {

    //status bar is enabled, so allow 20 for ios status bar, 
    //0 for android since app automatically is placed below status bar
    let STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0//NativeModules.StatusBarManager.HEIGHT 


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      paddingToMoveBelowStatusBar: {
        width: "100%",
        height: STATUSBAR_HEIGHT + 2,
        color: "transparent",
        backgroundColor: "transparent"
      }
    });
    
     

    return (
      
        <Provider store={store}>
          <View style={styles.container}>
              <StatusBar hidden={false}/>
              
              <View style={styles.paddingToMoveBelowStatusBar}>
                    {/* padding to move below status bar */}
              </View>

              <PercentCalculator />
          </View>
       </Provider>
    );
  }
}

 

export default App