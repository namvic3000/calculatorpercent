import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'
import { updateSkinData } from "../../../actions/skinDataActions";


class ButtonBackSpace extends React.Component {

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
                currentComponentSkinToBeChanged: 'keysSet2',
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



        console.log('GOT TO PROCESS BKSPCE KEYS')
        
        let {segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots} = this.props 
        
        let emptyScreenMainLineFlag = (segmentsArray || "").length <= 0


        
        if(emptyScreenMainLineFlag) {//if empty array/screen, no action
            // console.log('BACKSPACE BUTTON , IGNORE WHEN SEGMENTSARRAY IS EMPTY')
            return //dont process below code
        }

 
        //if there is only 1 snapshot left in the timemachine array, means at last char
        //so do a clearall and return, treat it as a clearall
        if(timeMachineArrayOfSegmentsArraySnapShots.length <=1) {
             
            //CLEARALL BLOCK///////////////////////////
            //collate stirng from all segments     
            let screenMainTextLine1 = ""
            let screenLiveAnswerLine = ""
            let screenMidScreenMessage = "Ready"
            let segmentsArray = []
            let currentSegmentIndex = 0
            let timeMachineArrayOfSegmentsArraySnapShots = []
            //clearall
            this.props.dispatch(updateCalculatorData(
                screenMainTextLine1,
                screenLiveAnswerLine,
                screenMidScreenMessage,
                segmentsArray, 
                currentSegmentIndex, 
                timeMachineArrayOfSegmentsArraySnapShots
            ))
            //////////////////////////////////////////////////
            return//done , dont process below
        }//if
    
    
        //if gets here, measns there are at least 2 snapshots
    
    
        //copy snapshot of previous state into segments array
    
        timeMachineArrayOfSegmentsArraySnapShots.pop()//remove current snapshot
        console.log('**AT BACKSPACE KEY: AFTER POPPING LAST SNAPSHOT, THE TIMEMACHINEARRAY IS ',timeMachineArrayOfSegmentsArraySnapShots)
        let indexOfLastSnapShot = timeMachineArrayOfSegmentsArraySnapShots.length -1
        console.log('**AT BACKSPACE KEY: INDEXOFLASTSNAPSHOT IS:',indexOfLastSnapShot)
        
        //copy snapshot into segmnts array, do deep copy so wont point to original
        segmentsArray = JSON.parse(JSON.stringify(timeMachineArrayOfSegmentsArraySnapShots[indexOfLastSnapShot].segmentsArraySnapShot))
        console.log('**AT BACKSPACE KEY: AFTER COPYING FROM SNAPSHOT, THE SEGMENTS ARRAY IS ',segmentsArray)
    
        //update the index of new segmentsarray to the last segment in that array
        //ready for next input
        currentSegmentIndex = segmentsArray.length - 1
    
        //collate stirng from all segments and update store which will update screen textline  
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
                backgroundColor: `${this.props.skinData.keysSet2Color}`,
                borderWidth: 0,
                height: "100%",
            },
            calcButtonTextForBackArrow: {
                fontSize: fontSizeOfStandardButton*1.2,
                color: "white",
            },
        })


        return(
            <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("«")}}>
                <Text style={styles.calcButtonTextForBackArrow}>«</Text>
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


export default connect(mapStateToProps)(ButtonBackSpace)