import React, { Component } from 'react'
import { Dimensions, View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import {updateShowTapeStatus} from '../../../actions/tapeActions'
import {updateShowButtonSmallsPanelStatus} from '../../../actions/buttonSmallsPanelActions'
import { connect } from 'react-redux'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'
import { updateSkinData } from "../../../actions/skinDataActions";




class ButtonSmallTape extends Component {
    
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




        
        //if not currently showing tape, then show it
        if( ! this.props.showTapeStatus ) {
            this.props.dispatch(updateShowTapeStatus(true))
            //buttonsmalls panell will not autodismiss if tape is showing
            //so no action on buttonsmalls to keep it there is needed.
        }
        else {//is currently showing tape
            //dismiss the tape
            this.props.dispatch(updateShowTapeStatus(false))
            //dismiss the buttonsmalls panel also
            this.props.dispatch(updateShowButtonSmallsPanelStatus(false))
        }
        
    }//handle click
    
    





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
        if(this.props.showTapeStatus){
            styleToApplyContainer = styles.buttonBackgroundActive
            styleToApplyText = styles.buttonTextActive
        }
        else {
            styleToApplyContainer = styles.buttonBackgroundInactive
            styleToApplyText = styles.buttonTextInactive
        }





        return (
            <TouchableOpacity style={styleToApplyContainer} onPress={this.handleClick}>
                <Text style={styleToApplyText}>Tape</Text>
            </TouchableOpacity>
        )
    }
}



const mapStateToProps = (state) => ({
    showTapeStatus: state.tape.showTapeStatus,
    skinData: state.skinData
})

export default connect(mapStateToProps)(ButtonSmallTape)




