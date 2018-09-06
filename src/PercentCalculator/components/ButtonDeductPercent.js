import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'
import {updateSkinData} from '../../../actions/skinDataActions'






class ButtonDeductPercent extends React.Component {

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
                currentComponentSkinToBeChanged: 'percentButtonsColor',
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
            alert('Enter a Number First')
            return//dont process below code
        }
                




        //if previous calculation has been completed, and the answer has been
        //presented
        //check for '=' sign to tell if answer been presented
        
        if(/\=/.test(segmentsArray[currentSegmentIndex].stringValue)) {
            // console.log('******THERE IS = SIGN IN CURRENT SEGMENT, SO WILLL CLEARALL')
            
            //extract the number out of the answer, which is in current segment
            let tempStr = segmentsArray[currentSegmentIndex].stringValue

            //since answer segment has separators and extra details added, 
            //need to remove the alphas and separators
            tempStr = tempStr.replace(/[a-z]|\,|\'|\)|\(|\=/ig,'')
            //these % and \n dont work in regex, so find them as a string 
            tempStr = tempStr.replace('%', '')
            tempStr = tempStr.replace('\n', '')
            //remove &nbsp; also
            tempStr = tempStr.replace('\u00A0','')
            //rmove white spae if any
            tempStr = tempStr.replace('\s', '')
            
            //rmove all spaces if any
            tempStr = tempStr.replace(/[ ]+/, '')
            
            //rmove all currency symbols if any
            tempStr = tempStr.replace(/[\$|£|¥|€]/g, '')
            

            //reset
            segmentsArray = []
            currentSegmentIndex = 0

            //add previous answer to first segment
            segmentsArray[0] = {}//create empty object
            segmentsArray[0].stringValue = tempStr
            
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
        }



        
 


        //clear any trailing decimal point if exist, every time press on 
        //arith operator or percent operator or close bracket
        helpers.cleanUpAllTrailingDeciPoints(segmentsArray)

        

        let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
     //console.log('AT %OF INPUT, CURRENTSEGMENTISANUMBER FLAG IS :' + currentSegmentIsANumberFlag)
    
        let currentSegmentHasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
     //console.log('AT %OF INPUT, CURRENTSEGMENTHAS OPENBRACKET FLAG IS :' + currentSegmentHasAnOpenBracketFlag)
    
        let currentSegmentHasACloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
     //console.log('AT %OF INPUT, CURRENTSEGMENTHASCLOSEBRACKET FLAG IS :' + currentSegmentHasACloseBracketFlag)
        
        let currentSegmentHasNoOpenOrCloseBracketFlag = ! /(\(|\))/.test(segmentsArray[currentSegmentIndex].stringValue)
     //console.log('AT %OF INPUT, CURRENTSEGMENTHAS NO OPEN OR CLOSE BRACKET FLAG IS :' + currentSegmentHasNoOpenOrCloseBracketFlag)
        
        let currentSegmentHasPriorArithOperator = /(\+|-|x|÷)/.test(helpers.collateStringsIntoOneString(segmentsArray))
     //console.log('AT %OF INPUT, currentSegmentHasPriorArithOperator FLAG IS :' + currentSegmentHasPriorArithOperator)
        
    
    
        //first make sure that there has been no previous percentage related
        //operator in the whole calculatoion
        let collatedString = helpers.collateStringsIntoOneString(segmentsArray)
        let wholeCalculationHasAPercentOperatorFlag = /(of|add|deduct|to|is|then|deducted|added)/.test(collatedString)//returns a boolean
    
        if(wholeCalculationHasAPercentOperatorFlag) {
            //has prior percentage operator, so no action,
            //ignore input, return as is.
            return 
        }
    
    
    
        
        //if gets to here then has no previous percent operator in the line
     
        //if current segment is not a number one, ignore user key input
        if( ! currentSegmentIsANumberFlag ){ //not a number segment
            //ignore
            //dont take snapshot
            allowToTakeSnapShotOfState = false
        }
        else {//is a number segment, so proceed
            if(currentSegmentHasNoOpenOrCloseBracketFlag) {
                if( ! currentSegmentHasPriorArithOperator) {//no prior arith operator.
                    //25 x ((23 + 10% ... becomes 25 x ((23 + [10% of ...
                    //or 25 becomes 25% of ...
                 //console.log('AT %OF, GOT TO NUMBER HAS NO OPEN OR CLOSE BRACKET, NO PRIOR ARITH OPERATOR')                
                    //no priior arith operator, no closing or open bracket,
                    // so we  just proceed to add '% of' portion
                    
                    //add 'outof' into next segment
                    currentSegmentIndex++
                    segmentsArray[currentSegmentIndex] = {} //create
                    segmentsArray[currentSegmentIndex].stringValue = 'deduct'
                    //add % sign to next segmet
                    currentSegmentIndex++
                    segmentsArray[currentSegmentIndex] = {} //create
                    segmentsArray[currentSegmentIndex].stringValue = '%'
                }
                else {//has prior arith operator.
                 //console.log('AT %OF, GOT TO NUMBER HAS NO BRACKETS, BUT HAS PRIOR ARITH OPERATOR')
                    //e.g 5 x 20, so we put open brack in front of 20, 
                    //becomes 5 x (20% of ...
        
                    //put ( in front of current segment
                    segmentsArray[currentSegmentIndex].stringValue = '[' + segmentsArray[currentSegmentIndex].stringValue
                    //add 'out of' into next segment
                    currentSegmentIndex++
                    segmentsArray[currentSegmentIndex] = {} //create
                    segmentsArray[currentSegmentIndex].stringValue = 'deduct'
                    //add % sign in next segment
                    currentSegmentIndex++
                    segmentsArray[currentSegmentIndex] = {} //create
                    segmentsArray[currentSegmentIndex].stringValue = '%'
                }
            }//if no open or close bracket
    
            else
            if(currentSegmentHasAnOpenBracketFlag) {//has an open bracket. 
                //if has an open bracket e.g (45 then becomes ([45
             //console.log('AT %OF, GOT TO SEGMENT HAS OPEN BRACKT')
                //if has open bracket at start of segment, means user 
                //typed it in, e.g 5 x (20 , or ((20% of ...
                //if it is 5 x (20 , ie has prior arith operator, then we insert
                //a square bracket) 
                //. if it has no priior operator e.g ((20% of ... then we dont insert
                //the square bracket.
                
                // if(currentSegmentHasPriorArithOperator) {
                    //has prior arth operator, so we insert a square bracket 
                    //in front of the number e.g 23 x (45 out of, becomes 23 x ([45 out of ..
    
                    //get index of first numeral in segment, note: no g flag
                    let tempStr = segmentsArray[currentSegmentIndex].stringValue
                    let indexOfFirstNumeral = tempStr.search(/[0-9]/)
                    //need to slice and recombine, to insert the square bracket
                    let portion1 = tempStr.slice(0, indexOfFirstNumeral)
                    let portion2 = tempStr.slice(indexOfFirstNumeral)//defaults to eostring, ie lenght-1
                    tempStr = portion1 + '[' + portion2//insert
                    //copy back to real string
                    segmentsArray[currentSegmentIndex].stringValue = tempStr
                // }
                // else {//has no prior operator
                //     //igonore, dont insert square bracket
                // }
    
                //add 'out of' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'deduct'
                //add % in next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = '%'
            }
            else 
            if(currentSegmentHasACloseBracketFlag) {//has a close bracket.
             //console.log('AT %OF, GOT TO SEGMENT HAS CLOSE BRACKT')
                //if has a close bracket, means user just entered a bracketed caluculation,
                //e.g (5 x 20)% of ... or 25 x (30 + 20)% of ...
                //if it is (5 x 20)%, ie no prior arith outside of unit, 
                //then no need to insert square bracket, no action.
                //if there is prior arith operator outside of unit, e.g
                // 25 x (20 + 30)% ... the 25 x is outside of the unit.
                //so we put the square bracket at the begining of the unit,
                //beecomes 25 x [(20 + 30)% ... 
                //if it is 25 x ((20 + 30)%, becomes 25 x ([(20 + 30)%
    
     
    
                let indexOfSegmentWithFirstOpenBracket = helpers.findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfSegment
                let indexOfOpenBracketWithinSegment = helpers.findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfOpenBracketWithinSegmentString
                
                //if prior arith operator exists, then add '[' before the open
                //bracket of the unit
                if( currentSegmentHasPriorArithOperator) {
                    //add the '[' before unit's open bracket e.g 25 x ((23 + 10) ... 
                    //becomes 25 x ([(23 + 10) ...
                    let tempStr = segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue
                    let portion1 = tempStr.slice(0, indexOfOpenBracketWithinSegment)//exclusive of open bracket
                    let portion2 = tempStr.slice(indexOfOpenBracketWithinSegment)//defualt end is length -1 
                    tempStr = portion1 + '[' + portion2
                    //copy back to real string
                    segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue = tempStr
    
    
                }
                
                //add 'add' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'deduct'
                 //add % in next segment
                 currentSegmentIndex++
                 segmentsArray[currentSegmentIndex] = {} //create
                 segmentsArray[currentSegmentIndex].stringValue = '%'
    
            }
        }//else is a number segment
        
     

        
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
            percentButtonContainer: {
                //flex 1 means each button in row has equal width, because flexdir is set as 'row'
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: "center",
                backgroundColor: `${this.props.skinData.percentButtonsColor}`,
                borderWidth: 0,
                borderColor: "black",
                height: "100%",
            },
            percentButtonText:{
                fontSize: fontSizeOfStandardButton*0.7,
                color: "white",
            },
        })



        return(
            <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> {this.handleCalcButtonClicked("deduct %")}}>
                <Text style={styles.percentButtonText}>deduct %</Text>
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


export default connect(mapStateToProps)(ButtonDeductPercent)