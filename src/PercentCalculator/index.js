import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, onLayout} from 'react-native';
import {connect} from 'react-redux'
import CalculatorWhole from "./components/CalculatorWhole"


class PercentCalculator extends Component {
 
  
  render() {

    // this.calculatorScreenWidth = Dimensions.get('window').width
    // this.calculatorScreenLine1FontSize = this.calculatorScreenWidth / 6
    // console.log('*****screenwidth is, and fontsize is : ' + this.calculatorScreenWidth + this.calculatorScreenLine1FontSize)
    
    // // this.calculatorScreenHeight = Dimensions.get('window').width
    // this.calculatorScreenLine1FontSize = this.calculatorScreenHeight / 4
    // console.log('*****screenheight is' + this.calculatorScreenHeight)
    

    const styles = StyleSheet.create({
      pageContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: 'black',
      },
      keyboardAndScreenContainer: {
          flex: 1,
          backgroundColor: "blue",
          width: "100%"
      },
    })
    

 

    return (
      <View style={styles.pageContainer}>
        
        <View style={styles.keyboardAndScreenContainer}>
            <CalculatorWhole/>
        </View>
      
      </View>
    );
  }
}
 
 



export default PercentCalculator