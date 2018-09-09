import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'
import { updateSkinData } from "../../../actions/skinDataActions";
import {updateShowSwitchOperandsStatus} from '../../../actions/switchOperandsActions'


class ButtonClearAll extends React.Component {

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



     //console.log('GOT TO PROCESS CA KEYS')
        
        let {segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots} = this.props 
          

        //do a clearall

        ///CLEARALL
        //collate stirng from all segments     
        let screenMainTextLine1 = ""
        let screenLiveAnswerLine = ""
        let screenMidScreenMessage = "Ready"
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


        //remove switchoperands icon
        this.props.dispatch(updateShowSwitchOperandsStatus(false))
    

        return//done , dont process below

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
                backgroundColor: `${this.props.skinData.keysSet2Color}`,
                borderWidth: 0,
                height: "100%",
            },
            calcButtonTextForCA: {
                fontSize: fontSizeOfStandardButton*0.83,
                color: "white",
            },
        })


        return(
            <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("ca")}}>
                <Text style={styles.calcButtonTextForCA}>CA</Text>
            </TouchableOpacity>
        )
    }

}



const mapStateToProps = (state) => ({
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    timeMachineArrayOfSegmentsArraySnapShots: state.calculatorStateData.timeMachineArrayOfSegmentsArraySnapShots,
    skinData: state.skinData,
})


export default connect(mapStateToProps)(ButtonClearAll)