import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'






class ButtonDeciPoint extends React.Component {

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



        
        let {segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots} = this.props 
        
        let emptyScreenMainLineFlag = (segmentsArray || "").length<=0

        let allowToTakeSnapShotOfState = true
        

        //ok if user presses  decipoint key when screen is empty
        if(emptyScreenMainLineFlag) {
            segmentsArray = [] //new calculation
            segmentsArray[0] = {}//create empty object
            segmentsArray[0].stringValue = '0.'

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
            segmentsArray[0].stringValue = '0.'
            
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





        let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
        let currentSegmentString = segmentsArray[currentSegmentIndex].stringValue
        

        //note: current segment is never empty, except when whole array
        //is empty at start or after CA, so no need to check that condition

        //if currentsegment is a number then add . if not existed alreay
        if(currentSegmentIsANumberFlag) {
            //add only if not already exists
            if( ! /[.]/.test(currentSegmentString)) { //if not already on this number
                //decipoint not yet exist, add it

                //if string has a ')' closing bracket, locked, then cant add a decipoint to a bracket
                //becuase closing brackets means number is locked, cant alter it.
                if(/\)/.test(currentSegmentString)) {
                    //ignore, no action
                    //dont take snapshot
                    allowToTakeSnapShotOfState = false 
                }
                else {//may have naked number e.g 35 or has ']' eg '35]' or '35%]'
                    //append decpoint to last numeral, e.g 3%] becomes 3.%] or 3% becomes 3.%
                    //or 3 becomes 3. 

                    //find index of last numeral and insert the decipoint right after it

                    //find length of returned array, to find out number of numerals existing
                    let numberLength = (currentSegmentString.match(/[0-9]/g) || []).length //starts from 0, 
                    //remembr to put in the G flag, else would return first match only
                    
                    //get index of first number
                    let indexOfFirstNumeral = currentSegmentString.search(/[0-9]/)
                    //deduce index of last numeral
                    let indexOfLastNumeral = indexOfFirstNumeral + (numberLength - 1)
                    //insert the decipoint
                    let portion1 = currentSegmentString.slice(0, indexOfLastNumeral + 1)//+1 to include last numeral
                    let portion2 = currentSegmentString.slice(indexOfLastNumeral + 1)//to eo stirng
                    //copy back to real string
                    segmentsArray[currentSegmentIndex].stringValue = portion1 + '.' + portion2
                }
                    
            }
            else {
                //decipoint already exists, igonore decipoint key input
                //dont take snapshot
                allowToTakeSnapShotOfState = false
            }
        }
        else //if is just a % sign, and user presses . decipoint, then becomes 0.%
            if(currentSegmentString.length === 1 && /\%/.test(currentSegmentString)) {// only 1 char, and it is a %sign
                segmentsArray[currentSegmentIndex].stringValue = '0.%'   
            }
            else {//curr segment is an operator or empty
                //move to next segment and add 0.
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {}//create
                segmentsArray[currentSegmentIndex].stringValue = '0.'
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
            standardButtonContainer: {
                //container for each individual button
                flex: 1,//each button has equal width, because the flexdir is now 'row'
                alignItems: 'center',
                justifyContent: 'center',
                color: 'blue',
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
            <TouchableOpacity style={styles.standardButtonContainer} 
                            onPress={()=> {this.handleCalcButtonClicked(".")}}>
                <Text style={styles.calcButtonText}>.</Text>
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


export default connect(mapStateToProps)(ButtonDeciPoint)