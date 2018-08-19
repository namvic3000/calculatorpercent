import React, { Component } from 'react'
import {StyleSheet,View, Text, Dimensions} from 'react-native'
import { connect } from "react-redux";
import * as helpers from '../helpers.js'





class Screen extends Component {


  render() {


    let fontSizeOfScreenMainLine1;//default
    let {screenMainTextLine1, screenLiveAnswerLine} = this.props



    ////////fontsize for mainline1
    let allowedLengthBeforeShrinking = 40
    let overflow = screenMainTextLine1.length - allowedLengthBeforeShrinking//allow 50 chars before shrinking
    if(overflow < 0) {//error check
        overflowFromInitialExpectedLength = 0
    }

    console.log('AT SCREEN, SCREENMAINTEXTLINE1 IS: ', screenMainTextLine1)

    //large fontsize for initial x number of characters, before start shrinking
    if(screenMainTextLine1.length <= allowedLengthBeforeShrinking) {
        //length is within allowed initial length, gets large font
        fontSizeOfScreenMainLine1 = Dimensions.get('window').width/11.5
    }
    else {//length is OVER allowed initial limit, now smaller font and start shrinking as length gets longer
        fontSizeOfScreenMainLine1 = Dimensions.get('window').width/13 - ((overflow * 0.05))
    }
    
    allowedLengthOfLiveAnswerLineBeforeShrinking = 12
    let excess = screenLiveAnswerLine.length - allowedLengthOfLiveAnswerLineBeforeShrinking
    
    fontSizeOfScreenLiveAnswerLine = Dimensions.get('window').width/16 - ((overflow * 0.1))



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
      screenMainTextLine1Style: {
        display: "flex",
        // flexDirection: "row",
        flex:1, 
        width: "100%",
        marginTop: fontSizeOfScreenMainLine1/6,
        fontSize: fontSizeOfScreenMainLine1,//32,
        lineHeight: fontSizeOfScreenMainLine1 + (fontSizeOfScreenMainLine1/12),
        color: "black",
        backgroundColor: "white",
        textAlign: "left",
        flexWrap: "wrap"
        
        // height: "25%",
      },
      screenLiveAnswerLineStyle: {
        position: "absolute",
        display: "flex",
        height: "auto",
        width: "100%",
        bottom: 0,
        marginTop: fontSizeOfScreenMainLine1/6,
        fontSize: fontSizeOfScreenLiveAnswerLine,
        lineHeight: fontSizeOfScreenLiveAnswerLine,// + (fontSizeOfScreenLiveAnswerLine/12),
        color: "gray",
        backgroundColor: "lightyellow",
        textAlign: "center",
        flexWrap: "wrap"
      },
    })


    return(
      <View style={styles.screen} onLayout={ e => {this.calculatorScreenHeight = e.nativeEvent.layout.height}}>
        <Text style={styles.screenMainTextLine1Style}>{screenMainTextLine1}</Text>
        <Text style={styles.screenLiveAnswerLineStyle}>{screenLiveAnswerLine}</Text>
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