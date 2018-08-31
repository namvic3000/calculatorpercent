import React, { Component } from 'react'
import { Dimensions,View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'
import { updateSkinData } from "../../../actions/skinDataActions";
import { updateShowAboutPageStatus } from "../../../actions/aboutPageActions";
import {updateShowButtonSmallsPanelStatus} from '../../../actions/buttonSmallsPanelActions'


class ButtonSmallAbout extends Component {
    
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
        }
        else {//not currently shwing, so show it
            this.props.dispatch(updateShowAboutPageStatus(true))
            //buttonsmalls panell will not autodismiss if any buttonsmalls
            //is active, so no need for any action on it
        }


    }//button clicked
    

    

    
    render() {


        

        let styles = StyleSheet.create({
            buttonBackgroundInactive: {
                backgroundColor: `${this.props.skinData.buttonSmallsColor}`,
                color: 'white',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
            buttonBackgroundActive: {
                backgroundColor: 'yellow',
                color: 'black',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
            buttonTextActive: {
                color: 'black',
                fontSize: Dimensions.get('window').width/18
            },
            buttonTextInactive: {
                color: 'white',
                fontSize: Dimensions.get('window').width/18
            }
        })


        let styleToApplyContainer;
        let styleToApplyText
        //get the correct styleing depending on state
        if(this.props.showAboutPageStatus){
            styleToApplyContainer = styles.buttonBackgroundActive
            styleToApplyText = styles.buttonTextActive
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




