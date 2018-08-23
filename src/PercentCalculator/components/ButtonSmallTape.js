import React, { Component } from 'react'
import { View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import {updateShowTapeStatus} from '../../../actions/tapeActions'
import { connect } from 'react-redux'




class ButtonSmallTape extends Component {
    
    handleClick = () => {

        //show the tape
        this.props.dispatch(updateShowTapeStatus(true))
    }
    
    
    render() {

        return (
            <TouchableOpacity style={styles.button} onPress={this.handleClick}><Text>Tape</Text></TouchableOpacity>
        )
    }
}



const mapStateToProps = (state) => ({
    showTapeStatus: state.tape.showTapeStatus
})

export default connect(mapStateToProps)(ButtonSmallTape)




let styles = StyleSheet.create({
    button: {
        backgroundColor: 'green',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
    
})