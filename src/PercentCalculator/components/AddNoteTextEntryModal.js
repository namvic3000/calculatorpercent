import React from 'react'
import {TouchableOpacity ,Dimensions,StyleSheet,TextInput, View, Text } from "react-native"
import {Button} from 'native-base'
import { connect } from "react-redux";
import { updateCalculatorData } from "../../../actions/calculatorDataActions";
import { replaceWholeTapeData } from "../../../actions/tapeActions";



class AddNoteTextEntryModal extends React.Component {


    state = {
        textInputValue: ''
    }





    handleTextInput = (textFromInput, tapeRecordIndex) => {
        
        
        console.log('AT ADDNOTEMODAL, TEXT RECEIVED INTO HANDLEINPUT METHOD IS ' + textFromInput)
        let thisSegmentsArray = this.props.arrayOfRecords[tapeRecordIndex]
 
        console.log('ADDNOTEMODAL: SGMENTSARRAY IS : ', thisSegmentsArray)
        
        let indexOfSegmentWithAnswer;
        thisSegmentsArray.forEach( (segment, index) => {
            if(/\=/.test(segment.stringValue)) {
                indexOfSegmentWithAnswer = index
            }
        })

        console.log('$$$$ ADDNOTE: SEGMENT WITH ANSWER, INDEX IS: ' + indexOfSegmentWithAnswer)
        console.log('$$$$ ADDNOTE: SEGMENT WITH ANSWER, ANSER STRING VALUE IS: ' , thisSegmentsArray[indexOfSegmentWithAnswer])

        //add note to the segment after the segment with thte answer

        //if note segment not yet exist, then create it
        if( ! thisSegmentsArray[indexOfSegmentWithAnswer+1]) {
            //segment with note not exist, so create it
            thisSegmentsArray[indexOfSegmentWithAnswer +1] = {}
        }
        
        thisSegmentsArray[indexOfSegmentWithAnswer +1].stringValue = '\n' + textFromInput
        
        //update array of records of tape
        let updatedTapeArray = this.props.arrayOfRecords
        //update the record for which note is being added
        updatedTapeArray[tapeRecordIndex] = thisSegmentsArray
        //update store with whole tape array
        this.props.dispatch(replaceWholeTapeData(updatedTapeArray))
        
        // let segmentWithNoteContent = 
        this.setState({textInputValue: textFromInput})
    }




    okButtonPressed = () => {
        console.log('ADDNOTEMODAL: OK BUTTON ON MODAL BEEN CLICKED')

        //add the note to the segment after the = segment
 
        //close modal
        this.props.closeModal()
    }





    cancelButtonPressed = () => {

    }


 

    //use tis method to prefill input with existin note if exists
    //. the cwm method does not work for this.
    componentWillReceiveProps = (props) => {


        // console.log('ADDNOTEMODAL: CWRP, RECORDINDEX IS : ', props.forTapeRecordIndex)
        
        if( ! props.forTapeRecordIndex) {//dont process if props dont exist
            return
        }


        let thisSegmentsArray = props.arrayOfRecords[props.forTapeRecordIndex]
 
    
        let indexOfSegmentWithAnswer;
        thisSegmentsArray.forEach( (segment, index) => {
            if(/\=/.test(segment.stringValue)) {
                indexOfSegmentWithAnswer = index
            }
        })


        //segment with note is after segment with answer
        let indexOfNoteSegment = indexOfSegmentWithAnswer + 1

        console.log('$$$$ ADDNOTE: SEGMENT WITH ANSWER, INDEX IS: ' + indexOfSegmentWithAnswer)
        console.log('$$$$ ADDNOTE: SEGMENT WITH ANSWER, ANSER STRING VALUE IS: ' , thisSegmentsArray[indexOfSegmentWithAnswer])

        //if nnote segment does not yet exist, set initial text to blank
        if( ! thisSegmentsArray[indexOfNoteSegment]) {
            this.setState({textInputValue: ''})
        }
        else {
            //note already exists, prefill with existing note
            this.setState({textInputValue: thisSegmentsArray[indexOfNoteSegment].stringValue})
        }
    }








    render() {

        console.log('AT ADDNOTEMODAL, THIS.PROPS.ISSHOWING RECEIVED IS: ' + this.props.isShowing)
        console.log('AT ADDNOTEMODAL, THIS.PROPS.FORRECORDNUMBER RECEIVED IS: ' + this.props.forTapeRecordIndex)
        return(
            this.props.isShowing ? (
                <View style={styles.container}>
                    <TextInput style={styles.textInput} onChangeText={ text => this.handleTextInput(text, this.props.forTapeRecordIndex)}
                                value={this.state.textInputValue}
                                placeholder="100 chars limit"
                                maxLength={100}
                    />
                    <TouchableOpacity onPress={this.okButtonPressed} style={styles.okButton}>
                        <Text style={styles.okButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            ): (
                null 
            )
        )
        

    }

}


let styles = StyleSheet.create({
    container: {
        display: 'flex',
        position: 'absolute',
        zIndex: 1000,
        height: '30%',
        width: '100%',
        top: '35%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: 'white',
        height: '45%',
        width: '100%'
    },
    okButton: {
        width: '25%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        // marginTop: '10%'
    },
    okButtonText: {
        // textAlign: 'center',
        color: 'white',
        fontSize: Dimensions.get('window').height * 0.025
    }

})


mapStateToProps = (state) => ({
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    arrayOfRecords: state.tape.arrayOfRecords
})


mapDispatchToProps = (dispatch) => ({
})




export default connect(mapStateToProps)(AddNoteTextEntryModal)