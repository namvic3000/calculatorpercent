import React, { Component } from 'react'
import { Dimensions, View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'
import {updateSkinData} from '../../../actions/skinDataActions'
import {updateShowButtonSmallsPanelStatus} from '../../../actions/buttonSmallsPanelActions'



class ButtonSmallSkin extends Component {
     

    

    handleClick = () => {

        console.log('SKINBUTTONSMALL PRESSED')
        //if in skin selection mode and usr presses skin button small,
        //close the buttonsmall panel, and go back to normal calculation 
        //mode
        //note: user cannot press on skinbuttonsmall if colorpicker is displaed,
        ///so if press on skinbuttonsmall while skinsecetionmode is active,
        //means color picker already is off

        //if skin slection status is on, and user presses skinbuttonsmall,
        //turn secletionmode off, so normal calculaion mode resumes

        console.log('AT BUTTONSMALLL SKIN, THIS.PROPS.SKINDATA IS ', this.props.skinData)
        if(this.props.skinData.skinSelectionModeActiveStatus) {
            console.log( 'GOT TO SKINBUTTON WHEN SELECTON STATUS IS TRUE')
            //leave everything same, except change skinseletionactivestatus to false
            let dataObject = {
                ...this.props.skinData,
                showColorPickerStatus: false,//redundant, coz has to be false for skin button to be touchable.//this.props.skinData.showColorPickerStatus,
                skinSelectionModeActiveStatus: false,
                currentComponentSkinToBeChanged: '',//reset to nothing. this.props.skinData.currentComponentSkinToBeChanged,
                // memoryBoxesColor: this.props.skinData.memoryBoxesColor,
                // memoryButtonsColor: this.props.skinData.memoryButtonsColor,
                // percentButtonsColor: this.props.skinData.percentButtonsColor,
                // keysSet1Color: this.props.skinData.keysSet1Color,
                // keysSet2Color: this.props.skinData.keysSet2Color,
                // buttonSmallsColor: this.props.skinData.buttonSmallsColor
            }

            this.props.dispatch(updateSkinData(dataObject))


            //now hide the buttonsmallls panel
            this.props.dispatch(updateShowButtonSmallsPanelStatus(false))

            //do a clearall to reset calculatoin that was there before user
            //pressed on buttonsmallskin button

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
        }

        
        else {////skinselectionmodestatus is false, so enable it
            console.log( 'GOT TO SKINBUTTON WHEN SELECTON STATUS IS FALSE')


            //leave everything same, except change skinseletionactivestatus to false
            let dataObject = {
                ...this.props.skinData,
                skinSelectionModeActiveStatus: true,

                // showColorPickerStatus: this.props.skinData.showColorPickerStatus,
                // currentComponentSkinToBeChanged: this.props.skinData.currentComponentSkinToBeChanged,
                // memoryBoxesColor: this.props.skinData.memoryBoxesColor,
                // memoryButtonsColor: this.props.skinData.memoryButtonsColor,
                // percentButtonsColor: this.props.skinData.percentButtonsColor,
                // keysSet1Color: this.props.skinData.keysSet1Color,
                // keysSet2Color: this.props.skinData.keysSet2Color,
                // buttonSmallsColor: this.props.skinData.buttonSmallsColor
            }

            this.props.dispatch(updateSkinData(dataObject))


            //dont immediately show colorpicker until user selects compomnt 
            //to chnage skin of


            //show 'select component to change' message
            ///CLEARALL
            //collate stirng from all segments     
            let screenMainTextLine1 = ""
            let screenLiveAnswerLine = ""
            let screenMidScreenMessage = "select a section"
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

            //now await user to press on a component to change, each
            //key will check if skinselection status is true or not to
            //know how to respond.

        }

    }



    
    render() {



        let styles = StyleSheet.create({
            buttonInactive: {
                backgroundColor: `${this.props.skinData.buttonSmallsColor}`,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
            buttonActive: {
                backgroundColor: 'lightyellow',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
            buttonText: {
                color: 'black',
                fontSize: Dimensions.get('window').width/16.5
            }
        })



        let styleToApply;
        //get the correct styleing depending on state
        if(this.props.skinData.skinSelectionModeActiveStatus){
            styleToApply = styles.buttonActive
        }
        else {
            styleToApply = styles.buttonInactive
        }



        return (
            <TouchableOpacity style={styleToApply} onPress={this.handleClick}>
                <Text style={styles.buttonText}>Skin</Text>
            </TouchableOpacity>
        )
    }
}





const mapStateToProps = (state) => ({
    skinData: state.skinData,
    calculatorStateData: state.calculatorStateData,
    showButtonSmallsPanelStatus: state.buttonSmallsPanel.showButtonSmallsPanelStatus
})


export default connect(mapStateToProps)(ButtonSmallSkin)



