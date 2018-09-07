import React from 'react'
import { View, Text , StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import  {updateMemoryData} from "../../../actions/memoryActions"
import * as helpers from "../helpers"
import {MAX_NUMBER_LIMIT, MIN_NUMBER_LIMIT} from '../config'
import { updateCalculatorData } from "../../../actions/calculatorDataActions";
import { updateSkinData } from "../../../actions/skinDataActions"







class ButtonMemRecall extends React.Component {

 
    handleCalcButtonClicked = () => {
        

        
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



        // console.log('AT BUTTON0-9: BUTTON PRESSED IS:' + buttonValue)
        let {segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots} = this.props 
        
        let emptyScreenMainLineFlag = (segmentsArray || "").length<=0
        // console.log('AT BUTTON0-9: EMPTYSCREENFLAG IS :' + emptyScreenMainLineFlag)
        // console.log('AT BUTTON0-9: SEGMENTS ARRY, INDEX, AND TIMEMACHINEARRAY GOT ARE:',segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots)

        let allowToTakeSnapShotOfState = true
 

        //get memory value of active box
        let memContent;
        if(this.props.currentActiveMemory === 1) {
            memContent = this.props.memory1Value
        }
        else {//mem2
            memContent = this.props.memory2Value
        }


        //if mem content is empty, and memrecall pressed, no action
        if(/empty/.test(memContent)) {
            alert('memory is empty')
            return
        }




        //make the mem content the button value, treat as if entered via
        //keypad buttons
        //MAKE THE BUTTONVALUE THE MEMORY CONTENT, TREAT AS SAME.
        //THIS LOGIC IS FROM THE 0-9BUTTON

        let buttonValue = memContent  

        
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

            // //check for input lengh
            // let overLimit = helpers.checkNumberLengthOfUserInput(segmentsArray[currentSegmentIndex].stringValue)
            // if(overLimit) {
            //     //return as is, no change, ignnore user input
            //     //collate stirng from all segments, to return     
            //     return
            // }



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
            else //no close round bracket
                if(currentSegmentHasCloseSquareBracketFlag) {
                    //if has percent sign, add input before the percent sign
                    // //get the string, minus the last char whichis the  bracket
                    if(hasPercentSignFlag) {
                        //e.g 2 x [23 add 23%] into 2 x [23 add 235%], need to remove both %] chars
                        //add in new numeral, and add back in '%]' chars
                        let tempStr = segmentsArray[currentSegmentIndex].stringValue.slice(0,-2)//everything except the '%]' 2 chars
                        
                        //if there is existing numbers, e.g 35%], 
                        //we want to replace the existing number with the recalled
                        //number. so we remove all the existing numbers, and leave
                        //any existing chars as is , so 35%] would slice off the %] and
                        //now we remove the 35 to be replaced with recalled number
                        let numbersRemoved = tempStr.replace(/[0-9]|\-|\./g,'')

                        //append key value and reinsert the )
                        tempStr = numbersRemoved + buttonValue + '%]'
                        //copy back to real string
                        segmentsArray[currentSegmentIndex].stringValue = tempStr
                    }
                    else {//no % sign, just close square ] bracket only, 1 char
                        
                        let tempStr = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)//everything except the last char
                        
                        //remove the numerals because we want to replace them,
                        //not append to them
                        let numbersRemoved = tempStr.replace(/[0-9]|\-|\./g,'')
                        
                        //append key value and reinsert the )
                        tempStr = numbersRemoved + buttonValue + ']'
                        //copy back to real string
                        segmentsArray[currentSegmentIndex].stringValue = tempStr
                    }
                
                }
                else//no close round bracket, no close square bracket
                    if(hasPriorOpenSquareBracketFlag && (!currentSegmentHasCloseSquareBracketFlag) && hasPercentSignFlag){
                        
                        //has prior open round bracket, no close square bracket, has %sign,
                        //e.g 2 X (7 x [25%   , no close round bracket, open round bracket in diff segment
                        //cant be 25%) becuase if has close ) round brackket,, would have returned earlier 
                        
                        //we add number before the % sign
                       
                        //slice, leave out the %sign
                        tempStr = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)//everything except the last % char
                        
                        //remove the numerals because we want to replace them,
                        //not append to them
                        let numbersRemoved = tempStr.replace(/[0-9]|\-|\./g,'')
                        
                        //append recalled value and reinsert the %
                        tempStr = numbersRemoved + buttonValue + '%'
                        //copy back to real string
                        segmentsArray[currentSegmentIndex].stringValue = tempStr
                    }
                    else
                        if((!hasPriorOpenSquareBracketFlag) && (!currentSegmentHasCloseSquareBracketFlag)&&(hasPercentSignFlag)) {
                            //no close square brackket, no close round bracket,
                            //no prior open square bracket
                            //has %sign in current segment

                            //if has no open and close square bracket, and has % sign, then insert before the %sign
                            //add number before the % sign
                            tempStr = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)//everything except the last % char
                            
                            //remove the numerals because we want to replace them,
                            //not append to them
                            let numbersRemoved = tempStr.replace(/[0-9]|\-|\./g,'')
                            
                            //append key value and reinsert the )
                            tempStr = numbersRemoved + buttonValue + '%'
                            
                            //copy back to real string
                            segmentsArray[currentSegmentIndex].stringValue = tempStr
                        }
                        else {//no square brackt, either has open bracket, or no brackets, append the numaeral key value string
                             
                            //no open or close brackets of round or square, /
                            //no %sign

                            let tempStr = segmentsArray[currentSegmentIndex].stringValue
                            
                            //remove the existing numerals because we want to replace them,
                            //not append to them
                            let numbersRemoved = tempStr.replace(/[0-9]|\-|\./g,'')
                            //add the input 
                            tempStr = numbersRemoved + buttonValue

                            segmentsArray[currentSegmentIndex].stringValue = tempStr
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

 
        
 
    }//handlecalcbuttonclick






    render() {


        let standardButtonWidth = Dimensions.get('window').width/5

        let fontSizeOfStandardButton = standardButtonWidth/2.8

        
        

        let isTabletDevice = Dimensions.get('window').width >= 768
        let tabletScaleFactor = 0.75
        
        if(isTabletDevice) {//table, so make font smaller
            fontSizeOfStandardButton *= tabletScaleFactor
        }

        



        let styles = StyleSheet.create( {
            container: {
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
                    <TouchableOpacity style={styles.container} onPress={this.handleCalcButtonClicked}>
                        <Text style={styles.buttonText}>MR</Text>
                    </TouchableOpacity>
                )
    }

}



const mapStateToProps = (state) => ({
    memory1Value: state.memory.memoryData.memory1Value,
    memory2Value: state.memory.memoryData.memory2Value,
    currentActiveMemory: state.memory.memoryData.currentActiveMemory,
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    timeMachineArrayOfSegmentsArraySnapShots: state.calculatorStateData.timeMachineArrayOfSegmentsArraySnapShots,
    skinData: state.skinData
})




export default connect(mapStateToProps)(ButtonMemRecall)
