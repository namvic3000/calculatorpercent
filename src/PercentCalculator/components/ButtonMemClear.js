import React from 'react'
import { View, Text , StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import  {updateMemoryData} from "../../../actions/memoryActions"
import { updateSkinData } from "../../../actions/skinDataActions";
import { updateCalculatorData } from "../../../actions/calculatorDataActions"








class ButtonMemClear extends React.Component {
 

    handleCalcButtonClicked = () => {
        


        ////check if in skinn color selection mode, if so, indicate that
        //that component to chage is keysSet1
        if(this.props.skinData.skinSelectionModeActiveStatus) {
            //component to chanage is keyset1

            //leave everything same, except set keys to change to keysset1
            //and showcolorpicker to true.
            let dataObject = {
                showColorPickerStatus: true,//show color picker now
                skinSelectionModeActiveStatus: this.props.skinData.skinSelectionModeActiveStatus,
                currentComponentSkinToBeChanged: 'memoryButtonsColor',
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

        
    //console.log('MEMORYCLEAR PRESSED')

        //now update store, with new memory data, react UI will auto update

        let memory1Value = this.props.memory1Value
        let memory2Value = this.props.memory2Value 
        let currentActiveMemory = this.props.currentActiveMemory

        if(currentActiveMemory === 1) {
            memory1Value = "empty"
            memory2Value = this.props.memory2Value
        }
        else {
            memory1Value = this.props.memory1Value
            memory2Value = "empty"
        }
            
        this.props.dispatch(updateMemoryData(memory1Value, memory2Value, currentActiveMemory))
         
    }//handlecalcbuttonclick






    render() {


        let standardButtonWidth = Dimensions.get('window').width/5

        let fontSizeOfStandardButton = standardButtonWidth/2.8


        let styles = StyleSheet.create( {
            container: {
                //flex 1 means each button in row has equal width, because flexdir is set as 'row'
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: "center",
                backgroundColor: `${this.props.skinData.memoryButtonsColor}`,
                borderWidth: 0,
                borderColor: "black",
                height: "100%",
            },
            buttonText:{
                fontSize: fontSizeOfStandardButton*0.7,
                color: "white",
            },
        })


        
                return(
                    <TouchableOpacity style={styles.container} onPress={this.handleCalcButtonClicked}>
                        <Text style={styles.buttonText}>MC</Text>
                    </TouchableOpacity>
                )
            }

        }



const mapStateToProps = (state) => ({
    memory1Value: state.memory.memoryData.memory1Value,
    memory2Value: state.memory.memoryData.memory2Value,
    currentActiveMemory: state.memory.memoryData.currentActiveMemory,
    skinData: state.skinData
})




export default connect(mapStateToProps)(ButtonMemClear)
