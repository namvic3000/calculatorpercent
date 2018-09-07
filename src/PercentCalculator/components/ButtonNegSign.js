import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'
import { updateSkinData } from "../../../actions/skinDataActions"






class ButtonNegSign extends React.Component {

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





     //console.log('GOT TO PROCESS OPERATOR -SIGN')

    
        let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
            
        //if segment has a close round bracket , no more input, no changing -ssign also
        if(/\)/.test(segmentsArray[currentSegmentIndex].stringValue)) {
            //return as is, segment has a ) close round bracket, locked, can 
            //not be changed
            return
        }
    
    
        //if segment is a number, ok, can toggle sign,
        //if is ooperator, then ignore key input
    
        //toggle the - sign
        if(currentSegmentIsANumberFlag) {
    
            //if has - sign, then remove it
            if(/\-/.test(segmentsArray[currentSegmentIndex].stringValue)) {//-sign exists
                //remove the - sign, in real string
                segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue.replace(/\-/,'')
            }
            else {//no -sign present, add it
                //need to find start index of numeral or $sign, coz could be ((5 , to become ((-5
                let indexOfFirstNumeral = segmentsArray[currentSegmentIndex].stringValue.search(/[0-9]|\$|¥|£|€/)
                let tempStr = segmentsArray[currentSegmentIndex].stringValue
                segmentsArray[currentSegmentIndex].stringValue = tempStr.slice(0, indexOfFirstNumeral) 
                    + '-' + tempStr.slice(indexOfFirstNumeral)
            }
        }
        else {
            //is ann operator, ignore
            //dont take a snapshot
            allowToTakeSnapShotOfState = false
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
            <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("+-")}}>
                <Text style={styles.calcButtonText}>±</Text>
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


export default connect(mapStateToProps)(ButtonNegSign)