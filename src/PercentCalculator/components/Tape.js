import React, { Component } from 'react'
import {Clipboard,Text, View, StyleSheet , Dimensions, TouchableOpacity, ScrollView} from 'react-native'
import {Button} from 'react-native-elements'
import uuid from 'uuid/v4'
import { connect  } from "react-redux";
import  * as helpers from "../helpers";
import {updateShowTapeStatus, removeRecordFromTape, deleteWholeTape, replaceWholeTapeData} from "../../../actions/tapeActions";
import AddNoteTextEntryModal from "./AddNoteTextEntryModal";


class Tape extends Component {
 
    
    state = {
        showTextEntryModal: false,
    }



    closeModal = () => {
        this.setState({showTextEntryModal: false})
    }


    showModal = () => {
        this.setState({showTextEntryModal: true})
    }





    deleteOneCalculation = (index) => {

        //delete the record from the history array
        this.props.dispatch(removeRecordFromTape(index))

    }



    deleteAllEntriesFromTape = () => {

        this.props.dispatch(replaceWholeTapeData([]))
    }




    copyTapeToClipBoard = () => {
        if(this.arrayOfWholeCalculationStrings.length<=0) {
            alert('No content to copy')
        }
        else {
            alert('Copied to clipboard')
            Clipboard.setString(this.arrayOfWholeCalculationStrings)
        }
    }



    addNoteButtonClicked = (tapeRecordIndex) => {
        this.setState({showTextEntryModal: true})
    }






