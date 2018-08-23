import React, { Component } from 'react'
import { View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import {updateShowTapeStatus} from '../../../actions/tapeActions'
import { connect } from 'react-redux'




class ButtonSmallSkin extends Component {
    
    handleClick = () => {

    }
    
    
    render() {

        return (
            <TouchableOpacity style={styles.button} onPress={this.handleClick}><Text>Skin</Text></TouchableOpacity>
        )
    }
}



const mapStateToProps = (state) => ({
    showTapeStatus: state.tape.showTapeStatus
})

export default connect(mapStateToProps)(ButtonSmallSkin)




let styles = StyleSheet.create({
    button: {
        backgroundColor: 'green',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
    
})