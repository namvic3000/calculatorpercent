import React, { Component } from 'react'
import { Dimensions,View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'
import { updateSkinData } from "../../../actions/skinDataActions";
import { updateShowAboutPageStatus } from "../../../actions/aboutPageActions";
import {updateShowButtonSmallsPanelStatus} from '../../../actions/buttonSmallsPanelActions'


class ButtonSmallAbout extends Component {
    


    state = {
        flashStage: 1//1 = flash stage 1, 2 = flash stage 2
        //only effective if skinbuttonsmll is active
    }





    handleClick = () => {


        ////check if in skinn color selection mode, if so, indicate that
        //that component to chage is keysSet1
        if(this.props.skinData.skinSelectionModeActiveStatus) {
            //component to chanage is keyset1

            //leave everything same, except set keys to change to keysset1
            //and showcolorpicker to true.
            let dataObject = {
                showColorPickerStatus: true,//show color picker now
                skinSelectionModeActiveStatus: this.props.skinData.skinSelectionModeActiveStatus,
                currentComponentSkinToBeChanged: 'buttonSmallsColor',
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





        //if one of the other buttonsmalls is active, then no action,
        //just return
        ///the skinselectionmodeactivestatus test is redundant, already done above,
        //but leave for redundancy
        if( (this.props.skinSelectionModeActiveStatus == true) || (this.props.showTapeStatus == true) ) {
            //no action
            return 
        }

        //if gets here, no other buttonsmalls is active


        //if currently showing thenn hide it , and hide the buttonsmalls
        //panel
        if(this.props.showAboutPageStatus) {
            this.props.dispatch(updateShowAboutPageStatus(false))
            //dismiss the buttonsmalls panel also
            this.props.dispatch(updateShowButtonSmallsPanelStatus(false))
        
        
            //remove setintervall timer
            clearInterval(this.flashingAnimationTimer)
        
        }
        else {//not currently shwing, so show it
            this.props.dispatch(updateShowAboutPageStatus(true))
            //buttonsmalls panell will not autodismiss if any buttonsmalls
            //is active, so no need for any action on it
        

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


    }//button clicked
    

    

    
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
                backgroundColor: 'rgb(32, 142, 45)',//`${this.props.skinData.buttonSmallsColor}`,//'rgb(32, 142, 45)',
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
        if(this.props.showAboutPageStatus){//about button is active
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
                <Text style={styleToApplyText}>About</Text>
            </TouchableOpacity>
        )
    }
}



const mapStateToProps = (state) => ({
    showTapeStatus: state.tape.showTapeStatus,
    skinData: state.skinData,
    showAboutPageStatus: state.aboutPage.showAboutPageStatus,
    skinSelectionModeActiveStatus: state.skinData.skinSelectionModeActiveStatus
})



export default connect(mapStateToProps)(ButtonSmallAbout)




