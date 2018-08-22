import React from 'react'
import { View, Text , StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import  {updateMemoryData} from "../../../actions/memoryActions"
import * as helpers from '../helpers'




class MemoryValuesPanel extends React.Component {

    handleMemoryValuePress = memoryNumber => {

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
                backgroundColor: "darkgray",
                borderWidth: 0,
            },
            memory2ValueContainer: {
                flex: 1,
                flexDirection: "row",
                paddingRight: "3%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "darkgray",
                borderWidth: 0,
                borderColor: "black"
            },
            memory1ValueTextStyle: {
                alignItems: "center",
                fontSize: fontSizeOfMem1Value,
                color: "blue",
                backgroundColor: "transparent"
            },
            memory2ValueTextStyle: {
                alignItems: "center",
                fontSize: fontSizeOfMem2Value,
                color: "blue",
                backgroundColor: "transparent"
            },
            active: {
                color: "green"
            },
            inActive: {
                color: "gray"
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
})


export default connect(mapStateToProps)(MemoryValuesPanel)
