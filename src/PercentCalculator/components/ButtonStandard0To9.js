import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'


class ButtonStandard0To9 extends React.Component {

    handleCalcButtonClicked = (buttonValue) => {

        console.log('BUTTON PRESSED IS:' + buttonValue)
        let {segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots} = this.props 
        let emptyScreenMainLineFlag = (segmentsArray || "").length<=0
        console.log('EMPTYSCREENFLAG IS :' + emptyScreenMainLineFlag)
        console.log('SEGMENTS ARRY, INDEX, AND TIMEMACHINEARRAY GOT ARE:',segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots)

        if(emptyScreenMainLineFlag) {
            console.log('GOT TO INSIDE EMPTYSCREEN IF')
            segmentsArray[0] = {}//create empty object
            console.log('GOT TO PT 1')

            segmentsArray[0].stringValue = buttonValue
            console.log('GOT TO PONT 2')

            currentSegmentIndex = 0
            console.log('GOT TO POINT 3')

            // store.dispatch(updateCalculatorData(segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots))
            // console.log('GOT TO POINT 4')

        }
    }//handleclick

    render() {

        let standardButtonWidth = Dimensions.get('window').width/5

        let fontSizeOfStandardButton = standardButtonWidth/2.8


        let styles = StyleSheet.create({
            standardButtonContainer: {
                //container for each individual button
                flex: 1,//each button has equal width, because the flexdir is now 'row'
                alignItems: 'center',
                justifyContent: 'center',
                color: 'blue',
                backgroundColor: "darkblue",//"rgb(250,250,255)",
                borderWidth: 0,
                height: "100%",
            },
            calcButtonText: {
                fontSize: fontSizeOfStandardButton,
                color: "white",
                textAlign: 'center'
            },
        })



        return(
            <View>
                <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked(this.props.buttonValue)}>
                    <Text style={styles.calcButtonText}>{this.props.buttonValue}</Text>
                </TouchableOpacity>
            </View>
        )
    }


}


const mapDispatchToProps = (dispatch) => ({
    updateData: (segmentsArray)
})

const mapStateToProps = (state) => ({
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    timeMachineArrayOfSegmentsArraySnapShots: state.calculatorStateData.timeMachineArrayOfSegmentsArraySnapShots
})
export default connect(mapStateToProps)(ButtonStandard0To9)