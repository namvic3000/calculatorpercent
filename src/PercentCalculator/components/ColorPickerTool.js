import React from 'react'
import {AsyncStorage,View, Dimensions, Button, StyleSheet, Platform, NativeModules, Text, TouchableOpacity} from 'react-native'
import { connect } from "react-redux"
import {TriangleColorPicker, fromHsv} from "react-native-color-picker"
import { updateSkinData } from "../../../actions/skinDataActions";
import { updateCalculatorData } from "../../../actions/calculatorDataActions";




class ColorPickerTool extends React.Component {
 

 



    colorPicked = hsvColor => {

        let selectedHexColorFromColorPicker = fromHsv(hsvColor)

        //get all fields original values, leave as is
        let showColorPickerStatus = this.props.skinData.showColorPickerStatus
        let skinSelectionModeActiveStatus = this.props.skinData.skinSelectionModeActiveStatus
        let currentComponentSkinToBeChanged = this.props.skinData.currentComponentSkinToBeChanged
        let memoryBoxesColor = this.props.skinData.memoryBoxesColor
        let memoryButtonsColor = this.props.skinData.memoryButtonsColor
        let percentButtonsColor = this.props.skinData.percentButtonsColor
        let keysSet1Color = this.props.skinData.keysSet1Color
        let keysSet2Color = this.props.skinData.keysSet2Color
        let buttonSmallsColor = this.props.skinData.buttonSmallsColor

        //nnow change the selected component's color
        switch(this.props.skinData.currentComponentSkinToBeChanged) {
            
            case 'memoryBoxesColor':
                memoryBoxesColor = selectedHexColorFromColorPicker
                break

            case 'memoryButtonsColor':
                memoryButtonsColor = selectedHexColorFromColorPicker
                break

            case 'percentButtonsColor': 
                percentButtonsColor = selectedHexColorFromColorPicker
                break

            case 'keysSet1': 
                keysSet1Color = selectedHexColorFromColorPicker
                break 

            case 'keysSet2': 
                keysSet2Color = selectedHexColorFromColorPicker
                break 
            
            case 'buttonSmallsColor':
                buttonSmallsColor = selectedHexColorFromColorPicker
                break

            default: break 
            
        }



        //now update store to affect change
        //leave everything same, except change skincolor of the selected componennt
        let dataObject = {
            showColorPickerStatus,
            skinSelectionModeActiveStatus,
            currentComponentSkinToBeChanged,
            memoryBoxesColor,
            memoryButtonsColor,
            percentButtonsColor,
            keysSet1Color,
            keysSet2Color,
            buttonSmallsColor,
        }

        this.props.dispatch(updateSkinData(dataObject))


    }




    

    dismissColorPicker = () => {

        //set status to false to dimiss color picker
        
            //leave everything same, except change skinseletionactivestatus to false
            let dataObject = {
                showColorPickerStatus: false,
                skinSelectionModeActiveStatus: this.props.skinData.skinSelectionModeActiveStatus,
                currentComponentSkinToBeChanged: this.props.skinData.currentComponentSkinToBeChanged,
                memoryBoxesColor: this.props.skinData.memoryBoxesColor,
                memoryButtonsColor: this.props.skinData.memoryButtonsColor,
                percentButtonsColor: this.props.skinData.percentButtonsColor,
                keysSet1Color: this.props.skinData.keysSet1Color,
                keysSet2Color: this.props.skinData.keysSet2Color,
                buttonSmallsColor: this.props.skinData.buttonSmallsColor
            }

            this.props.dispatch(updateSkinData(dataObject))


            //change message back to 'select a section '

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

    }





    render() {

 
        return(
                this.props.skinData.showColorPickerStatus ? (
                    <View style={styles.colorPickerOuterMostContainer}>

                    <View style={styles.colorPickerContainer}>
                        <TriangleColorPicker style={styles.colorPicker} 
                                onColorChange={color => { this.colorPicked(color) }}
                                hideSliders={true}/>
                        <TouchableOpacity style={styles.okButtonContainer} onPress={this.dismissColorPicker}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                ): (
                    null
                )
        )
    }
}



let styles = StyleSheet.create({
    
    colorPickerOuterMostContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'

    },
    colorPickerContainer: {
        // position: 'absolute',
        height: '60%',
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        padding: '5%'
    },
    colorPicker: {
        height: '100%',
        width: '100%',

    },
    okButtonContainer: {
        backgroundColor: 'green',
        width: '35%',
        height: Dimensions.get('window').width*0.07,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%'
    },
    buttonText: {
        // textAlign: 'center', NO NEED IF CONTAINER HAS CENTERED IT
        lineHeight: Dimensions.get('window').width*0.07,
        fontSize: Dimensions.get('window').width*0.04,
        color: 'white'
    }
})





const mapStateToProps = (state) => ({
    skinData: state.skinData,
})


export default connect(mapStateToProps)(ColorPickerTool)


