import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'






class ButtonNegSign extends React.Component {

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

        //ignnore if user presses -sign key when screen is empty
        if(emptyScreenMainLineFlag) {
            return //no action
        }


 




        console.log('GOT TO PROCESS OPERATOR -SIGN')

        let allowToTakeSnapShotOfState = true 
    
        let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
            
        //if segment has a close round bracket , no more input, no changing -ssign also
        if(/\)/.test(segmentsArray[currentSegmentIndex].stringValue)) {
            //return as is, segment has a ) close round bracket, locked, can 
            //not be changed
            return
        }
    
    
        //if segment is a number, ok, can toggle sign,
        //if is ooperator, then ignore key input
    
        //toggle the - sign
        if(currentSegmentIsANumberFlag) {
    
            //if has - sign, then remove it
            if(/\-/.test(segmentsArray[currentSegmentIndex].stringValue)) {//-sign exists
                //remove the - sign, in real string
                segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue.replace(/\-/,'')
            }
            else {//no -sign present, add it
                //need to find start index of numeral, coz could be ((5 , to become ((-5
                let indexOfFirstNumeral = segmentsArray[currentSegmentIndex].stringValue.search(/[0-9]/)
                let tempStr = segmentsArray[currentSegmentIndex].stringValue
                segmentsArray[currentSegmentIndex].stringValue = tempStr.slice(0, indexOfFirstNumeral) 
                    + '-' + tempStr.slice(indexOfFirstNumeral)
            }
        }
        else {
            //is ann operator, ignore
            //dont take a snapshot
            allowToTakeSnapShotOfState = false
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
            <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("+-")}}>
                <Text style={styles.calcButtonText}>+-</Text>
            </TouchableOpacity>
        )
    }

}






const mapStateToProps = (state) => ({
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    timeMachineArrayOfSegmentsArraySnapShots: state.calculatorStateData.timeMachineArrayOfSegmentsArraySnapShots
})


export default connect(mapStateToProps)(ButtonNegSign)