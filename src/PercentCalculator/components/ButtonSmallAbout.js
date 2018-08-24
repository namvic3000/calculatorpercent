import React, { Component } from 'react'
import { View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import {updateShowTapeStatus} from '../../../actions/tapeActions'
import { connect } from 'react-redux'




class ButtonSmallAbout extends Component {
    
    handleClick = () => {

    }
    
    
    render() {

        return (
            <TouchableOpacity style={styles.button} onPress={this.handleClick}><Text>About</Text></TouchableOpacity>
        )
    }
}



const mapStateToProps = (state) => ({
    showTapeStatus: state.tape.showTapeStatus
})



export default connect(mapStateToProps)(ButtonSmallAbout)




let styles = StyleSheet.create({
    button: {
        backgroundColor: 'green',
        flex: 1,
        // height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
    
})