    render() {

        
        let {arrayOfRecords, showTapeStatus} = this.props
 
        //DATA STRUCTURE: arrayOfRecords is: array of segments arrays
        //[ 
            //one segmentsArray is [{stringValue: '2'},{stringValue: 'x'},{stringValue: '7'},{stringValue: ' = 14'}],
            //[{stringValue: '17'},{stringValue: 'x'},{stringValue: '18'},{stringValue: ' = 556'}]
        //]


    //console.log('**** AT TAPE: ARRAY OF RECORDS IS: ', arrayOfRecords)
        
        // ///bug fix
        // if( ! arrayOfRecords) {
        // //console.log('AT TAPE: INSIDE RETURN NULL')
        //     return null
        // }

        ///bug fix
        if( arrayOfRecords.length <= 0) {
        //console.log('ARRAYOFRECORDS IS EMPTY ARRAY, ASSIGNING STRINGARAY AN EMPTYARRAY')
            this.arrayOfWholeCalculationStrings = []
        }
        else {
        //console.log('ARRAYOFRECORDS DOES EXIST, CONVERTIN TO ARRAY OF STRINGS')
            //convert array of segment arrays into array of strings
            this.arrayOfWholeCalculationStrings = arrayOfRecords.map( segmentsArray => {
                //collates string from all segments of one segments arry
                return helpers.collateStringsIntoOneString(segmentsArray)
            })
        }

         

        return(  
                showTapeStatus ? (
                    <View style={styles.outerContainer}>
                        <View style={styles.topButtonsContainer}>
                            <TouchableOpacity style={styles.deleteAllButtonContainer} onPress={this.deleteAllEntriesFromTape}><Text style={styles.deleteAllButtonText}>Delete All</Text></TouchableOpacity>
                            {/* <TouchableOpacity style={styles.copyButtonContainer} onPress={this.copyTapeToClipBoard}><Text style={styles.copyButtonText}>Copy to Clipboard</Text></TouchableOpacity> */}
                        </View>


                        <ScrollView style={styles.scrollView}>
                        {
                            this.arrayOfWholeCalculationStrings.map( (oneWholeCalculationString, index) => (
                                <View key={index} style={styles.oneSegmentContainer}>
                                    <View style={styles.calculationTextContainer}>
                                        <Text style={styles.calculationText}>{oneWholeCalculationString}</Text>
                                    </View>
                                    {/* need to store index in this.currentTapeRecordIndex so can pass it to ADDNOTEMODAL outside of this block */}
                                    <TouchableOpacity style={styles.sideAddNoteButtonContainer} onPress={() => {this.currentTapeRecordIndex = index; this.addNoteButtonClicked(index)}}>
                                        <Text style={styles.sideAddNoteButtonText}>Note</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.sideDeleteButtonContainer} onPress={() => this.deleteOneCalculation(index)}>
                                        <Text style={styles.sideDeleteButtonText}>Delete</Text>
                                    </TouchableOpacity>

                                    {/* <Button  title="+Note" buttonStyle={styles.sideDeleteButtonContainer} textStyle={styles.sideDeleteButtonText} onPress={() => this.deleteOneCalculation(index)}/>
                                    <Button title="Delete" buttonStyle={styles.sideDeleteButtonContainer} textStyle={{color: 'blue'}} onPress={() => this.deleteOneCalculation(index)}/> */}
                                </View>))
                            
                        }

                        </ScrollView>

                        <AddNoteTextEntryModal isShowing={this.state.showTextEntryModal} 
                                                closeModal={this.closeModal}
                                                forTapeRecordIndex={this.currentTapeRecordIndex}/>

                    </View>
                    
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
        //                     <Button style={styles.sideDeleteButtonContainer} title="delete"/>
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





let isTabletDevice = Dimensions.get('window').width >= 768
let tabletScaleFactor;

if(isTabletDevice) {//table, so make font smaller
    tabletScaleFactor = 0.75
}
else {
    tabletScaleFactor = 1//no change
}






let styles = StyleSheet.create({
    outerContainer: {
        position: "absolute",
        // flex: 1,
        backgroundColor: "green",
        width: "100%",
        height: "94%",
        top: 0,
        paddingBottom: '0%'
        // paddingTop: Dimensions.get('window').height/25,
    },
    scrollView: {
        // position: "absolute",
        // flex: 1,
        backgroundColor: "lightyellow",
        width: "100%",
        height: "100%",
        top: 0,
        paddingBottom: '30%'
        // paddingTop: Dimensions.get('window').height/25,
    },
    // ORIGINAL scrollView: {
    //     position: "absolute",
    //     // flex: 1,
    //     backgroundColor: "lightyellow",
    //     width: "100%",
    //     height: "94%",
    //     top: 0,
    //     paddingBottom: '30%'
    //     // paddingTop: Dimensions.get('window').height/25,
    // },
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
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingLeft: '2%',
        paddingRight: '2%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    calculationText: {
        fontSize: Dimensions.get('window').width * 0.045 * tabletScaleFactor,
    },
    sideDeleteButtonContainer: {//delte button on the side of calculation
        // backgroundColor: "orange",
        // flex: 0.5,
        // width: '10%',
        backgroundColor: 'transparent',
        margin: '1.5%',
        height: Dimensions.get('window').width * 0.06 * tabletScaleFactor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sideDeleteButtonText: {
        lineHeight: Dimensions.get('window').width * 0.06 * tabletScaleFactor,
        textAlign: 'center',
        color: 'orange',
        fontSize: Dimensions.get('window').width * 0.045 * tabletScaleFactor,
        position: 'relative',
        bottom: '12%',
    },
    sideAddNoteButtonContainer: {//delte button on the side of calculation
        // backgroundColor: "orange",
        // flex: 0.5,
        // width: '10%',
        backgroundColor: 'transparent',
        margin: '1.5%',
        marginRight: '2.5%',
        height: Dimensions.get('window').width * 0.06 * tabletScaleFactor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sideAddNoteButtonText: {
        position: 'relative',
        bottom: '12%',
        lineHeight: Dimensions.get('window').width * 0.06 * tabletScaleFactor,
        fontSize: Dimensions.get('window').width * 0.045 * tabletScaleFactor,
        textAlign: 'center',
        color: 'blue',
    },

    topButtonsContainer: {//contains the deletealll and copy buttons at top
        flexDirection: 'row',
        height: Dimensions.get('window').width * 0.06 * tabletScaleFactor,
        width: '100%',
        backgroundColor: 'white'
    },
    

    deleteAllButtonContainer: {
        flex: 1,
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // height: Dimensions.get('window').height/25,
        // color: 'white',
        // backgroundColor: 'red',
        // width: '100%'
    },
    deleteAllButtonText: {
        // textAlign: 'center',
        // lineHeight: Dimensions.get('window').height/25,
        // fontSize: Dimensions.get('window').height/33,
        fontSize: Dimensions.get('window').width * 0.05 * tabletScaleFactor,
        color: 'darkred'
    },
   
    // deleteAllButton: {
    //     flex: 1,
    //     backgroundColor: 'white',
    //     height: '100%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     color: 'red'
    // },
    copyButtonContainer: {
        flex: 1,
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // deleteAllButtonText: {
    //     color: 'darkred',
    //     fontSize: Dimensions.get('window').height*0.027,
    // },
    copyButtonText: {
        color: 'green',
        fontSize: Dimensions.get('window').width * 0.05 * tabletScaleFactor,
    }
})





const mapStateToProps = (state) => ({
    arrayOfRecords: state.tape.arrayOfRecords,
    showTapeStatus: state.tape.showTapeStatus,
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex
})


export default connect(mapStateToProps)(Tape)