import React, { Component } from 'react'
import { Text, View, StyleSheet , Dimensions, TouchableOpacity, ScrollView, Button} from 'react-native'
import uuid from 'uuid/v4'
import { connect  } from "react-redux";
import  * as helpers from "../helpers";
import {updateShowTapeStatus} from "../../../actions/tapeActions";


class Tape extends Component {


    handleClick = () => {
        alert('clicked')

    }

    closeTape = () => {

        this.props.dispatch(updateShowTapeStatus(false))
    }



    render() {

        let {arrayOfRecords, showTapeStatus} = this.props

        let arrayOfCompleteCalculationStrings = arrayOfRecords.map( segmentsArray => {
            return helpers.collateStringsIntoOneString(segmentsArray)
        })
        console.log('####################################AT TAPE: ARRAY OF HISTORY RECORDS, ARRAY IS ', arrayOfRecords)
        console.log('####################################AT TAPE: ARRAY OF HISTORY RECORDS, ARRAY OF HISTORY STRING IS ', arrayOfCompleteCalculationStrings)
        console.log('####################################AT TAPE: ARRAY OF HISTORY RECORDS, TAPE STATUS IS ', showTapeStatus)


        return(
                showTapeStatus ? (
                    <ScrollView style={styles.scrollView}>
                    {
                        arrayOfCompleteCalculationStrings.map( (string, index) => (
                            <View key={index} style={styles.oneSegmentContainer}>
                                <View><Text style={styles.calculationText} key={uuid()}>{string}</Text></View>
                                <Button style={styles.deleteButton} title="delete"/>
                            </View>))
                        
                    }
                    <TouchableOpacity onPress={this.closeTape} style={styles.closeButton}><Text>Close</Text></TouchableOpacity>
                    </ScrollView>
                ): (
                    null
                )
        )

        

        // if(showTapeStatus) {
        //     return(
        //         <ScrollView style={styles.scrollView}>
        //         {
        //             arrayOfCompleteCalculationStrings.map( (string, index) => (
        //                 <View key={index} style={styles.oneSegmentContainer}>
        //                     <View><Text style={styles.calculationText} key={uuid()}>{string}</Text></View>
        //                     <Button style={styles.deleteButton} title="delete"/>
        //                 </View>))
                    
        //         }
        //         </ScrollView>
        //     )
        // }
        // else {
        //     return(
        //         <Text>tape hidden</Text>
        //     )
        // }
            
    }//render

}








let styles = StyleSheet.create({
    scrollView: {
        position: "absolute",
        flex: 1,
        backgroundColor: "orange",
        width: "100%",
        height: "100%"
    },
    oneSegmentContainer: {

        flexDirection: "row",
        // height: "8%",
        backgroundColor: "yellow",
        marginBottom: 3
    },
    calculationText: {
        width: "80%"
    },
    deleteButton: {
        backgroundColor: "red",
        height: "50%",
        width: "20%",
        color: "red"
    },
    closeTape: {
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '15%',
        backgroundColor: 'red'
    }
})





const mapStateToProps = (state) => ({
    arrayOfRecords: state.tape.arrayOfRecords,
    showTapeStatus: state.tape.showTapeStatus
})


export default connect(mapStateToProps)(Tape)