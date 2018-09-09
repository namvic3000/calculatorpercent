import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'
import { updateSkinData } from "../../../actions/skinDataActions";
import {updateShowSwitchOperandsStatus} from '../../../actions/switchOperandsActions'





class Button0To9 extends React.Component {

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
                currentComponentSkinToBeChanged: 'keysSet1',
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





        
        // console.log('AT BUTTON0-9: BUTTON PRESSED IS:' + buttonValue)
        let {segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots} = this.props 
        
        let emptyScreenMainLineFlag = (segmentsArray || "").length<=0
        // console.log('AT BUTTON0-9: EMPTYSCREENFLAG IS :' + emptyScreenMainLineFlag)
        // console.log('AT BUTTON0-9: SEGMENTS ARRY, INDEX, AND TIMEMACHINEARRAY GOT ARE:',segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots)

        let allowToTakeSnapShotOfState = true



        
        if(emptyScreenMainLineFlag) {

            //segmentsarray and timemachinearray  already created at 
            //reducer initial state
            segmentsArray = []
            segmentsArray[0] = {}//create empty object
            segmentsArray[0].stringValue = buttonValue
            currentSegmentIndex = 0
            //take a snapshot and return
            timeMachineArrayOfSegmentsArraySnapShots = []//reset for new calculation
            timeMachineArrayOfSegmentsArraySnapShots = helpers.takeASnapShotOfCurrentCalculationState(segmentsArray, timeMachineArrayOfSegmentsArraySnapShots)
            
             //collate stirng from all segments     
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
            
            return //dont process below code
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
            segmentsArray[0].stringValue = buttonValue
            
            //reset for each calculation
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



        //first detect if current segment is a number or not
        //include % and ) as a number for this key input
        let currentSegmentIsANumberFlag = /([0-9]|%|\)|\()/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
        // console.log('AT PROCESS 0-9, CURENTSEGENT IS A NUMBER FLAG IS ' + currentSegmentIsANumberFlag)
        
        let isEmptySegmentFlag = segmentsArray[currentSegmentIndex].stringValue.length <= 0
        // console.log('AT PROCESS 0-9, ISEMPTYSEGMENT FLAG IS ' + isEmptySegmentFlag)
        
        let currentSegmentHasOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
        // console.log('AT PROCESS 0-9, HAS OPENBRACKET FLAG IS ' + currentSegmentHasOpenBracketFlag)
        
        let currentSegmentHasCloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
        // console.log('AT PROCESS 0-9, HAS CLOSE BRACKET FLAG IS ' + currentSegmentHasCloseBracketFlag)
        
        let currentSegmentHasCloseSquareBracketFlag = /\]/.test(segmentsArray[currentSegmentIndex].stringValue)
        // console.log('AT PROCESS 0-9, HAS CLOSE ] BRACKET FLAG IS ' + currentSegmentHasCloseSquareBracketFlag)
        
