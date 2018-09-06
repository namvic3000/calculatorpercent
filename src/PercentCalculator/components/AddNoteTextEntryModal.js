import React from 'react'
import {TouchableOpacity ,Dimensions,StyleSheet,TextInput, View, Text } from "react-native"
import { connect } from "react-redux";
import { replaceWholeTapeData } from "../../../actions/tapeActions";



class AddNoteTextEntryModal extends React.Component {


    state = {
        textInputValue: ''
    }





    handleTextInput = (textFromInput, tapeRecordIndex) => {
        
        
     //console.log('AT ADDNOTEMODAL, TEXT RECEIVED INTO HANDLEINPUT METHOD IS ' + textFromInput)
        let thisSegmentsArray = this.props.arrayOfRecords[tapeRecordIndex]
 
     //console.log('ADDNOTEMODAL: SGMENTSARRAY IS : ', thisSegmentsArray)
        
        let indexOfSegmentWithAnswer;
        thisSegmentsArray.forEach( (segment, index) => {
            if(/\=/.test(segment.stringValue)) {
                indexOfSegmentWithAnswer = index
            }
        })

     //console.log('$$$$ ADDNOTE: SEGMENT WITH ANSWER, INDEX IS: ' + indexOfSegmentWithAnswer)
     //console.log('$$$$ ADDNOTE: SEGMENT WITH ANSWER, ANSER STRING VALUE IS: ' , thisSegmentsArray[indexOfSegmentWithAnswer])

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
        
        this.setState({textInputValue: textFromInput})
    }






    okButtonPressed = (tapeRecordIndex) => {

        //bug fix: below code is to fix circumstance where no placeholder appears,
        //and  user doesnt know what to do.
        ///When user deletes everything, if there is a white space or space
        //left on the note, it is treated as a note, so when user presses on
        //addnote again, no placeholder appears, user does  not know to tap
        //on the input. So if there is no a-z char on the note, the note
        //segment will be removed, so when user adds note again to the same
        //calculation, no nnote exists, an empty note with placeholder will
        //appear, and user knows to tap onthe placeholder to enter text.


     //console.log('ADDNOTEMODAL: OK BUTTON ON MODAL BEEN CLICKED')

        //add the note to the segment after the = segment
 
        //if note segment is empty, eg if user deletes all chars, then 
        //remove the note segment

        let thisSegmentsArray = this.props.arrayOfRecords[tapeRecordIndex]
 
        let indexOfSegmentWithAnswer;
        thisSegmentsArray.forEach( (segment, index) => {
            if(/\=/.test(segment.stringValue)) {
                indexOfSegmentWithAnswer = index
            }
        })
 
        
        let indexOfSegmentWithNote = indexOfSegmentWithAnswer + 1 
        

        //bug fix, error prevention
        if ( ! thisSegmentsArray[indexOfSegmentWithNote]) { //if  not exist
            //close modal
            this.props.closeModal()
            return
        }
        
        
        //if gets here, note segment does exist
        //see if any text in the note, if no text, delete the note segment
        let hasText = /[a-z]|[0-9]/i.test(thisSegmentsArray[indexOfSegmentWithNote].stringValue)
        
        if( ! hasText) {
         //console.log('OKBUTTON, NOTESEGMENT BEEN POPPED')
            //no text in note, delete the note segment
            thisSegmentsArray.pop()//remove last segment, ie segment with note
        }


        //update array of records of tape
        let updatedTapeArray = this.props.arrayOfRecords
        //update the record for which note is being added
        updatedTapeArray[tapeRecordIndex] = thisSegmentsArray
        //update store with whole tape array
        this.props.dispatch(replaceWholeTapeData(updatedTapeArray))
         
        
        //close modal
        this.props.closeModal()
    }




 

    //use tis method to prefill input with existin note if exists
    //. the cwm method does not work for this.
    componentWillReceiveProps = (props) => {

        //this metod will populate note input field with existing note for 
        //user to edit, if already exists.


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

     //console.log('$$$$ ADDNOTE: SEGMENT WITH ANSWER, INDEX IS: ' + indexOfSegmentWithAnswer)
     //console.log('$$$$ ADDNOTE: SEGMENT WITH ANSWER, ANSER STRING VALUE IS: ' , thisSegmentsArray[indexOfSegmentWithAnswer])

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

     //console.log('AT ADDNOTEMODAL, THIS.PROPS.ISSHOWING RECEIVED IS: ' + this.props.isShowing)
     //console.log('AT ADDNOTEMODAL, THIS.PROPS.FORRECORDNUMBER RECEIVED IS: ' + this.props.forTapeRecordIndex)
        return(
            this.props.isShowing ? (
                <View style={styles.container}>
                    <Text style={styles.addNoteTitle}>Add/Edit Note</Text>
                    <TextInput style={styles.textInput} onChangeText={ text => this.handleTextInput(text, this.props.forTapeRecordIndex)}
                                value={this.state.textInputValue}
                                placeholder="enter note here"
                                maxLength={100}
                    />
                    <TouchableOpacity onPress={ () => this.okButtonPressed(this.props.forTapeRecordIndex)} style={styles.okButton}>
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
        height: '25%',
        width: '100%',
        top: '20%',
        backgroundColor: 'lightyellow',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: 'lightyellow',
        height: '35%',
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
        fontSize: Dimensions.get('window').width * 0.045
    },
    addNoteTitle: {
        color: 'darkblue',
        fontSize: Dimensions.get('window').width * 0.05
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