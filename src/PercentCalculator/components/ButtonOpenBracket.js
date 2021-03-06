import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'
import { updateSkinData } from "../../../actions/skinDataActions";






class ButtonOpenBracket extends React.Component {

    constructor() {
        super()
        //some how, if we leave this binding out, there will be an error: this.handleCalcButtonCliced 
        //is not a function. shouldnt need this line but will error without it. we do 
        //the constructor function just to do this. weird.
        this.handleCalcButtonClicked = this.handleCalcButtonClicked.bind(this)
    }
    



    handleCalcButtonClicked = (buttonValue) => {

        

        ////check if in skinn color selection mode, if so, indicate that
        //that component to chage is keysSet1
        if(this.props.skinData.skinSelectionModeActiveStatus) {
            //component to chanage is keyset1

            //leave everything same, except set keys to change to keysset1
            //and showcolorpicker to true.
            let dataObject = {
                showColorPickerStatus: true,//show color picker now
                skinSelectionModeActiveStatus: this.props.skinData.skinSelectionModeActiveStatus,
                currentComponentSkinToBeChanged: 'memoryButtonsColor',
                memoryBoxesColor: this.props.skinData.memoryBoxesColor,
                memoryButtonsColor: this.props.skinData.memoryButtonsColor,
                percentButtonsColor: this.props.skinData.percentButtonsColor,
                keysSet1Color: this.props.skinData.keysSet1Color,
                keysSet2Color: this.props.skinData.keysSet2Color,
                buttonSmallsColor: this.props.skinData.buttonSmallsColor
            }

            this.props.dispatch(updateSkinData(dataObject))


            //show message to pick a color

            //show 'select component to change' message
            ///CLEARALL
            //collate stirng from all segments     
            let screenMainTextLine1 = ""
            let screenLiveAnswerLine = ""
            let screenMidScreenMessage = "use picker to choose color"
            segmentsArray = []
            currentSegmentIndex = 0
            timeMachineArrayOfSegmentsArraySnapShots = []
            //clearall
            this.props.dispatch(updateCalculatorData(
                screenMainTextLine1,
                screenLiveAnswerLine,
                screenMidScreenMessage,
                segmentsArray, 
                currentSegmentIndex, 
                timeMachineArrayOfSegmentsArraySnapShots
            ))

            return;//dont process below code
        }



        let {segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots} = this.props 
        
        let emptyScreenMainLineFlag = (segmentsArray || "").length<=0

        let allowToTakeSnapShotOfState = true


        
        //ok if user presses  open bracket key when screen is empty
        if(emptyScreenMainLineFlag) {

            segmentsArray = []
            segmentsArray[0] = {}//create empty object
            segmentsArray[0].stringValue = '('
                 
            timeMachineArrayOfSegmentsArraySnapShots = []//reset for new calculation            
            timeMachineArrayOfSegmentsArraySnapShots = helpers.takeASnapShotOfCurrentCalculationState(segmentsArray, timeMachineArrayOfSegmentsArraySnapShots)
            
            
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

  
 


        //if previous calculation has been completed, and the answer has been
        //presented
        //check for '=' sign to tell if answer been presented
        
        if(/\=/.test(segmentsArray[currentSegmentIndex].stringValue)) {
            // console.log('******THERE IS = SIGN IN CURRENT SEGMENT, SO WILLL CLEARALL')
            
            //reset
            segmentsArray = []
            currentSegmentIndex = 0

            //add input to segment
            segmentsArray[0] = {}//create empty object
            segmentsArray[0].stringValue = "("
            
            //reset for each new calculation
            timeMachineArrayOfSegmentsArraySnapShots = []//
            //take a snapshot ready for backspace action
             timeMachineArrayOfSegmentsArraySnapShots = helpers.takeASnapShotOfCurrentCalculationState(segmentsArray, timeMachineArrayOfSegmentsArraySnapShots)
           
             //collate stirng from all segments ready to send to reducer for update 
            let screenMainTextLine1 = helpers.collateStringsIntoOneString(segmentsArray)
            let screenLiveAnswerLine = helpers.calculateResultOfWholeCalculation(screenMainTextLine1) 
            let screenMidScreenMessage = ''
            
            //update store
            this.props.dispatch(updateCalculatorData(
                screenMainTextLine1,
                screenLiveAnswerLine,
                screenMidScreenMessage,
                segmentsArray, 
                currentSegmentIndex, 
                timeMachineArrayOfSegmentsArraySnapShots
            ))
            
            return //dont process below code
            
        }






 

    ///can only enter a open bracket if current segment is 
    //empty then ok to add openbracket, or is arithmetic of percent operator,
    // e.g 'of' 'to' '+' 'x' 'add' etc...
    //then jump to next segment then add the open bracket
    
    //first detect if current segment is either arith or percent operator or not
    let currentSegmentIsAnArithOrPercentOperatorFlag = /(\+|-|x|÷|of|add|deduct|to|is|then|deducted|added)/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
 //console.log('AT PROCESS BRACKET OPEN, CURENTSEGENT IS A OPERATOR FLAG IS ' + currentSegmentIsAnArithOrPercentOperatorFlag)
    
    let currentSegmentHasPercentSignFlag = /\%/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean


    let currentSegmentAlreadyHasOpenBracket = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
    
    let isEmptySegmentFlag = segmentsArray[currentSegmentIndex].stringValue.length <= 0
 //console.log('AT PROCESS BRACKET OPEN, ISEMPTYSEGMENT FLAG IS ' + isEmptySegmentFlag)
     

    //work out how many outstanding open brackets there are in whole
    //array
    //first scan array and determine nett value of brackets
    let collatedString = helpers.collateStringsIntoOneString(segmentsArray)
    let tempArr = collatedString.match(/\(/g) || []//if not found
    let numberOfOpenBracketsInWholeArray = tempArr.length
 //console.log('AT BRAKET OPEN, NUMBER OF OPEN BRACKETS COUNT IS :' + numberOfOpenBracketsInWholeArray)
    tempArr = collatedString.match(/\)/g) || []  
    numberOfCloseBracketsInWholeArray = tempArr.length
 //console.log('AT BRAKET OPEN, NUMBER OF CLOSE BRACKETS COUNT IS :' + numberOfCloseBracketsInWholeArray)
    
    let numberOfTotalOpenBracketsOutstandingInWholeArray = numberOfCloseBracketsInWholeArray - numberOfOpenBracketsInWholeArray
 //console.log('AT BRAKET OPEN, NUMBER OF OPEN BRACKETS OUTSTNDING IS :' + numberOfTotalOpenBracketsOutstandingInWholeArray)


    if(isEmptySegmentFlag) {
        //never gets here, pointer always points to current segment which 
        //jumps from last on char input, so is never empty
        segmentsArray[currentSegmentIndex].stringValue = newKeyInput
    }


    //if current segment is a number, cant add anymore open brackets after number is present
    if(currentSegmentIsANumberFlag) {
        //return data as is, unchanged
        return
        //dont take snapshot
    }


    //if current segment is an operator, move to next segment and add a open bracket (
    if(currentSegmentIsAnArithOrPercentOperatorFlag) {
        //move to next segment then add open bracket
        //NOTE: an open bracket is included in operator search,
        //so if already has a open bracket or more, ok to add on.
        currentSegmentIndex++
        segmentsArray[currentSegmentIndex] = {}//create new element
        segmentsArray[currentSegmentIndex].stringValue = '('
    }
    else 
        if(currentSegmentAlreadyHasOpenBracket) {
            //just add another bracket, dont add at next segment but
            //add at this current segment, so this segment may have many
            //open brackets

            //if less than 2 open brackets then allow to insert more
            if(numberOfTotalOpenBracketsOutstandingInWholeArray > -2) {
                segmentsArray[currentSegmentIndex].stringValue += '('
            }
        }
        else 
            if(currentSegmentHasPercentSignFlag) {//empty % sign, cant be a numbered % sign, ie % , cant be 5%
                //e.g 23 add (25% x 5) when should be 23 add (25 x 5)%, so we remove
                //remove the % sign before we add the ( before the number 25

                //add the ( open bracket, now is (%
                segmentsArray[currentSegmentIndex].stringValue = '(' + segmentsArray[currentSegmentIndex].stringValue 
                //now remove the % sign at the end, becomes (
                segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)
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



        
        let isTabletDevice = Dimensions.get('window').width >= 768
        let tabletScaleFactor = 0.75
        
        if(isTabletDevice) {//table, so make font smaller
            fontSizeOfStandardButton *= tabletScaleFactor
        }
        


        let styles = StyleSheet.create({
            buttonContainer: {
                //flex 1 means each button in row has equal width, because flexdir is set as 'row'
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: "center",
                backgroundColor: `${this.props.skinData.memoryButtonsColor}`,
                borderWidth: 0,
                borderColor: "black",
                height: "100%",
            },
            buttonText:{
                fontSize: fontSizeOfStandardButton*0.65,
                color: "white",
            },
        })



        return(
            <TouchableOpacity style={styles.buttonContainer} onPress={()=> {this.handleCalcButtonClicked("(")}}>
                <Text style={styles.buttonText}>(</Text>
            </TouchableOpacity>
        )
    }

}




const mapStateToProps = (state) => ({
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    timeMachineArrayOfSegmentsArraySnapShots: state.calculatorStateData.timeMachineArrayOfSegmentsArraySnapShots,
    skinData: state.skinData,
})


export default connect(mapStateToProps)(ButtonOpenBracket)