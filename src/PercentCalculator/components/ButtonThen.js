import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'






class ButtonThen extends React.Component {

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
            //impossible to get here
            return//dont process below code
        }
                
        

        //clear any trailing decimal point if exist, every time press on 
        //arith operator or percent operator or close bracket
        helpers.cleanUpAllTrailingDeciPoints(segmentsArray)

        

        //if there is just 'if' without 'then', then at operand2,
        //if there is an open round brracket outstanding, then dont add 
        //then, just ignore user input when they press on 'then'
        //e.g if 3% is (23 x 5   and user presses 'then', ignore input as
        //operand2 is not completed when there is an open bracket outstanding.
        if( (/if/i.test(helpers.collateStringsIntoOneString(segmentsArray))) && ( ! /then/i.test(helpers.collateStringsIntoOneString(segmentsArray))) ) {
            //only allow arith operator if current segment is a number and 
            //nett bracket value , from the 'if ... onwards is -1 or less

            let tempStr = helpers.collateStringsIntoOneString(segmentsArray)
            //get index of the 'if'
            let indexOfIfWord = tempStr.search(/if/)
            tempStr = tempStr.slice(indexOfIfWord)
            let nettValueOfRoundBrackets = helpers.getParenthesesNetValueFromString(tempStr)
            
            //if open brackets outstanding, ignore the 'then' button
            if(nettValueOfRoundBrackets <= -1) {//active open bracket, 
                //ignore, user input
                return 
            }

            //also, if current segment is not a number, e.g 'if 25% is ' , ie incomplete
            //  and user presses 'then', ie no operand2, ignore input
            if( ! /[0-9]/.test( segmentsArray[currentSegmentIndex].stringValue) ) {
                //if current segment is not a number, igonore input
                return 
            }
        }





        //when this key is pressed, line is in format of:
        //if 25% is 258 
        //so move to next segment and add 'then', becomes
        //'if 25% iss 258 then'


        //move to next segment and insert 'then'
        currentSegmentIndex++
        segmentsArray[currentSegmentIndex] = {}//create 
        segmentsArray[currentSegmentIndex].stringValue = 'then'

        //move to next segment and add the "%" sign
        currentSegmentIndex++
        segmentsArray[currentSegmentIndex] = {}//create 
        segmentsArray[currentSegmentIndex].stringValue = '%'

    
    
        
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
            standardButtonContainer: {
                //container for each individual button
                flex: 1,//each button has equal width, because the flexdir is now 'row'
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "darkgreen",//"rgb(250,250,255)",
                borderWidth: 0,
                height: "100%",
            },
            calcButtonText: {
                fontSize: fontSizeOfStandardButton,
                color: "white",
            },
        })



        return(
            <TouchableOpacity style={styles.standardButtonContainer} 
                            onPress={()=> {this.handleCalcButtonClicked("then")}}>
                <Text style={styles.calcButtonText}>then</Text>
            </TouchableOpacity>
        )
    }

}




const mapStateToProps = (state) => ({
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    timeMachineArrayOfSegmentsArraySnapShots: state.calculatorStateData.timeMachineArrayOfSegmentsArraySnapShots
})


export default connect(mapStateToProps)(ButtonThen)