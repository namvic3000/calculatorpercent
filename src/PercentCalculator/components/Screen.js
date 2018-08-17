import React, { Component } from 'react'
import {StyleSheet,View, Text, Dimensions} from 'react-native'
import { connect } from "react-redux";
import * as helpers from '../helpers.js'





class Screen extends Component {


  render() {



    // let {segmentsArray, currentSegmentIndex} = this.props 

    // let calculationTextLine = helpers.collateStringsIntoOneString(segmentsArray)
    // let liveAnswer = 'live anser here'//helpers.calculateResultOfWholeCalculation(helpers.collateStringsIntoOneString(segmentsArray))
    
    
    // console.log('AT SCREEN: SEGMENTS ARRAY IS:', segmentsArray)
    // console.log('AT SCREEN: CALCULATOIN TEXTLINE IS:'+ calculationTextLine)
    
    
    ////////fontsize for mainline1
    let allowedLengthBeforeShrinking = 50
    let overflow = this.props.screenMainTextLine1.length - allowedLengthBeforeShrinking//allow 50 chars before shrinking
    if(overflow < 0) {//error check
        overflowFromInitialExpectedLength = 0
    }

    //large fontsize for initial x number of characters, before start shrinking
    if(this.props.screenMainTextLine1.length <= allowedLengthBeforeShrinking) {
        //length is within allowed initial length, gets large font
        fontSizeOfScreenMainLine1 = Dimensions.get('window').width/10
    }
    else {//length is OVER allowed initial limit, now smaller font and start shrinking as length gets longer
        fontSizeOfScreenMainLine1 = Dimensions.get('window').width/12 - ((overflow * 0.1))
    }
    



    ///////////fontsize for live answer line at bottom of screen
    // allowedLengthOfLiveAnswerLineBeforeShrinking = 20
    // let excess = this.props.screenAnswerLineContent.length - allowedLengthOfLiveAnswerLineBeforeShrinking
    // this.fontSizeOfScreenLiveAnswerLine = Dimensions.get('window').width/12 - ((overflow * 0.1))
    this.fontSizeOfScreenLiveAnswerLine = 15//Dimensions.get('window').width/12 - ((overflow * 0.1))



    let styles = StyleSheet.create({
      screen: {
        flex: 1,
        flexWrap: "wrap",
        backgroundColor: "yellow",
        width: "100%",
        paddingLeft: this.calculatorScreenHeight/25,//defined in <view></view>
        paddingRight: this.calculatorScreenHeight/27,
        paddingBottom: 0,//-this.calculatorScreenHeight/40,
        paddingTop: 0//this.calculatorScreenHeight/18,
      },
      screenMainTextLine1: {
        display: "flex",
        // flexDirection: "row",
        flex:1, 
        width: "100%",
        marginTop: this.fontSizeOfScreenMainLine1/6,
        fontSize: this.fontSizeOfScreenMainLine1,//32,
        lineHeight: this.fontSizeOfScreenMainLine1 + (this.fontSizeOfScreenMainLine1/12),
        color: "black",
        backgroundColor: "white",
        textAlign: "left",
        flexWrap: "wrap"
        
        // height: "25%",
      },
      screenLiveAnswerLine: {
        position: "absolute",
        display: "flex",
        height: "auto",
        width: "100%",
        bottom: 0,
        marginTop: this.fontSizeOfScreenMainLine1/6,
        fontSize: this.fontSizeOfScreenLiveAnswerLine,
        lineHeight: this.fontSizeOfScreenMainLine1 + (this.fontSizeOfScreenMainLine1/12),
        color: "gray",
        backgroundColor: "lightyellow",
        textAlign: "center",
        flexWrap: "wrap"
      },
    })


    return(
      <View style={styles.screen} onLayout={ e => {this.calculatorScreenHeight = e.nativeEvent.layout.height}}>
        <Text style={styles.screenMainTextLine1}>{this.props.screenMainTextLine1}</Text>
        <Text style={styles.screenLiveAnswerLine}>{this.props.screenLiveAnswerLine}</Text>
      </View>
    )
  }
}
 



const mapStateToProps = (state) => ({
  screenMainTextLine1: state.calculatorStateData.screenMainTextLine1,
  screenLiveAnswerLine: state.calculatorStateData.screenLiveAnswerLine,
  screenMidScreenMessage: state.calculatorStateData.screenMidScreenMessage,
  segmentsArray: state.calculatorStateData.segmentsArray,
  currentSegmentIndex: state.calculatorStateData.currentSegmentIndex
})



export default connect(mapStateToProps)(Screen)