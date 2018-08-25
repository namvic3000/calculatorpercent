import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import ButtonSmallTape from './ButtonSmallTape';
import ButtonSmallAbout from './ButtonSmallAbout';
import ButtonSmallSkin from './ButtonSmallSkin';
import { connect } from 'react-redux';
import { updateShowButtonSmallsPanelStatus } from "../../../actions/buttonSmallsPanelActions";


class ButtonSmallsPanel extends React.Component {
    


    thinStripClicked = () => {

        //show buttonsmallspanel
        this.props.dispatch(updateShowButtonSmallsPanelStatus(true))
        
        //set time out to close buttonsmallspanel if tape or about or skin
        //screen is not showing
        setTimeout( () => {
            if( ! this.props.showTapeStatus)//####ADD MORE SCREENS LATER
                this.props.dispatch(updateShowButtonSmallsPanelStatus(false))
        }, 3000)

    }


    buttonSmallsPanelOrThinStrip = () => {

        if(this.props.showButtonSmallsPanelStatus) {
            console.log('***AT BUTTONSMALLSPANEL, COMPONENT TO RETURN IS BUTTONSMALLSPANEL')
            return (
                <View style={styles.container}>
                    <ButtonSmallSkin/>
                    <ButtonSmallAbout/>
                    <ButtonSmallTape/>
                </View>
            )
        }
        else {
            console.log('***AT BUTTONSMALLSPANEL, COMPONENT TO RETURN IS THIN STRIP')
            return <TouchableOpacity onPress={this.thinStripClicked} style={styles.container}><Text></Text></TouchableOpacity>
        }
    }


    render() {
        
        return (
            //  this.buttonSmallsPanelOrThinStrip()
            this.props.showButtonSmallsPanelStatus ? (
                <View style={styles.container}>
                    <ButtonSmallSkin/>
                    <ButtonSmallAbout/>
                    <ButtonSmallTape/>
                </View>
            ): (
                <TouchableOpacity onPress={this.thinStripClicked} style={styles.container}><Text></Text></TouchableOpacity>
            )
        )
    }
}



let styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        height: '100%',
        backgroundColor: 'lightblue'
    },
    // thinStrip: {
    //     backgroundColor: 'pink',

    // }
})




const mapStateToProps = (state) => ({
    showButtonSmallsPanelStatus: state.buttonSmallsPanel.showButtonSmallsPanelStatus,
    showTapeStatus: state.tape.showTapeStatus
})


export default connect(mapStateToProps)(ButtonSmallsPanel)