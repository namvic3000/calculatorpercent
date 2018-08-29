import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'
import { updateSkinData } from "../../../actions/skinDataActions"






class ButtonCurrency extends React.Component {

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
                ...this.props.skinData,
                showColorPickerStatus: true,//show color picker now
                currentComponentSkinToBeChanged: 'keysSet2',
                // skinSelectionModeActiveStatus: this.props.skinData.skinSelectionModeActiveStatus,
                // memoryBoxesColor: this.props.skinData.memoryBoxesColor,
                // memoryButtonsColor: this.props.skinData.memoryButtonsColor,
                // percentButtonsColor: this.props.skinData.percentButtonsColor,
                // keysSet1Color: this.props.skinData.keysSet1Color,
                // keysSet2Color: this.props.skinData.keysSet2Color,
                // buttonSmallsColor: this.props.skinData.buttonSmallsColor
            }

            this.props.dispatch(updateSkinData(dataObject))


            //show message to pick a color

            //show 'select component to change' message
            ///CLEARALL
            //collate stirng from all segments     
            let screenMainTextLine1 = ""
            let screenLiveAnswerLine = ""
            let screenMidScreenMessage = "set the color"
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




        
        let {segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots,
                currentCurrency } = this.props 
        
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
             
            //if annswer been presented, and -signi  pressed, no action
            
            return //dont process below code
            
        }






        //first detect if current segment is a number or not
        let currentSegmentIsANumber = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
        // console.log('AT PROCESS4ARITHKEYS, CURENTSEGENT IS A NUMBER FLAG IS ' + currentSegmentIsANumberFlag)
        
        let hasPercentCalculation = /of|add|deduct|to|added|deducted|is|then/.test(helpers.collateStringsIntoOneString(segmentsArray))
        // console.log('AT PROCESS4ARITHKEYS, CURENTSEGENT HAS PRIOR PERCENT CALC FLAG IS ' + hasPriorPercentCalculation)
        
        let hasPriorOpenSquareBracket = /\[/.test(helpers.collateStringsIntoOneString(segmentsArray))
        // console.log('AT PROCESS4ARITHKEYS, CURENTSEGENT HAS PRIOR OPEN SQUARE BRACKET FLAG IS ' + hasPriorOpenSquareBracket)
         
        let hasPriorCloseSquareBracket = /\]/.test(helpers.collateStringsIntoOneString(segmentsArray))

        let currentSegmentHasCloseSquareBracket = /\]/.test(segmentsArray[currentSegmentIndex].stringValue)

        let hasPriorArithOperator = /(\+|x|÷)|(-\s)/g.test(helpers.collateStringsIntoOneString(segmentsArray))

        console.log('GOT TO PROCESS CURRENCY BUTTON-------------------------------')

    
        let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
            
        //if segment has a close round bracket , no more input, no changing -ssign also
        if(/\)/.test(segmentsArray[currentSegmentIndex].stringValue)) {
            //return as is, segment has a ) close round bracket, locked, can 
            //not be changed
            return
        }
    
    
        let allowCurrencySymbol = true 
        console.log('CURREN CURRRENCY IS ' + currentCurrency)

        //if segment is a number, ok, can toggle sign,
        //if is ooperator, then ignore key input
    
        //toggle the - sign
        if(currentSegmentIsANumberFlag) {
    
            //if has currency sign, then remove it
            let pattern = new RegExp(currentCurrency)//test for current currency symbol, $, ¥, etc..


            if(/\$|£|¥|€/.test(segmentsArray[currentSegmentIndex].stringValue)) {//-sign exists
                console.log('FOUNND CURRENCY, NOW REMOVING IT ')
                //remove the - sign, in real string
                segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue.replace(currentCurrency,'')
            }
            else {//no currency found in current segment
                if(hasPercentCalculation) {
                    ///need to find out if there is arith operator before percentge calcluation,
                    //to determine if it is a standalone percent calculaiton
                    //get index of start of percent calculation
                    let str = helpers.collateStringsIntoOneString(segmentsArray)
                    let indexOfStartOfPercentCalculation = str.search(/of|add|deduct|to|added|deducted|is|then/)
                    console.log('BUTTONCURRENCY: INDEX OF START OF PERCENT CALCLATION IS: '+indexOfStartOfPercentCalculation)

                    //need to search upto the start of percent calculation see
                    //if there is an operator sign
                    let hasPriorArithOperatorBeforePercentCalculation = 
                        /(\+|x|÷)|(-\s)/g.test(str.slice(0,indexOfStartOfPercentCalculation))
                    console.log('BUTTONCURRENCY: HAS ARITH BEFORE START OF PERCENT CALCLATION IS: '+hasPriorArithOperatorBeforePercentCalculation)



                    //first determine if inside percentage calculation

                    //if has oopen square bracket andd no close square bracket, 
                    //means inside percentage calculation
                    //OR currentsegment has a close ssquare bracket
                    //0R no close square bracket, no open square bracket, 
                    //no arith operators before start of percnt calc
                    //means we are inside perent calculation, at operand2
                    let insidePercentageCalculationFlag = false  
                    if( (! hasPriorOpenSquareBracket) && ( ! hasPriorCloseSquareBracket)){

                        //no close square brack, no open squre bracket, must be a 
                        //standalone % calculation
                        console.log('$$$$$%%%%% BUTTONCURRENCY: STANDALONE % CALCULATION, NEITHER []')
                        insidePercentageCalculationFlag = true 
                    }
                    else
                    if(hasPriorOpenSquareBracket && (! hasPriorCloseSquareBracket)){
                        //open square bracket , no close square bracket, in middle of percent 
                        //calclation, opeand2
                        console.log('$$$$$%%%%% BUTTONCURRENCY: INSIDE PERCENT CALC, HAS OPEN [, NO ]')
                        insidePercentageCalculationFlag = true                         
                    }
                    else 
                    if(currentSegmentHasCloseSquareBracket) {
                        console.log('$$$$$%%%%%% BUTTONCURRENCY: INSIDE PERCENT CALC, CURRENTSEGMENT HAS ]')
                        insidePercentageCalculationFlag = true 
                    }
                    else
                    if( hasPriorOpenSquareBracket && (hasPriorCloseSquareBracket)){
                        console.log('$$$$$%%%%%%%% BUTTONCURRENCY: OUTSIDE OF, AFTER PERCENT CALC, HAS BOTH []')
                        insidePercentageCalculationFlag = false//outside of percentcalculaton, allowcurrency 
                    }


                    ///
                    //now dont allow currency symbol for these percentcalculaions
                    if(insidePercentageCalculationFlag) {
                        let noCurrencyOperand2CalculationFlag = /add|deduct|added|deducted|then/.test(helpers.collateStringsIntoOneString(segmentsArray))
                        if(noCurrencyOperand2CalculationFlag) {
                            allowCurrencySymbol = false 
                        }
                    }
                     
                     
                }//haspercentcalculation
                



                console.log('ALLOWCURRENCY FLAG IS ' + allowCurrencySymbol)
                //when gets here, either has no percent calculation in whole calculation,
                //or already passed thru percntcalculation checks above

                //if allow currency, then add to calculation string
                if(allowCurrencySymbol) {
                    //need to find start index of numeral, coz could be ((5 , to become ((-5
                    let indexOfFirstNumeral = segmentsArray[currentSegmentIndex].stringValue.search(/[0-9]/)
                    let tempStr = segmentsArray[currentSegmentIndex].stringValue
                    segmentsArray[currentSegmentIndex].stringValue = tempStr.slice(0, indexOfFirstNumeral) 
                        + currentCurrency + tempStr.slice(indexOfFirstNumeral)
                }
                
                
                
                
                
                
                
                //no curency sign present, add it

                 //for certain percetage calculaiton types, cannot insert
                 //$ sign, else makes no sense, e.g 2000 add $25% 
                 //so we dont add $ sign, if 2nd operand is a % one.

                 //only affects percentage calculations, no effect on arith
                 //calculations.





            }//no currency in current segment
        }
        else {//is not a number
            //is ann operator, ignore
            //dont take a snapshot
            allowToTakeSnapShotOfState = false
        }//
    
    
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
                backgroundColor: `${this.props.skinData.keysSet2Color}`,//"rgb(250,250,255)",
                borderWidth: 0,
                height: "100%",
            },
            calcButtonTextForCurrency: {
                fontSize: fontSizeOfStandardButton*0.95,
                color: "white",
            },
        })



        return(
            <TouchableOpacity style={styles.standardButtonContainer} value="+" onPress={ () => {this.handleCalcButtonClicked("currency")}}>
                            <Text style={styles.calcButtonTextForCurrency}>{this.props.currentCurrency}</Text>
            </TouchableOpacity>
        )
    }

}






const mapStateToProps = (state) => ({
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    timeMachineArrayOfSegmentsArraySnapShots: state.calculatorStateData.timeMachineArrayOfSegmentsArraySnapShots,
    skinData: state.skinData,
    currentCurrency: state.currency.currentCurrency
})


export default connect(mapStateToProps)(ButtonCurrency)