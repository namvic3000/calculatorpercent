import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'
import { updateSkinData } from "../../../actions/skinDataActions"







class ButtonCloseBracket extends React.Component {

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

        let allowToTakeSnapShotOfState = true
        
        let emptyScreenMainLine = (segmentsArray || []).length <= 0



        
        //ignore key if screen is empty, alert user to enter a number first
        if(emptyScreenMainLine) {
            // alert('Enter a Number First')
            return//dont process below code
        }
 


        //if previous calculation has been completed, and the answer has been
        //presented
        //check for '=' sign to tell if answer been presented
        
        if(/\=/.test(segmentsArray[currentSegmentIndex].stringValue)) {
            // console.log('******THERE IS = SIGN IN CURRENT SEGMENT, SO WILLL CLEARALL')
             
            //if annswer been presented, and close bracket  pressed, no action
            
            return //dont process below code
            
        }




        //clear any trailing decimal point if exist, every time press on 
        //arith operator or percent operator or close bracket
        helpers.cleanUpAllTrailingDeciPoints(segmentsArray)




        ///can only enter a close bracket if current segment is a number,
        //and nett bracket count is -1 or less
        //Each ( has value of -1
        //Each ) has value of +1
        //if nett is 0 means equal, correct.

        //must be a number, can already have a closing bracket , ok
        //but cant have a open bracket
        let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
     //console.log('AT PROCESS BRACKET CLOSE, CURENTSEGENT IS A NUMBER FLAG IS ' + currentSegmentIsANumberFlag)
        
        let hasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
     //console.log('AT PROCESS BRACKET CLOSE, CURENTSEGENT HASOPENBRACKET FLAG IS ' + hasAnOpenBracketFlag)
    
        let hasPriorOpenSquareBracketFlag = /\[/.test(helpers.collateStringsIntoOneString(segmentsArray))
     //console.log('AT PROCESS BRACKET CLOSE, CURENTSEGENT HAS PRIOR [ SQUARE BRACKET FLAG IS ' + hasPriorOpenSquareBracketFlag)

        let hasPriorPercentSign = /\%/.test(helpers.collateStringsIntoOneString(segmentsArray))

        //first scan array and determine nett value of brackets
        let nettValue = helpers.getParenthesesNetValueFromString(helpers.collateStringsIntoOneString(segmentsArray))
     //console.log('AT PROCESS BRACKET CLOSE, NETTVALUE OF BRACKETS IS  ' + nettValue)
        
        let hasPriorPercentCalculationNeedingPercentSignInOperand2 = /add|deduct|added|deducted|then|if/.test(helpers.collateStringsIntoOneString(segmentsArray))
     //console.log('NEEDS PERCNT SIGN IN OPERAND2 FLAG IS:', hasPriorPercentCalculationNeedingPercentSignInOperand2)
        
        //if segment has a number,segment has no open brackets, and -1 or less nett bracket,
        //then ok to proceed and add close bracket
        if(currentSegmentIsANumberFlag && (! hasAnOpenBracketFlag) && (nettValue <= -1)) {
            segmentsArray[currentSegmentIndex].stringValue += ')'
        }


        if(hasPriorOpenSquareBracketFlag) {
         //console.log('*******GOT TO HASOPENSQUAREBRACKET')
            //has open square bracket e.g 23 x [(25 x 3)% of (23 x 30)]
            //once the last close parenthesis is input, completing the unit
            //, need to add the closng square bracktt

            //check if the closing bracket completes the round bracket sets within
            //the square bracket if so, append the closing square bracket to encapsulate
            //te percntage calculation
            
            //get the string from start of the square bracket
            let tempStr = helpers.collateStringsIntoOneString(segmentsArray)
            let indexOfOpenSquareBracket = tempStr.search(/\[/)//returns an integer
            if(indexOfOpenSquareBracket === -1) indexOfOpenSquareBracket = 0
            tempStr = tempStr.slice(indexOfOpenSquareBracket)//get the portion from [ only
            let nettValueOfParenthesis = helpers.getParenthesesNetValueFromString(tempStr)
         //console.log('******AT HASOPENSQUAREBRACKET, PARENTHESIS NET VALUE IS ' + nettValueOfParenthesis)
            
            if(nettValueOfParenthesis === 0) {//all open bracketss within open square bracket are now closed
                //now add the ] closing square bracket if not already exists
                if( ! /\]/.test(helpers.collateStringsIntoOneString(segmentsArray))) {//if not exist
                    let hasIfWord = /if/i.test(helpers.collateStringsIntoOneString(segmentsArray))
                    let hasThenWord = /then/i.test(helpers.collateStringsIntoOneString(segmentsArray))
                    if(hasIfWord && (! hasThenWord)) {
                        //e.g  '2 x [if (2 x 3)% is (5x6)' , dont add anything, only midway
                        //dont take snpshot
                        allowToTakeSnapShotOfState = false
                    }
                    else 
                        if(hasThenWord) {
                            segmentsArray[currentSegmentIndex].stringValue += '%]'
                        }
                        else
                            //if is a 'add' or 'dedduct' or 'if' or 'added' or 'deducted' then add a '%]'
                            if(/add|deduct|added|deducted/.test(helpers.collateStringsIntoOneString(segmentsArray))) {
                                segmentsArray[currentSegmentIndex].stringValue += '%]'
                            }
                            else { //must be: %of, outof, %change, no need for % sign
                                segmentsArray[currentSegmentIndex].stringValue += ']'
                            }
                }
            }
        }
        else {//if no prior square braket, and is a percent calcultion, and nett parenthesis is 0, then add % sign
            
            //e.g 5 add (23 x 5) becomes 5 add (23 x 5)%
            //if gets here, means no prior square bracket, if is a percent calc, then it is a simpleone
            //without square brackets, ie without arith operators existing
            if(hasPriorPercentCalculationNeedingPercentSignInOperand2 && (helpers.getParenthesesNetValueFromString(helpers.collateStringsIntoOneString(segmentsArray))===0)) {
             //console.log('GOT TO ADDING PERCENT SIGN FOR NEEDING PERCENT SIGN')
                //add the % sign , bracket close added with nett value of 0
                //add if not already exist
                
                if( /then/.test(helpers.collateStringsIntoOneString(segmentsArray)) 
                    && helpers.collateStringsIntoOneString(segmentsArray).match(/\%/).length<2) {//if not already exist
                        segmentsArray[currentSegmentIndex].stringValue += '%'
                }
                else 
                if( ! hasPriorPercentSign ) {//if not already exist
                    segmentsArray[currentSegmentIndex].stringValue += '%'
                }
            }
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
            <TouchableOpacity style={styles.buttonContainer} onPress={()=> {this.handleCalcButtonClicked(")")}}>
                <Text style={styles.buttonText}>)</Text>
            </TouchableOpacity>
        )
    }

}




const mapStateToProps = (state) => ({
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    timeMachineArrayOfSegmentsArraySnapShots: state.calculatorStateData.timeMachineArrayOfSegmentsArraySnapShots,
    skinData: state.skinData
})


export default connect(mapStateToProps)(ButtonCloseBracket)