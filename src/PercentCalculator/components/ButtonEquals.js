import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'






class ButtonAddPercent extends React.Component {

    constructor() {
        super()
        //some how, if we leave this binding out, there will be an error: this.handleCalcButtonCliced 
        //is not a function. shouldnt need this line but will error without it. we do 
        //the constructor function just to do this. weird.
        this.handleCalcButtonClicked = this.handleCalcButtonClicked.bind(this)
    }
    



    handleCalcButtonClicked = (buttonValue) => {

        
        let {segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots} = this.props 

        let allowToTakeSnapShotOfState = true
        
        let emptyScreenMainLine = (segmentsArray || []).length <= 0



        
        //ignore key if screen is empty, alert user to enter a number first
        if(emptyScreenMainLine) {
            // alert('Enter a Number First')
            return//dont process below code
        }



        //clear any trailing decimal point if exist, every time press on 
        //arith operator or percent operator or close bracket
        helpers.cleanUpAllTrailingDeciPoints(segmentsArray)

        
    
        let answer = this.props.screenLiveAnswerLine//helpers.calculateResultOfWholeCalculation(helpers.collateStringsIntoOneString(segmentsArray))
        answer = helpers.truncateDecimalPlacesOfString(answer)
        //dont insert thousand separators because this is the reeal string, not 
        //user mirror string for user to see only
        
        //add answer as ann input segment to segments array, so becomes part of
        //screenmainline1 so other methods such as truncate decipoint and insert
        //thousandss separators can go through each segment which would include hthe
        //answer.
        currentSegmentIndex++//move forward 1 spot
        segmentsArray[currentSegmentIndex] = {}//create object
        segmentsArray[currentSegmentIndex].stringValue = '\n =\u00A0' + answer

        
        
      

        //save to timemachine
        if(allowToTakeSnapShotOfState) {
            //take a snapshot and return
            timeMachineArrayOfSegmentsArraySnapShots = helpers.takeASnapShotOfCurrentCalculationState(segmentsArray, timeMachineArrayOfSegmentsArraySnapShots)
        }
        
        //collate stirng from all segments and update store
        let screenMainTextLine1 = helpers.collateStringsIntoOneString(segmentsArray)
                                    + '\n =\u00A0' + answer// \u00A0 is unicode for &nbsp;
        let screenLiveAnswerLine = ""//helpers.calculateResultOfWholeCalculation(screenMainTextLine1) 
        let screenMidScreenMessage = ''
        
        console.log('EQUALS BUTTON: MAINSCREENLINE1 TO SEND TO REDUCER IS' + screenMainTextLine1)
        this.props.dispatch(updateCalculatorData(
            screenMainTextLine1,
            screenLiveAnswerLine,
            screenMidScreenMessage,
            segmentsArray, 
            currentSegmentIndex, 
            timeMachineArrayOfSegmentsArraySnapShots
        ))

    }//handleclick





    render() {

        let standardButtonWidth = Dimensions.get('window').width/5

        let fontSizeOfStandardButton = standardButtonWidth/2.8


        let styles = StyleSheet.create({
            standardButtonContainer: {
                //container for each individual button
                flex: 1,//each button has equal width, because the flexdir is now 'row'
                alignItems: 'center',
                justifyContent: 'center',
                color: 'blue',
                backgroundColor: "darkblue",//"rgb(250,250,255)",
                borderWidth: 0,
                height: "100%",
            },
            calcButtonTextForEquals: {
                fontSize: fontSizeOfStandardButton*1.2,
                color: "white",
            },
        })



        return(
            <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("=")}}>
                <Text style={styles.calcButtonTextForEquals}>=</Text>
            </TouchableOpacity>
        )
    }

}




const mapStateToProps = (state) => ({
    screenLiveAnswerLine: state.calculatorStateData.screenLiveAnswerLine,
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    timeMachineArrayOfSegmentsArraySnapShots: state.calculatorStateData.timeMachineArrayOfSegmentsArraySnapShots
})


export default connect(mapStateToProps)(ButtonAddPercent)






