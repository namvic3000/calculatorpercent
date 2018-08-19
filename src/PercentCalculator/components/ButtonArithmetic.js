import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'


class ButtonArithmetic extends React.Component {

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

        

        // console.log('GOT TO PROCESS 4ARITH KEYS')
 



        //first detect if current segment is a number or not
        let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
        // console.log('AT PROCESS4ARITHKEYS, CURENTSEGENT IS A NUMBER FLAG IS ' + currentSegmentIsANumberFlag)
        
        let hasPriorPercentCalculation = /of|add|deduct|to|added|deducted|is|then/.test(helpers.collateStringsIntoOneString(segmentsArray))
        // console.log('AT PROCESS4ARITHKEYS, CURENTSEGENT HAS PRIOR PERCENT CALC FLAG IS ' + hasPriorPercentCalculation)
        
        let hasPriorOpenSquareBracket = /\[/.test(helpers.collateStringsIntoOneString(segmentsArray))
        // console.log('AT PROCESS4ARITHKEYS, CURENTSEGENT HAS PRIOR OPEN SQUARE BRACKET FLAG IS ' + hasPriorOpenSquareBracket)
        
        let nettOpenParenthesisValue = helpers.getParenthesesNetValueFromString(helpers.collateStringsIntoOneString(segmentsArray))
        // console.log('AT 4ARITHKEYS, NETT OPEN BRACKETS VALUE IS ' + nettOpenParenthesisValue)
        //if current segment is a number,  can proceed




        if(currentSegmentIsANumberFlag) {
            // console.log('AT PROCESS4ARITHS, CURENTSEGMENT IS A NUMBER')
            


            //special if%is case, if there is just 'if' without 'then', then at operand2,
            //arith operators allowed only if there is an open bracket outstanding starting
            //from the 'if' word
            if( (/if/i.test(helpers.collateStringsIntoOneString(segmentsArray))) && ( ! /then/i.test(helpers.collateStringsIntoOneString(segmentsArray))) ) {
                //only allow arith operator if current segment is a number and 
                //nett bracket value , from the 'if ... onwards is -1 or less
                //so e.g if 35% is 555    then we dont allow arith opertor since
                //there is no nett -1 open bracket.  e.g if 35% is (55 x 55)   
                //also cannot add arith operator, so ignore arith operators if input,
                //because there is no nett open round bracket.   
                //but e.g if 23% is (555    is ok to add the arith operator, becomes
                // if 23% is (555 x 
                let tempStr = helpers.collateStringsIntoOneString(segmentsArray)
                //get index of the 'if'
                let indexOfIfWord = tempStr.search(/if/)
                tempStr = tempStr.slice(indexOfIfWord)
                let nettValueOfRoundBrackets = helpers.getParenthesesNetValueFromString(tempStr)
                
                //if open brackets outstanding, then allow to add arith operator,
                // if no active open bracket then dont allow additin of operator
                if(nettValueOfRoundBrackets == 0) {//no active open bracket, ignore
                    //ignore, dont allow addition of ooperator, is either single number,
                    //or a closed pair of brackets
                    return 
                }


                //ORIGINAL, COMMENTOUT return
            }


            //for cases where the first expression is a complete percentage calucaltion,
            //then user presses arith key, e.g 12% of 35 then user presses arith key,
            //we must insert open and close [] square brackets to encapsulate the percentage
            //calculation , before appending the arith operator after, outside of the [] brackets,
            //so becomes e.g [12% of 35] x 150

            //if there has been a percent calculation, and no open square bracket [,
            //and user presses an arith key, means this is the first arith key after
            //the percent calculation (because theere is no square brackets yet, square
            //bracketes would have been inserted at first arith operator after the percent
            //calculaltion)

            if(hasPriorPercentCalculation && ( ! hasPriorOpenSquareBracket) && (nettOpenParenthesisValue === 0)) {
                // if gets here , has prior percent, no [ bracket, and nett () value of 0,
                //has to be nettvalue of 0 to prevent [10% of (5] x 8 , ie square bracket inserted in middle of 
                //open parenthesis.

                //insert the open [ bracket at start of whole calculation, ie first segment
                segmentsArray[0].stringValue = '[' + segmentsArray[0].stringValue//first char of first segment
                //insert close ] bracket at end of current segment (ie the last segment)
                segmentsArray[currentSegmentIndex].stringValue += ']'//last char of current (ie last) segment
            }
    
            //now proceed as normal and move to next segment and append the arith operator
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create new element
            //put the operator in the new element
            segmentsArray[currentSegmentIndex].stringValue = buttonValue
        }
        else {//current seg is not a number, is an operator
            //ignore
            // console.log('AT PROCESS4ARITHS, ANOTHER OPERATOR PRESSED, IGINORED')
            
            //dont take snapshot
            allowToTakeSnapShotOfState = false 
        }



         //save to timemachine
         if(allowToTakeSnapShotOfState) {
            //take a snapshot and return
            timeMachineArrayOfSegmentsArraySnapShots = helpers.takeASnapShotOfCurrentCalculationState(segmentsArray, timeMachineArrayOfSegmentsArraySnapShots)
        }
        
         //collate stirng from all segments and update state ie store   
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
            calcButtonTextArithOperators: {
                fontSize: fontSizeOfStandardButton*1.1,
                color: "white",
            },
            calcButtonTextSubtractOperator: {
                fontSize: fontSizeOfStandardButton*1.3,
                color: "white",
            },
            calcButtonTextMultiplyOperator: {
                fontSize: fontSizeOfStandardButton*1.1,
                color: "white",
                bottom: 2.5
            },
        })


        let styleToApply;
        if(this.props.buttonValue === '-') {
            styleToApply = styles.calcButtonTextSubtractOperator
        }
        else 
            if(this.props.buttonValue === 'x'){
                styleToApply = styles.calcButtonTextMultiplyOperator
            }
            else {
                styleToApply = styles.calcButtonTextArithOperators
            }

            // console.log('ARITHBUTTON: BUTTON VALUE IS:'+ this.props.buttonValue)

        return(
            <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked(this.props.buttonValue)}}>
                <Text style={styleToApply}>{this.props.buttonValue}</Text>
            </TouchableOpacity>
        )
    }

}



const mapStateToProps = (state) => ({
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    timeMachineArrayOfSegmentsArraySnapShots: state.calculatorStateData.timeMachineArrayOfSegmentsArraySnapShots
})


export default connect(mapStateToProps)(ButtonArithmetic)