import React, { Component } from 'react'
import { Dimensions, View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import {updateShowTapeStatus} from '../../../actions/tapeActions'
import { connect } from 'react-redux'




class ButtonSmallSkin extends Component {
    
    handleClick = () => {

    }
    
    
    render() {


        // //get the correct styleing depending on state
        // if(this.props.showTapeStatus){
        //     styleToApply = styles.buttonActive
        // }
        // else {
        //     styleToApply = styles.buttonInactive
        // }
        let styleToApply = styles.buttonInactive



        return (
            <TouchableOpacity style={styleToApply} onPress={this.handleClick}>
                <Text style={styles.buttonText}>Skin</Text>
            </TouchableOpacity>
        )
    }
}



const mapStateToProps = (state) => ({
    showTapeStatus: state.tape.showTapeStatus
})




let styles = StyleSheet.create({
    buttonInactive: {
        backgroundColor: 'lightblue',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonActive: {
        backgroundColor: 'lightyellow',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: Dimensions.get('window').width/16.5
    }
})

export default connect(mapStateToProps)(ButtonSmallSkin)