        let hasPriorOpenSquareBracketFlag = /\[/.test(helpers.collateStringsIntoOneString(segmentsArray))
        // console.log('AT PROCESS 0-9, HAS OPEN [ BRACKET FLAG IS ' + hasPriorOpenSquareBracketFlag)
        
        // let hasPriorOpenSquareBracketFlag = /\[/.test(segmentsArray[currentSegmentIndex].stringValue)
        // console.log('AT PROCESS 0-9, HAS OPEN [ BRACKET FLAG IS ' + hasPriorOpenSquareBracketFlag)
        
        let hasPercentSignFlag = /\%/.test(segmentsArray[currentSegmentIndex].stringValue)
        // console.log('AT PROCESS 0-9, HASPERCENTSIGN FLAG IS ' + hasPercentSignFlag)



        //segment is never empty, always has number or operator, except at 
        //start when string is empty.
        //if segmnt is empty, just add the string value
        if(isEmptySegmentFlag) {
            //never gets here
            segmentsArray[currentSegmentIndex].stringValue = buttonValue
        }


        //if segment is a number
        if(currentSegmentIsANumberFlag) {
            // console.log('AT PROCESS0-9KEYS, GOT TO CURENTSEGMENTIS A NUMBER')

            //check for input lengh
            let overLimit = helpers.checkNumberLengthOfUserInput(segmentsArray[currentSegmentIndex].stringValue)
            if(overLimit) {
                //return as is, no change, ignnore user input
                //collate stirng from all segments, to return     
                return
            }



            //if has closing bracket, insert number before that closing bracket
            if(currentSegmentHasCloseBracketFlag) {
                //if already has closing bracket, e.g 55) can only
                //enter  more ) if still not closed, 
                //but can not enter more numbers after close bracket input.
                //prevents user confusion.

                // //get the string, minus the last char whichis the ) bracket
                // let tempStr = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)
                // //append key value and reinsert the )
                // tempStr = tempStr + buttonValue + ')'
                // //copy back to real string
                // segmentsArray[currentSegmentIndex].stringValue = tempStr

                //dont save to timemachine
                allowToTakeSnapShotOfState = false

            }
            else 
                if(currentSegmentHasCloseSquareBracketFlag) {
                    //if has percent sign, add input before the percent sign
                    // //get the string, minus the last char whichis the  bracket
                    if(hasPercentSignFlag) {
                        //e.g 2 x [23 add 23%] into 2 x [23 add 235%], need to remove both %] chars
                        //add in new numeral, and add back in '%]' chars
                        let tempStr = segmentsArray[currentSegmentIndex].stringValue.slice(0,-2)//everything except the '%]' 2 chars
                        //append key value and reinsert the )
                        tempStr = tempStr + buttonValue + '%]'
                        //copy back to real string
                        segmentsArray[currentSegmentIndex].stringValue = tempStr
                    }
                    else {//no % sign, just ] bracket only, 1 char
                        let tempStr = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)//everything except the last char
                        //append key value and reinsert the )
                        tempStr = tempStr + buttonValue + ']'
                        //copy back to real string
                        segmentsArray[currentSegmentIndex].stringValue = tempStr
                    }
                
                }
                else
                    if(hasPriorOpenSquareBracketFlag && (!currentSegmentHasCloseSquareBracketFlag) && hasPercentSignFlag){
                        //add number before the % sign
                        tempStr = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)//everything except the last % char
                        //append key value and reinsert the )
                        tempStr = tempStr + buttonValue + '%'
                        //copy back to real string
                        segmentsArray[currentSegmentIndex].stringValue = tempStr
                    }
                    else
                        if((!hasPriorOpenSquareBracketFlag) && (!currentSegmentHasCloseSquareBracketFlag)&&(hasPercentSignFlag)) {
                            //if has no open and close square bracket, and has % sign, then insert before the %sign
                            //add number before the % sign
                            tempStr = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)//everything except the last % char
                            //append key value and reinsert the )
                            tempStr = tempStr + buttonValue + '%'
                            //copy back to real string
                            segmentsArray[currentSegmentIndex].stringValue = tempStr
                        }
                        else {//no square brackt, either has open bracket, or no brackets, append the numaeral key value string
                            //need to prevent cases of 0005 (0005 etc... so look at last numeral,
                            //if it is a 0 without a decipoint, 0. is ok, 0 will be replaced if it is the
                            //first numeral

                            //if current segment has 1 numeral, and it is a 0, and no dedipoint, then remove it before
                            //adding this numeral input
                            let currentSegmentString = segmentsArray[currentSegmentIndex].stringValue
                            if( ((currentSegmentString.match(/[0-9]/) || []).length ===1) //len of 1 numeral
                                    && ( currentSegmentString[currentSegmentString.search(/[0-9]/)] === '0')//first numeral is a '0'
                                    && ( ! /\./.test(segmentsArray[currentSegmentIndex].stringValue)) ) {//no decipoint present
                                //remove the leading 0, no decipoint present
                                segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)
                            }

                            //add the input 
                            segmentsArray[currentSegmentIndex].stringValue += buttonValue
                        }

        }
        else {//curr segent is ann operator
            //move to next segment, and put input value there
         //console.log('AT 0-9 KEYS, CURRENTLY AT OPERATOR , SO MOVE TO NEXT SEGMENT')
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {}//create new object for  next array element
            segmentsArray[currentSegmentIndex].stringValue = buttonValue
        }

        

        //if has no open or close bracket, and has '[' bracket, 
        //then add a ] bracket at the end
        let thisSegmentHasCloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
        
        // let thisSegmentHasOpenBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
        // console.log('AT INSIDE %OF CALC, HAS OPEN BRACKET FLAG IS ' + thisSegmentHasOpenBracketFlag)
            
        // let hasPriorOpenSquareBracketFlag = /\[/.test(helpers.collateStringsIntoOneString(segmentsArray))
        // console.log('AT INSIDE %OF CALC, HAS OPEN [ BRACKET FLAG IS ' + hasPriorOpenSquareBracketFlag)
        
        let alreadyHasPriorCloseSquareBracketFlag = /\]/.test(helpers.collateStringsIntoOneString(segmentsArray))
        
        
        if( hasPriorOpenSquareBracketFlag && (! alreadyHasPriorCloseSquareBracketFlag)) {
            //if nett value is 0, in cases of 23 x ([(20 x 5)% of inputhere]
            //we can insert the ] bracket after the number if () nettvalue is 0. 
            //dont  insert if nettvalue is 0, e.g 23 x ([(20 x 5)% of (57   ie 2nd operand is
            //incomplete, therefore nettvalue of () is not 0.
            let tempStr = helpers.collateStringsIntoOneString(segmentsArray)
            let indexOfOpenSquareBracket = tempStr.search(/\[/)
            if(indexOfOpenSquareBracket === -1) {
                indexOfOpenSquareBracket = 0
            }
            let nettValueOfParenthesis = helpers.getParenthesesNetValueFromString(tempStr.slice(indexOfOpenSquareBracket))
            // console.log('NETVALUE OF PARANTHESIS IS ' + nettValueOfParenthesis)
            if(nettValueOfParenthesis === 0) {

                //for if%is calcultion, dont add the ] at the 2nd operand, coa it has 3 operands, 
                //unlike other percnt calcultions
                if(/if/.test(helpers.collateStringsIntoOneString(segmentsArray))
                    && ( ! /then/.test(helpers.collateStringsIntoOneString(segmentsArray)))){
                        //if there is 'if' but no 'then' then we are at the 2nd operand
                        //of if%is calculation, e.g 'if 5% is 5777' , no operadn3 yet, 
                        //so dont add the close sqaure bracket. complete calculation is e.g if 5% is 50 then 20%

                        //do nothig, no addig of the close square bracket which is for othr
                        //percentage calculations which has opeand2 as the last operand. this
                        //if%is has 3 oeprands, so we dont close it with square braccket yet.

                    }
                else {
                    //for every other percennt calculaltoin , 
                    //if not already added on previous inputs, then add the ] close square bracket
                    //so it is e.g 23 x ([(25 x 5)% of 35]
                    //add square bracket at the end if not already present
                    let strLen = segmentsArray[currentSegmentIndex].stringValue.length
                    let lastChar = segmentsArray[currentSegmentIndex].stringValue[strLen -1]
                    // console.log('LAST CHAR IN SEGMENT IS ' + lastChar)
                    if(lastChar !== ']') {
                        segmentsArray[currentSegmentIndex].stringValue += ']'
                    }
                }

            }

        }//if has prior open [ square bracket



        
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



        //check if should show the switchoperands icon
        let correctStatusBool = helpers.determineIfNeedToShowSwitchIcon(segmentsArray)
        this.props.dispatch(updateShowSwitchOperandsStatus(correctStatusBool))
       
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
            standardButtonContainer: {
                //container for each individual button
                flex: 1,//each button has equal width, because the flexdir is now 'row'
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                backgroundColor: `${this.props.skinData.keysSet1Color}`,//"rgb(250,250,255)",
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
            <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked(this.props.buttonValue)}}>
                <Text style={styles.calcButtonText}>{this.props.buttonValue}</Text>
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


export default connect(mapStateToProps)(Button0To9)