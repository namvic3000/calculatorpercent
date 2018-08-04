import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, onLayout} from 'react-native';
import {connect} from 'react-redux'
import Keyboard from "./Keyboard"
import Screen from "./Screen"
import {updateCurrentOperandNumber} from '../../actions/keyboardActions'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// type Props = {};

class PercentAndStandardCalculator extends Component {
 
  
  render() {

    // this.calculatorScreenWidth = Dimensions.get('window').width
    // this.calculatorScreenLine1FontSize = this.calculatorScreenWidth / 6
    // console.log('*****screenwidth is, and fontsize is : ' + this.calculatorScreenWidth + this.calculatorScreenLine1FontSize)
    
    // this.calculatorScreenHeight = Dimensions.get('window').width
    this.calculatorScreenLine1FontSize = this.calculatorScreenHeight / 4
    console.log('*****screenheight is' + this.calculatorScreenHeight)
    

    const styles = StyleSheet.create({
      pageContainer: {
        flex: 1,
        width: "100%",
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'black',
      },
      screenContainer: {
          flex: 1,
          backgroundColor: "green",
          width: "100%"
      },
      keyboardContainer: {
          flex: 2,
          backgroundColor: "blue",
          width: "100%"
      },
    })
    







    return (
      <View style={styles.pageContainer}>
        
        {/* <View style={styles.screenContainer}>
            <Screen/>
        </View> */}
        
        <View style={styles.keyboardContainer}>
            <Keyboard/>
        </View>
      
      </View>
    );
  }
}
 

const mapStateToProps = (state) => ({
    currentOperandNumber: state.keyBoardStatus.currentOperandNumber
})

export default connect(mapStateToProps)(PercentAndStandardCalculator)