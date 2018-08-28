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
        
        //set time out to close buttonsmallspanel if no buttonsmalll is clicked
        //dont close if any buttonsmall is clicked and becomes active
        setTimeout( () => {
            if( ( ! this.props.showTapeStatus) 
                && ( ! this.props.skinSelectionModeActiveStatus) 
                &&(( ! this.props.showAboutPageStatus)) )//####ADD MORE SCREENS LATER
                this.props.dispatch(updateShowButtonSmallsPanelStatus(false))
        }, 2000)

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
        

        let styles = StyleSheet.create({
            container: {
                flexDirection: 'row',
                flex: 1,
                height: '100%',
                backgroundColor: `${this.props.skinData.buttonSmallsColor}`,
            },
            // thinStrip: {
            //     backgroundColor: 'pink',

            // }
        })


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







const mapStateToProps = (state) => ({
    showButtonSmallsPanelStatus: state.buttonSmallsPanel.showButtonSmallsPanelStatus,
    showTapeStatus: state.tape.showTapeStatus,
    skinSelectionModeActiveStatus: state.skinData.skinSelectionModeActiveStatus || false,
    skinData: state.skinData,
    showAboutPageStatus: state.aboutPage.showAboutPageStatus
})


export default connect(mapStateToProps)(ButtonSmallsPanel)

