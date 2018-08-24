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



let styles = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    }
    
})

export default connect(mapStateToProps)(ButtonSmallSkin)



