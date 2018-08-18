import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'






class ButtonDeciPoint extends React.Component {

    constructor() {
        super()
        //some how, if we leave this binding out, there will be an error: this.handleCalcButtonCliced 
        //is not a function. shouldnt need this line but will error without it. we do 
        //the constructor function just to do this. weird.
        this.handleCalcButtonClicked = this.handleCalcButtonClicked.bind(this)
    }
    



    handleCalcButtonClicked = (buttonValue) => {

        
        let {segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots} = this.props 
        
        let emptyScreenMainLineFlag = (segmentsArray || "").length<=0

        let allowToTakeSnapShotOfState = true
        

        //ok if user presses  decipoint key when screen is empty
        if(emptyScreenMainLineFlag) {
            segmentsArray[0] = {}//create empty object
            segmentsArray[0].stringValue = '0.'

            //save to timemachine
            if(allowToTakeSnapShotOfState) {
                //take a snapshot and return
                timeMachineArrayOfSegmentsArraySnapShots = helpers.takeASnapShotOfCurrentCalculationState(segmentsArray, timeMachineArrayOfSegmentsArraySnapShots)
            }
            
            //collate stirng from all segments and update store
            let screenMainTextLine1 = helpers.collateStringsIntoOneString(segmentsArray)
            let screenLiveAnswerLine = helpers.calculateResultOfWholeCalculation(screenMainTextLine1) 
            let screenMidScreenMessage = ''
            
            this.props.dispatch(updateCalculatorData(
                screenMainTextLine1,
                screenLiveAnswerLine,
                screenMidScreenMessage,
                segmentsArray, 
                currentSegmentIndex, 
                timeMachineArrayOfSegmentsArraySnapShots
            ))

            return//dont process below code
        }

 


        let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
        let currentSegmentString = segmentsArray[currentSegmentIndex].stringValue
        

        //note: current segment is never empty, except when whole array
        //is empty at start or after CA, so no need to check that condition

        //if currentsegment is a number then add . if not existed alreay
        if(currentSegmentIsANumberFlag) {
            //add only if not already exists
            if( ! /[.]/.test(currentSegmentString)) { //if not already on this number
                //decipoint not yet exist, add it

                //if string has a ')' closing bracket, locked, then cant add a decipoint to a bracket
                //becuase closing brackets means number is locked, cant alter it.
                if(/\)/.test(currentSegmentString)) {
                    //ignore, no action
                    //dont take snapshot
                    allowToTakeSnapShotOfState = false 
                }
                else {//may have naked number e.g 35 or has ']' eg '35]' or '35%]'
                    //append decpoint to last numeral, e.g 3%] becomes 3.%] or 3% becomes 3.%
                    //or 3 becomes 3. 

                    //find index of last numeral and insert the decipoint right after it

                    //find length of returned array, to find out number of numerals existing
                    let numberLength = (currentSegmentString.match(/[0-9]/g) || []).length //starts from 0, 
                    //remembr to put in the G flag, else would return first match only
                    
                    //get index of first number
                    let indexOfFirstNumeral = currentSegmentString.search(/[0-9]/)
                    //deduce index of last numeral
                    let indexOfLastNumeral = indexOfFirstNumeral + (numberLength - 1)
                    //insert the decipoint
                    let portion1 = currentSegmentString.slice(0, indexOfLastNumeral + 1)//+1 to include last numeral
                    let portion2 = currentSegmentString.slice(indexOfLastNumeral + 1)//to eo stirng
                    //copy back to real string
                    segmentsArray[currentSegmentIndex].stringValue = portion1 + '.' + portion2
                }
                    
            }
            else {
                //decipoint already exists, igonore decipoint key input
                //dont take snapshot
                allowToTakeSnapShotOfState = false
            }
        }
        else //if is just a % sign, and user presses . decipoint, then becomes 0.%
            if(currentSegmentString.length === 1 && /\%/.test(currentSegmentString)) {// only 1 char, and it is a %sign
                segmentsArray[currentSegmentIndex].stringValue = '0.%'   
            }
            else {//curr segment is an operator or empty
                //move to next segment and add 0.
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {}//create
                segmentsArray[currentSegmentIndex].stringValue = '0.'
            }


 

        
        //save to timemachine
        if(allowToTakeSnapShotOfState) {
            //take a snapshot and return
            timeMachineArrayOfSegmentsArraySnapShots = helpers.takeASnapShotOfCurrentCalculationState(segmentsArray, timeMachineArrayOfSegmentsArraySnapShots)
        }
        
         //collate stirng from all segments and update store
         let screenMainTextLine1 = helpers.collateStringsIntoOneString(segmentsArray)
         let screenLiveAnswerLine = helpers.calculateResultOfWholeCalculation(screenMainTextLine1) 
         let screenMidScreenMessage = ''
         
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
            calcButtonText: {
                fontSize: fontSizeOfStandardButton,
                color: "white",
                textAlign: 'center'
            },
        })



        return(
            <TouchableOpacity style={styles.standardButtonContainer} 
                            onPress={()=> {this.handleCalcButtonClicked(".")}}>
                <Text style={styles.calcButtonText}>.</Text>
            </TouchableOpacity>
        )
    }

}




const mapStateToProps = (state) => ({
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    timeMachineArrayOfSegmentsArraySnapShots: state.calculatorStateData.timeMachineArrayOfSegmentsArraySnapShots
})


export default connect(mapStateToProps)(ButtonDeciPoint)