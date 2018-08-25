import React, { Component } from 'react'
import {StyleSheet,View, Text, Dimensions} from 'react-native'
import { connect } from "react-redux";
import * as helpers from '../helpers.js'
import IconOfTape  from "./IconOfTape";





class Screen extends Component {
  
  
  render() {


    let {segmentsArray, currentSegmentIndex, screenMainTextLine1, 
        screenLiveAnswerLine, screenMidScreenMessage} = this.props
    
    

    //THE REAL DATA IS IN THE SEGMENTSARRAY[].STRINGVALUE WHICH ARE NOT ALTERED,
    //, HERE WE ALTER THE COPIES OR 
    //ALTER THE OTHER FIELDS IN THE SEGMENTS ARRAY WHICH CHANGE CONSTANTLY AND CAN
    //BE DEDUCED FROM THE SEGMENTSARRAY[].STRINGVALUE FIELD.

    //NOTE: ALLL THE ALTERING FOR USER DISPLAY IS DONE HERE IN SCREEN.JS, AND DONT ALTER
    //THE UNDERLYING DATA SEGMENTSARRAY[].STRINGVALUE 

    //WHEN GETS HERE, ANSWER IS ALREADY CALCULATED AND STORED IN SCREENLIVEANSWERLINE
    //, WE ALTER THE MIRROR HERE ONLY FOR DISPLAY, THE REAL ANSWER STORED 
    //IS UNALTERED.



    console.log('AT SCREEN.JS: REAL SEGMENTS ARRAY BEFORE ALTERING FOR USER DISPLAY IS: ',segmentsArray)
    console.log('AT SCREEN.JS: LIVEANSWERLINE BEFORE ALTERING FOR USER DISPLAY IS: ',screenLiveAnswerLine)


    //truncate the decimal places, for user display only, internally not truncated
    //for keeping precision
    //do this first before inserting thousands separators which would error
    screenLiveAnswerLine = helpers.truncateDecimalPlacesOfString(screenLiveAnswerLine) 


    ////MUST ADD EXTRA DETAILS BEFORE ADDING SEPARATORS. WONT WORK IF HAVE
    //SEPARATORS IN THE STRING TO PASS TO ADDEXTRADETAILS
    ///add extra details
    //now add the extra text details to the result, e.g '% change' 
    // , result is e.g 255 , we add %sign and 'increase' in, becomes 255% (increase)
    //this method requires answer string, and whole calculation tring
    screenLiveAnswerLine = helpers.addExtraDetailsTextToAnswer(screenLiveAnswerLine, helpers.collateStringsIntoOneString(segmentsArray))

    //insert thousands separators, for display to screen only, 
    //dont alter the segments array[].stingvalue which created the screenMainTextLine1.
    screenMainTextLine1 = helpers.insertThousandsSeparatorsForWholeCalculation(segmentsArray)
    screenLiveAnswerLine = helpers.insertThousandsSeparatorsForOneSingleNumberString(screenLiveAnswerLine)




    console.log('AT SCREEN.JS: REAL SEGMENTS ARRAY AFTER ALTERING FOR USER DISPLAY IS: ',segmentsArray)
    console.log('AT SCREEN.JS: LIVEANSWERLINE AFTER ALTERING FOR USER DISPLAY IS: ',screenLiveAnswerLine)




    
    let fontSizeOfScreenMainLine1;//default
    ////////fontsize for mainline1
    let allowedLengthBeforeShrinking = 75

    let overflow = screenMainTextLine1.length - allowedLengthBeforeShrinking//allow 50 chars before shrinking
    if(overflow < 0) {//error check
        overflowFromInitialExpectedLength = 0
    }

    // console.log('AT SCREEN, SCREENMAINTEXTLINE1 IS: ', screenMainTextLine1)

    //large fontsize for initial x number of characters, before start shrinking
    if(screenMainTextLine1.length <= allowedLengthBeforeShrinking) {
        //length is within allowed initial length, gets large font
        fontSizeOfScreenMainLine1 = Dimensions.get('window').width/11.5
    }
    else {//length is OVER allowed initial limit, now smaller font and start shrinking as length gets longer
        fontSizeOfScreenMainLine1 = Dimensions.get('window').width/13 - ((overflow * 0.05))
    }
    

    let allowedLengthOfLiveAnswerLineBeforeShrinking = 16
    let excess = screenLiveAnswerLine.length - allowedLengthOfLiveAnswerLineBeforeShrinking
    if (excess < 0) {
      excess = 0
    }

    fontSizeOfScreenLiveAnswerLine = Dimensions.get('window').width/16 - ((excess * 0.1))


    let styles = StyleSheet.create({
      screen: {
        flex: 1,
        flexWrap: "wrap",
        backgroundColor: "yellow",
        width: "100%",
        paddingLeft: this.calculatorScreenHeight/25,//defined in <view></view>
        paddingRight: this.calculatorScreenHeight/27,
        paddingBottom: 0,
        paddingTop: 0
      },
      screenMainTextLine1Style: {
        display: "flex",
        flex:1, 
        width: "100%",
        marginTop: fontSizeOfScreenMainLine1/6,
        fontSize: fontSizeOfScreenMainLine1,//32,
        lineHeight: fontSizeOfScreenMainLine1 + (fontSizeOfScreenMainLine1/12),
        color: "black",
        backgroundColor: "white",
        textAlign: "left",
        flexWrap: "wrap"
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
        backgroundColor: "transparent",
        textAlign: "center",
        flexWrap: "wrap"
      },
      // midScreenMsgContainer: {

      // }
      midScreenMsgContainer: {
        flex: 1,
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent"
      },
      midScreenMessageText: {
        fontSize: fontSizeOfScreenMainLine1,
        color: "black"
      },
      iconsContainer: {
        flex: 1,
        flexDirection: "row",
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: "transparent",
        paddingLeft: 10,
        paddingRight: 10
      },
      iconsText: {
        fontSize: fontSizeOfScreenMainLine1*0.5,
        color: "gray"
      }
    })





    return(
      <View style={styles.screen}>
        <Text style={styles.screenMainTextLine1Style}>{screenMainTextLine1}</Text>
        <Text style={styles.screenLiveAnswerLineStyle}>{screenLiveAnswerLine}</Text>
        <View style={styles.midScreenMsgContainer}>
            <Text style={styles.midScreenMessageText}>{screenMidScreenMessage}</Text>
        </View>
        
        <View style={styles.iconsContainer}>
          <IconOfTape/>
        </View>
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