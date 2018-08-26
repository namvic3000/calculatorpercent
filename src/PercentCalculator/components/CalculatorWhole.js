import React from 'react'
import {AsyncStorage,View, StyleSheet, Platform, NativeModules, Text, TouchableOpacity} from 'react-native'
import Screen from './Screen'
import Keypad from './Keypad'
import Tape from "./Tape";
import ColorPickerTool from "./ColorPickerTool";
import ButtonSmallsPanel from "./ButtonSmallsPanel";
import { connect } from "react-redux"
import { replaceWholeTapeData } from "../../../actions/tapeActions";
import { updateSkinData } from "../../../actions/skinDataActions";






class CalculatorWhole extends React.Component {
 


    readTapeFromLocalStorage = async () => {

        //input is array of strings
        try {
            let result = await AsyncStorage.getItem('storedTapeObject')
            result = await JSON.parse(result)
            // console.log('DATA GOT FROM LOCALSTORAGE IS  ', result)
            return result
        }
        catch(error) {
            console.log(error)
        }
    }

 

    readSkinDataFromLocalStorage = async () => {

        try {
            let result = await AsyncStorage.getItem('skinData')
            result = await JSON.parse(result)
            console.log('SKIN DATA READ FROM LOCAL STORAGE IS ', result )
            return result
        }
        catch(error) {
            console.log(error)
        }

    }


    render() {


        //read stored data for tape from local storage
        this.readTapeFromLocalStorage()
        .then( result => {
            // console.log('RESULT FROM READING IN LOCALSTROAGE IS : ', result)
            this.props.dispatch(replaceWholeTapeData(result))
        })


        //read in saved skin data
        await this.readSkinDataFromLocalStorage()
        .then( resultObject => {
            this.props.dispatch(updateSkinData(resultObject))
        })

        //buttonsmallpanel and thin strip have diferent height, and cant 
        //make heigt 'auto', so need to manually change height of container
        //depending if it is buttonsmallpanel or thin strip.
        let buttonSmallsPanelOrThinStripStyle;
        
        //change height of section, depending on if it is the strip or the 
        //buttonsmalls
        if(this.props.showButtonSmallsPanelStatus) {
            // console.log('***AT CALCULALTORWHOLE, STYLE IS FOR BUTTONSMALLSPANEL')
            buttonSmallsPanelOrThinStripStyle = styles.buttonSmallsPanelContainer
        }
        else {
            // console.log('***AT CALCULALTORWHOLE, STYLE IS FOR THIN STRIP')
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
                 
                <ColorPickerTool/>
            
            </View>

            
        )
    }
}



let styles = StyleSheet.create({
    containerOfWholeCalculator: {
        flex: 1,
        backgroundColor: "white"
    },
    screenContainer: {
        flex: 1.2
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
        height: '6%',
        backgroundColor: 'transparent'
    },
    thinStripContainer: {
        // position: 'absolute',
        // bottom: 0,
        // height:10,
        flex:0.1,
        width: '100%',
        backgroundColor: 'blue'
    },
})




const mapStateToProps = (state) => ({
    showButtonSmallsPanelStatus: state.buttonSmallsPanel.showButtonSmallsPanelStatus,
})


export default connect(mapStateToProps)(CalculatorWhole)


