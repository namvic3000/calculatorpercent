import React, { Component } from 'react'
import { Dimensions, View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import {updateShowTapeStatus} from '../../../actions/tapeActions'
import {updateShowButtonSmallsPanelStatus} from '../../../actions/buttonSmallsPanelActions'
import { connect } from 'react-redux'




class ButtonSmallTape extends Component {
    
    handleClick = () => {

        //if not currently showing tape, then show it
        if(this.props.showTapeStatus == false ) {
            this.props.dispatch(updateShowTapeStatus(true))
            //buttonsmalls panell will not autodismiss if tape is showing
            //so no action on buttonsmalls to keep it there is needed.
        }
        else {//is currently showing tape
            //dismiss the tape
            this.props.dispatch(updateShowTapeStatus(false))
            //dismiss the buttonsmalls panel also
            this.props.dispatch(updateShowButtonSmallsPanelStatus(false))
        }
        
    }
    
    
    render() {

        //get the correct styleing depending on state
        if(this.props.showTapeStatus){
            styleToApply = styles.buttonActive
        }
        else {
            styleToApply = styles.buttonInactive
        }


        return (
            <TouchableOpacity style={styleToApply} onPress={this.handleClick}>
                <Text style={styles.buttonText}>Tape</Text>
            </TouchableOpacity>
        )
    }
}



const mapStateToProps = (state) => ({
    showTapeStatus: state.tape.showTapeStatus
})

export default connect(mapStateToProps)(ButtonSmallTape)




let styles = StyleSheet.create({
    buttonInactive: {
        backgroundColor: 'lightblue',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonActive: {
        backgroundColor: 'yellow',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: Dimensions.get('window').width/16.5
    }
})