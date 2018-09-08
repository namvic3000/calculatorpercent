import React, { Component } from 'react'
import { Dimensions, View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'
import {updateSkinData} from '../../../actions/skinDataActions'
import {updateShowButtonSmallsPanelStatus} from '../../../actions/buttonSmallsPanelActions'



class ButtonSmallSkin extends Component {
     

    state = {
        flashStage: 1//1 = flash stage 1, 2 = flash stage 2
        //only effective if skinbuttonsmll is active
    }




    handleClick = () => {

     //console.log('SKINBUTTONSMALL PRESSED')
        //if in skin selection mode and usr presses skin button small,
        //close the buttonsmall panel, and go back to normal calculation 
        //mode
        //note: user cannot press on skinbuttonsmall if colorpicker is displaed,
        ///so if press on skinbuttonsmall while skinsecetionmode is active,
        //means color picker already is off

        //if skin slection status is on, and user presses skinbuttonsmall,
        //turn secletionmode off, so normal calculaion mode resumes

     //console.log('AT BUTTONSMALLL SKIN, THIS.PROPS.SKINDATA IS ', this.props.skinData)
        if(this.props.skinData.skinSelectionModeActiveStatus) {
         //console.log( 'GOT TO SKINBUTTON WHEN SELECTON STATUS IS TRUE')
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

            //remove setintervall timer
            clearInterval(this.flashingAnimationTimer)
        }

        
        else {////skinselectionmodestatus is false, so enable it
         //console.log( 'GOT TO SKINBUTTON WHEN SELECTON STATUS IS FALSE')

            //if one of the other buttonsmalls is active, then no action,
            //just return
            if( (this.props.showAboutPageStatus == true) || (this.props.showTapeStatus == true) ) {
                //no action
                return 
            }

            //if gets here, no other buttonsmalls is active

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
            let screenMidScreenMessage = "tap on a section to change"
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



            //set interval timer to change skinbuttonsmall color, to
            //make it look lik it is flashing
            this.flashingAnimationTimer = setInterval( () => {
                if(this.state.flashStage == 1) {
                    this.setState( {flashStage: 2})
                }
                else{// is flash stage 2 or anything else
                    this.setState( {flashStage: 1})
                }
            }, 500)

        }

    }



    
    render() {
 

        let isTabletDevice = Dimensions.get('window').width >= 768
        let tabletScaleFactor;

        if(isTabletDevice) {//table, so make font smaller
            tabletScaleFactor = 0.75
        }
        else {
            tabletScaleFactor = 1//no change
        }



        let styles = StyleSheet.create({
            buttonBackgroundInactive: {
                backgroundColor: `${this.props.skinData.buttonSmallsColor}`,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
            buttonBackgroundFlashStage1: {
                backgroundColor: 'orange',//'rgb(32, 142, 45)',//`${this.props.skinData.buttonSmallsColor}`,//'rgb(32, 142, 45)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
            buttonBackgroundFlashStage2: {
                backgroundColor: 'white',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
            // buttonBackgroundActive: {
            //     backgroundColor: 'yellow',
            //     color: 'black',
            //     flex: 1,
            //     justifyContent: 'center',
            //     alignItems: 'center',
            // },
            // buttonTextActive: {
            //     color: 'black',
            //     fontSize: Dimensions.get('window').width/18 * tabletScaleFactor
            // },
            buttonTextInactive: {
                color: 'white',
                fontSize: Dimensions.get('window').width/18 * tabletScaleFactor
            },
            buttonTextFlashStage1: {
                color: 'white',
                fontSize: Dimensions.get('window').width/18 * tabletScaleFactor
            },
            buttonTextFlashStage2: {
                color: 'black',
                fontSize: Dimensions.get('window').width/18 * tabletScaleFactor
           }
        })



        let styleToApplyContainer;
        let styleToApplyText
        //get the correct styleing depending on state
        if(this.props.skinData.skinSelectionModeActiveStatus){
            // styleToApplyContainer = styles.buttonBackgroundActive
            // styleToApplyText = styles.buttonTextActive
            if(this.state.flashStage == 1) {
                styleToApplyContainer = styles.buttonBackgroundFlashStage1
                styleToApplyText = styles.buttonTextFlashStage1
            }
            else{//is stage 2
                styleToApplyContainer = styles.buttonBackgroundFlashStage2
                styleToApplyText = styles.buttonTextFlashStage2
            }
        }
        else {
            styleToApplyContainer = styles.buttonBackgroundInactive
            styleToApplyText = styles.buttonTextInactive
        }



        return (
            <TouchableOpacity style={styleToApplyContainer} onPress={this.handleClick}>
                <Text style={styleToApplyText}>Skin</Text>
            </TouchableOpacity>
        )
    }
}





const mapStateToProps = (state) => ({
    skinData: state.skinData,
    calculatorStateData: state.calculatorStateData,
    showButtonSmallsPanelStatus: state.buttonSmallsPanel.showButtonSmallsPanelStatus,
    showTapeStatus: state.tape.showTapeStatus,
    showAboutPageStatus: state.aboutPage.showAboutPageStatus,
})


export default connect(mapStateToProps)(ButtonSmallSkin)



