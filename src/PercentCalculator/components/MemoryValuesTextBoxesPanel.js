import React from 'react'
import { View, Text , StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import  {updateMemoryData} from "../../../actions/memoryActions"
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'
import {updateSkinData} from '../../../actions/skinDataActions'




class MemoryValuesPanel extends React.Component {

    handleMemoryValuePress = memoryNumber => {


        ////check if in skinn color selection mode, if so, indicate that
        //that component to chage is keysSet1
        if(this.props.skinData.skinSelectionModeActiveStatus) {
            //component to chanage is keyset1

            //leave everything same, except set keys to change to keysset1
            //and showcolorpicker to true.
            let dataObject = {
                showColorPickerStatus: true,//show color picker now
                skinSelectionModeActiveStatus: this.props.skinData.skinSelectionModeActiveStatus,
                currentComponentSkinToBeChanged: 'memoryBoxesColor',
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




        console.log('MEMORY PRESSED, MEMORY NUMER: ' + memoryNumber)

        //update memory status to correct memory number
        let memory1Value = this.props.memory1Value
        let memory2Value = this.props.memory2Value
        let currentActiveMemory = memoryNumber

        console.log('AT MEMORY VALUES PANEL, mem1value, mem2val, currntactivemem are: ', + memory1Value, memory2Value, currentActiveMemory)
        
        this.props.dispatch(updateMemoryData(memory1Value, memory2Value, currentActiveMemory))
    }






    render() {

 

        let allowedLengthOfMemoryValueBeforeShrinking = 10
        
        let mem1Excess = this.props.memory1Value.length - allowedLengthOfMemoryValueBeforeShrinking
        if (mem1Excess < 0) {
          mem1Excess = 0
        }
        
        let mem2Excess = this.props.memory2Value.length - allowedLengthOfMemoryValueBeforeShrinking
        if (mem2Excess < 0) {
          mem2Excess = 0
        }
    
        console.log('MEMVALUES PANEL: MEM1 AND MEM2 EXCESSES AREE: '+mem1Excess, mem2Excess)
        let fontSizeOfMem1Value = Dimensions.get('window').width/21 - ((mem1Excess * 0.4))
        let fontSizeOfMem2Value = Dimensions.get('window').width/21 - ((mem2Excess * 0.4))

        

        console.log('MEMVALUES CONTAINER, BGCOLORS ARE: ' + this.props.skinData.memoryBoxesColor)

        let styles = StyleSheet.create( {
            container: {
                flex: 0.3,
                flexDirection: "row",
            },
            memory1ValueContainer: {
                flex: 1,
                flexDirection: "row",
                paddingLeft: "3%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: `${this.props.skinData.memoryBoxesColor}` || '#000000',
                borderWidth: 0,
            },
            memory2ValueContainer: {
                flex: 1,
                flexDirection: "row",
                paddingRight: "3%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: `${this.props.skinData.memoryBoxesColor}`,
                borderWidth: 0,
                borderColor: "black"
            },
            memory1ValueTextStyle: {
                alignItems: "center",
                fontSize: fontSizeOfMem1Value,
                backgroundColor: "transparent"
            },
            memory2ValueTextStyle: {
                alignItems: "center",
                fontSize: fontSizeOfMem2Value,
                backgroundColor: "transparent"
            },
            active: {
                color: "white"
            },
            inActive: {
                color: "darkgray"
            }
        })


        let memory1ValueTextStyle, memory2ValueText;
        //make the correct mmory box turn into color of active box
        if(this.props.currentActiveMemory === 1) {//memory1 is active
            memory1ValueText = [styles.memory1ValueTextStyle, styles.active]
            memory2ValueText = [styles.memory2ValueTextStyle, styles.inActive]
        }
        else {//memory2 is active
            memory1ValueText = [styles.memory1ValueTextStyle, styles.inActive]
            memory2ValueText = [styles.memory2ValueTextStyle, styles.active]
        }


        //insert separators to the mem value to be dipsplayed
        // let mem1ValueWithSeparators = helpers.truncateDecimalPlacesOfString(this.props.memory1Value)
        let mem1ValueWithSeparators = helpers.insertThousandsSeparatorsForOneSingleNumberString(this.props.memory1Value)
        // let mem2ValueWithSeparators = helpers.truncateDecimalPlacesOfString(this.props.memory2Value)
        let mem2ValueWithSeparators = helpers.insertThousandsSeparatorsForOneSingleNumberString(this.props.memory2Value)

        console.log('AT MEMVALUESPANEL, MEM1VALUE TO DISPLAY IS: ' + mem1ValueWithSeparators)
        return(
            <View style={styles.container}>
                    <TouchableOpacity style={styles.memory1ValueContainer} onPress={() => {this.handleMemoryValuePress(1)}}>
                        <Text style={memory1ValueText}> {mem1ValueWithSeparators}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.memory2ValueContainer} onPress={() => {this.handleMemoryValuePress(2)}}>
                        <Text style={memory2ValueText}> {mem2ValueWithSeparators}</Text>
                    </TouchableOpacity>
            </View>
        )
    }

}



const mapStateToProps = (state) => ({
    memory1Value: state.memory.memoryData.memory1Value,
    memory2Value: state.memory.memoryData.memory2Value,
    currentActiveMemory: state.memory.memoryData.currentActiveMemory,
    skinData: state.skinData
})


export default connect(mapStateToProps)(MemoryValuesPanel)
