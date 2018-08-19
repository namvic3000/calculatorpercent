import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'






class ButtonAfterDeductedPercent extends React.Component {

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
            alert('Enter a Number First')
            return//dont process below code
        }
                

        
        let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
        console.log('AT %OF INPUT, CURRENTSEGMENTISANUMBER FLAG IS :' + currentSegmentIsANumberFlag)

        let currentSegmentHasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
        console.log('AT %OF INPUT, CURRENTSEGMENTHAS OPENBRACKET FLAG IS :' + currentSegmentHasAnOpenBracketFlag)

        let currentSegmentHasACloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
        console.log('AT %OF INPUT, CURRENTSEGMENTHASCLOSEBRACKET FLAG IS :' + currentSegmentHasACloseBracketFlag)
        
        let currentSegmentHasNoOpenOrCloseBracketFlag = ! /(\(|\))/.test(segmentsArray[currentSegmentIndex].stringValue)
        console.log('AT %OF INPUT, CURRENTSEGMENTHAS NO OPEN OR CLOSE BRACKET FLAG IS :' + currentSegmentHasNoOpenOrCloseBracketFlag)
        
        let currentSegmentHasPriorArithOperator = /(\+|-|x|÷)/.test(helpers.collateStringsIntoOneString(segmentsArray))
        console.log('AT %OF INPUT, currentSegmentHasPriorArithOperator FLAG IS :' + currentSegmentHasPriorArithOperator)
        

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
                    console.log('AT %OF, GOT TO NUMBER HAS NO OPEN OR CLOSE BRACKET, NO PRIOR ARITH OPERATOR')                
                    //no priior arith operator, no closing or open bracket,
                    // so we  just proceed to add '% of' portion
                    
                    //insert 'from ' before current number, and 'to' in the next segment
                    segmentsArray[currentSegmentIndex].stringValue = 'is ' + segmentsArray[currentSegmentIndex].stringValue
                    //add 'after added' into next segment
                    currentSegmentIndex++
                    segmentsArray[currentSegmentIndex] = {} //create
                    segmentsArray[currentSegmentIndex].stringValue = 'after deducted'
                    //add % sign in next segment
                    currentSegmentIndex++
                    segmentsArray[currentSegmentIndex] = {} //create
                    segmentsArray[currentSegmentIndex].stringValue = '%'
                }
                else {//has prior arith operator.
                    console.log('AT %OF, GOT TO NUMBER HAS NO BRACKETS, BUT HAS PRIOR ARITH OPERATOR')
                    //e.g 5 x 20, so we put open brack in front of 20, 
                    //becomes 5 x (20% of ...
        
                    //put ( in front of current segment
                    segmentsArray[currentSegmentIndex].stringValue = '[' + 'is ' + segmentsArray[currentSegmentIndex].stringValue
                    //add the % sign at end of this segmnt and 'of' in the next segment
                    currentSegmentIndex++
                    segmentsArray[currentSegmentIndex] = {} //create
                    segmentsArray[currentSegmentIndex].stringValue = 'after deducted'
                    //add %sign at next segment
                    currentSegmentIndex++
                    segmentsArray[currentSegmentIndex] = {} //create
                    segmentsArray[currentSegmentIndex].stringValue = '%'
                }
            }//no open or close bracket

            else
            if(currentSegmentHasAnOpenBracketFlag) {//has an open bracket. 
                console.log('AT %OF, GOT TO SEGMENT HAS OPEN BRACKT')
                //if has open bracket at start of segment, means user 
                //typed it in, e.g 5 x (20 , or ((20% of ...
                //if it is 5 x (20 , ie has prior arith operator, then we insert
                //a square bracket) 
                //. if it has no priior operator e.g ((20% of ... then we dont insert
                //the square bracket.
                
                // if(currentSegmentHasPriorArithOperator) {
                    //has prior arth operator, so we insert a square bracket 
                    //in front of the number

                    //get index of first numeral in segment, note: no g flag
                    let tempStr = segmentsArray[currentSegmentIndex].stringValue
                    let indexOfFirstNumeral = tempStr.search(/[0-9]/)
                    //need to slice and recombine, to insert the square bracket
                    let portion1 = tempStr.slice(0, indexOfFirstNumeral)
                    let portion2 = tempStr.slice(indexOfFirstNumeral)//defaults to eostring, ie lenght-1
                    tempStr = portion1 + '[' + 'from ' + portion2//insert
                    //copy back to real string
                    segmentsArray[currentSegmentIndex].stringValue = tempStr
                // }
                // else {//has no prior operator
                //     //igonore, dont insert square bracket
                // }

                //add 'to' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'after deducted'
                //add %sign at next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = '%'
            }
            else 
            if(currentSegmentHasACloseBracketFlag) {//has a close bracket.
                console.log('AT %OF, GOT TO SEGMENT HAS CLOSE BRACKT')
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
                    tempStr = portion1 + '[' + 'is ' + portion2
                    //copy back to real string
                    segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue = tempStr


                }
                
                //add 'of' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'after deducted'
                //add %sign at next segment
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
                backgroundColor: "gray",
                borderWidth: 0,
                borderColor: "black",
                height: "100%",
            },
            afterPercentDeductedButtonText: {
                fontSize: fontSizeOfStandardButton*0.7,
                color: "white",
                lineHeight: fontSizeOfStandardButton*0.7,
            },
        })



        return(
            <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> {this.handleCalcButtonClicked("after deducted %")}}>
                <View>
                    <Text style={styles.afterPercentDeductedButtonText}>after %</Text>
                    <Text style={styles.afterPercentDeductedButtonText}>deducted</Text>
                </View>
            </TouchableOpacity>
        )
    }

}



const mapStateToProps = (state) => ({
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    timeMachineArrayOfSegmentsArraySnapShots: state.calculatorStateData.timeMachineArrayOfSegmentsArraySnapShots
})


export default connect(mapStateToProps)(ButtonAfterDeductedPercent)