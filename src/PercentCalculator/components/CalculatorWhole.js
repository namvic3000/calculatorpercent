import React from 'react'
import {View, StyleSheet, Platform, NativeModules, Text, TouchableOpacity} from 'react-native'
import Screen from './Screen'
import Keypad from './Keypad'
import Tape from "./Tape";
import ButtonSmallsPanel from "./ButtonSmallsPanel";
import { connect } from "react-redux"


class CalculatorWhole extends React.Component {
 

    render() {



        //buttonsmallpanel and thin strip have diferent height, and cant 
        //make heigt 'auto', so need to manually change height of container
        //depending if it is buttonsmallpanel or thin strip.
        let buttonSmallsPanelOrThinStripStyle;
        
        if(this.props.showButtonSmallsPanelStatus) {
            console.log('***AT CALCULALTORWHOLE, STYLE IS FOR BUTTONSMALLSPANEL')
            buttonSmallsPanelOrThinStripStyle = styles.buttonSmallsPanelContainer
        }
        else {
            console.log('***AT CALCULALTORWHOLE, STYLE IS FOR THIN STRIP')
            buttonSmallsPanelOrThinStripStyle = styles.thinStripContainer
        }




        return(
            <View style={styles.containerOfWholeCalculator}>
                
                <View style={styles.screenContainer}>
                    <Screen />
                </View>

                <View style={styles.wholeKeypadSectionContainer}>
                    <Keypad />
                </View>
 
                <View style={buttonSmallsPanelOrThinStripStyle}>
                    <ButtonSmallsPanel/>
                </View>
                
                <Tape/>
                 
            
            </View>

            
        )
    }
}



let styles = StyleSheet.create({
    containerOfWholeCalculator: {
        flex: 1,
        backgroundColor: "lightyellow"
    },
    screenContainer: {
        flex: 1
    },
    wholeKeypadSectionContainer: {
        flex: 3
    },
    buttonSmallsPanelContainer: {
        // position: 'absolute',
        // bottom: 0,
        // height: '5%',
        width: '100%',
        // flex: 0.3,
        height: '7%',
        backgroundColor: 'transparent'
    },
    thinStripContainer: {
        // position: 'absolute',
        // bottom: 0,
        // height:10,
        flex:0.1,
        width: '100%',
        backgroundColor: 'green'
    },
    tapeContainer: {
        position: 'absolute',
        height: '90%',
        top: 0,
    }
})




const mapStateToProps = (state) => ({
    showButtonSmallsPanelStatus: state.buttonSmallsPanel.showButtonSmallsPanelStatus
})


export default connect(mapStateToProps)(CalculatorWhole)


