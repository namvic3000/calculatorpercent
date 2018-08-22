import React from 'react'
import { View, Text , StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import  {updateMemoryData} from "../../../actions/memoryActions"









class ButtonMemClear extends React.Component {
 

    handleCalcButtonClicked = () => {
        
        
       console.log('MEMORYCLEAR PRESSED')

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
                backgroundColor: "gray",
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
})




export default connect(mapStateToProps)(ButtonMemClear)
