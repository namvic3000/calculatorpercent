import React, { Component } from 'react'
import {StyleSheet,View, Text, } from 'react-native'


let styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "pink",
        width: "100%",
        paddingLeft: this.calculatorScreenHeight/30,
        paddingRight: this.calculatorScreenHeight/30,
        paddingBottom: 0,//-this.calculatorScreenHeight/40,
        paddingTop: this.calculatorScreenHeight/18,
      },
      line1CalculatorInput: {
        display: "flex",
        flexDirection: "row",
        flex:1, 
        width: "100%",
        fontSize: this.calculatorScreenLine1FontSize,//32,
        lineHeight: this.calculatorScreenLine1FontSize + (this.calculatorScreenLine1FontSize/5.5),
        color: "black",
        backgroundColor: "white",
        // height: "25%",
        width: "100%"
      },
    
      line2CalculatorInput: {
        display: "flex",
        flexDirection: "row",
        flex:1,
        fontSize: 36,
        color: "blue",
        // height: "25%",
        width: "100%"
      },
    
      line3CalculatorInput: {
        display: "flex",
        flexDirection: "row",
        flex:1,
        fontSize: 36,
        color: "blue",
        // height: "25%",
        width: "100%"
      },
      line4CalculatorInput: {
        display: "flex",
        flexDirection: "row",
        flex:1,
        fontSize: 36,
        color: "blue",
        // height: "25%",
        width: "100%"
      }
})


class Screen extends Component {


  render() {
    return (
        <View style={styles.screen} onLayout={ e => {this.calculatorScreenHeight = e.nativeEvent.layout.height}}>
            {/* <Text style={styles.line1CalculatorInput}>{this.state.line1CalculatorInput}</Text> */}
            {/* <Text style={styles.line2CalculatorInput}>{this.state.line1CalculatorInput}</Text>
            <Text style={styles.line3CalculatorInput}>{this.state.line1CalculatorInput}</Text>
            <Text style={styles.line4CalculatorInput}>{this.state.line1CalculatorInput}</Text> */}
            <Text>THIS IS THE SCREEN</Text>
        </View>
    )
  }
}
 
export default Screen