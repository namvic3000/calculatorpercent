import React from 'react'
import {TouchableOpacity ,Dimensions,StyleSheet,TextInput, View, Text } from "react-native"
import {Button} from 'native-base'
import { connect } from "react-redux";
import {  } from "../../../actions/calculatorDataActions";




class AddNoteTextEntryModal extends React.Component {


    state = {
        textInputValue: ''
    }





    handleTextInput = (textFromInput) => {
        console.log('AT ADDNOTEMODAL, TEXT RECEIVED INTO HANDLEINPUT METHOD IS ' + textFromInput)
    

        this.setState({textInputValue: textFromInput})
    
    }


    okButtonPressed = () => {
        console.log('ADDNOTEMODAL: OK BUTTON ON MODAL BEEN CLICKED')
        //close modal
        this.props.closeModal()
    }






    render() {

        console.log('AT ADDNOTEMODAL, THIS.PROPS.ISSHOWING RECEIVED IS: ' + this.props.isShowing)
        console.log('AT ADDNOTEMODAL, THIS.PROPS.FORRECORDNUMBER RECEIVED IS: ' + this.props.forTapeRecordIndex)
        return(
            this.props.isShowing ? (
                <View style={styles.container}>
                    <TextInput style={styles.textInput} onChangeText={ text => this.handleTextInput(text, this.props.tapeRecordIndex)}
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
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex
})


mapDispatchToProps = (dispatch) => ({
})




export default connect(mapStateToProps, mapDispatchToProps)(AddNoteTextEntryModal)