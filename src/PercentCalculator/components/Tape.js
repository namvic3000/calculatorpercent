import React, { Component } from 'react'
import { Text, View, StyleSheet , Dimensions, TouchableOpacity, ScrollView, Button} from 'react-native'
import uuid from 'uuid/v4'
import { connect  } from "react-redux";
import  * as helpers from "../helpers";
import {updateShowTapeStatus, removeRecordFromTape} from "../../../actions/tapeActions";


class Tape extends Component {
 
    

    deleteOneCalculation = (index) => {

        //delete the record from the history array
        this.props.dispatch(removeRecordFromTape(index))

    }






    render() {

        let {arrayOfRecords, showTapeStatus} = this.props
 
        //arrayOfRecords is: array of segments arrays
        //[ 
            //one segmentsArray is [{stringValue: '2'},{stringValue: 'x'},{stringValue: '7'},{stringValue: ' = 14'}],
            //[{stringValue: '17'},{stringValue: 'x'},{stringValue: '18'},{stringValue: ' = 556'}]
        //]


        //convert array of segment arrays into array of strings
        let arrayOfWholeCalculationStrings = arrayOfRecords.map( segmentsArray => {
            console.log('^^^^ AT TAPE: ONE SEGMENTS ARRAY IS: ',segmentsArray)
            //collates string from all segments of one segments arry
            return helpers.collateStringsIntoOneString(segmentsArray)
        })

        console.log('^^^^^^^^ AT TAPE: ARRAY OF WHOLESTRINGCALCULATOINS IS; ', arrayOfWholeCalculationStrings)



        return(  
                showTapeStatus ? (
                    // <View style={styles.scrollView}>
                    <ScrollView style={styles.scrollView}>
                    {
                        arrayOfWholeCalculationStrings.map( (oneWholeCalculationString, index) => (
                            <View key={index} style={styles.oneSegmentContainer}>
                                <View style={styles.calculationTextContainer}>
                                    <Text style={styles.calculationText}>{oneWholeCalculationString}</Text>
                                </View>
                                <TouchableOpacity style={styles.deleteButtonContainer} onPress={() => this.deleteOneCalculation(index)}>
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>))
                        
                    }
                    </ScrollView>
                    
                ): (
                    null
                )
        )

        
        //OR THIS, SAFER, IF ABOVE DOESNT WORK, TRICONDITIONAL NOT RELIABLE IN REACTNATIVE
        // if(showTapeStatus) {
        //     return(
        //         <ScrollView style={styles.scrollView}>
        //         {
        //             arrayOfRecords.map( (string, index) => (
        //                 <View key={index} style={styles.oneSegmentContainer}>
        //                     <View><Text style={styles.calculationTextContainer} key={uuid()}>{string}</Text></View>
        //                     <Button style={styles.deleteButtonContainer} title="delete"/>
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
        // flex: 1,
        backgroundColor: "lightyellow",
        width: "100%",
        height: "94%",
        top: 0,
        paddingBottom: '30%'
        // paddingTop: Dimensions.get('window').height/25,
    },
    oneSegmentContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        marginTop: '1%',
        marginBottom: '1%',
        marginLeft: '3%',
        marginRight: '3%',
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    calculationTextContainer: {
        // width: "80%",
        flex: 4,
        backgroundColor: 'white',
        padding: '2% 2%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    calculationText: {
        fontSize: 20
    },
    deleteButtonContainer: {
        backgroundColor: "orange",
        flex: 1,
        height: Dimensions.get('window').height*0.04,
    },
    deleteButtonText: {
        lineHeight: Dimensions.get('window').height*0.04,
        textAlign: 'center',
        color: 'white',
        fontSize: Dimensions.get('window').height*0.025,
    },
    deleteAllButtonContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: Dimensions.get('window').height/25,
        color: 'white',
        backgroundColor: 'red',
        width: '100%'
    },
    deleteAllButtonText: {
        textAlign: 'center',
        lineHeight: Dimensions.get('window').height/25,
        fontSize: Dimensions.get('window').height/33,
    }
})





const mapStateToProps = (state) => ({
    arrayOfRecords: state.tape.arrayOfRecords,
    showTapeStatus: state.tape.showTapeStatus
})


export default connect(mapStateToProps)(Tape)