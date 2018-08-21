import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'


class ButtonBackSpace extends React.Component {

    constructor() {
        super()
        //some how, if we leave this binding out, there will be an error: this.handleCalcButtonCliced 
        //is not a function. shouldnt need this line but will error without it. we do 
        //the constructor function just to do this. weird.
        this.handleCalcButtonClicked = this.handleCalcButtonClicked.bind(this)
    }
    

 

    handleCalcButtonClicked = (buttonValue) => {

        console.log('GOT TO PROCESS BKSPCE KEYS')
        
        let {segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots} = this.props 
        
        let emptyScreenMainLineFlag = (segmentsArray || "").length <= 0


        
        if(emptyScreenMainLineFlag) {//if empty array/screen, no action
            // console.log('BACKSPACE BUTTON , IGNORE WHEN SEGMENTSARRAY IS EMPTY')
            return //dont process below code
        }

 
        //if there is only 1 snapshot left in the timemachine array, means at last char
        //so do a clearall and return, treat it as a clearall
        if(timeMachineArrayOfSegmentsArraySnapShots.length <=1) {
             
            //CLEARALL BLOCK///////////////////////////
            //collate stirng from all segments     
            let screenMainTextLine1 = ""
            let screenLiveAnswerLine = ""
            let screenMidScreenMessage = "Ready"
            let segmentsArray = []
            let currentSegmentIndex = 0
            let timeMachineArrayOfSegmentsArraySnapShots = []
            //clearall
            this.props.dispatch(updateCalculatorData(
                screenMainTextLine1,
                screenLiveAnswerLine,
                screenMidScreenMessage,
                segmentsArray, 
                currentSegmentIndex, 
                timeMachineArrayOfSegmentsArraySnapShots
            ))
            //////////////////////////////////////////////////
            return//done , dont process below
        }//if
    
    
        //if gets here, measns there are at least 2 snapshots
    
    
        //copy snapshot of previous state into segments array
    
        timeMachineArrayOfSegmentsArraySnapShots.pop()//remove current snapshot
        console.log('**AT BACKSPACE KEY: AFTER POPPING LAST SNAPSHOT, THE TIMEMACHINEARRAY IS ',timeMachineArrayOfSegmentsArraySnapShots)
        let indexOfLastSnapShot = timeMachineArrayOfSegmentsArraySnapShots.length -1
        console.log('**AT BACKSPACE KEY: INDEXOFLASTSNAPSHOT IS:',indexOfLastSnapShot)
        
        //copy snapshot into segmnts array, do deep copy so wont point to original
        segmentsArray = JSON.parse(JSON.stringify(timeMachineArrayOfSegmentsArraySnapShots[indexOfLastSnapShot].segmentsArraySnapShot))
        console.log('**AT BACKSPACE KEY: AFTER COPYING FROM SNAPSHOT, THE SEGMENTS ARRAY IS ',segmentsArray)
    
        //update the index of new segmentsarray to the last segment in that array
        //ready for next input
        currentSegmentIndex = segmentsArray.length - 1
    
        //collate stirng from all segments and update store which will update screen textline  
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
            calcButtonTextForBackArrow: {
                fontSize: fontSizeOfStandardButton*1.2,
                color: "white",
            },
        })


        return(
            <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("«")}}>
                <Text style={styles.calcButtonTextForBackArrow}>«</Text>
            </TouchableOpacity>
        )
    }

}



const mapStateToProps = (state) => ({
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    timeMachineArrayOfSegmentsArraySnapShots: state.calculatorStateData.timeMachineArrayOfSegmentsArraySnapShots
})


export default connect(mapStateToProps)(ButtonBackSpace)