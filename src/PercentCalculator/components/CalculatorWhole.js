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
import { updateMemoryData } from "../../../actions/memoryActions";
import { updateCurrentCurrency } from "../../../actions/currencyActions";
import { updateNumberOfDeciPoints } from "../../../actions/deciPointsActions";




class CalculatorWhole extends React.Component {
 


    readTapeFromLocalStorage = async () => {

        //input is array of strings
        try {
            let result = await AsyncStorage.getItem('storedTapeObject')
            result = JSON.parse(result)
            // console.log('DATA GOT FROM LOCALSTORAGE IS  ', result)
            return result
        }
        catch(error) {
            console.log(error)
        }
    }

 

    readSkinDataFromLocalStorage = async () => {

        try {
            result = await AsyncStorage.getItem('skinData')
            result = JSON.parse(result)
            return result
        }
        catch(error) {
            console.log('ERROR IN FETCHING SKIN DATA FROM LOCAL STORGE',error)
        }

    }



    readMemoryDataFromLocalStorage = async () => {

        try {
            result = await AsyncStorage.getItem('memoryData')
            result = JSON.parse(result)
            return result
        }
        catch(error) {
            console.log('ERROR IN FETCHING MEMORY DATA FROM LOCAL STORGE',error)
        }

    }



    readCurrencyDataFromLocalStorage = async () => {

        try {
            result = await AsyncStorage.getItem('currency')
            return result //no need to parse, was not stringified , cos is a simple string
        }
        catch(error) {
            console.log(error)
        }

    }






    readDeciPointsStatusFromLocalStorage = async () => {
        try {
            let result = await AsyncStorage.getItem('deciPointsStatus')
            return JSON.parse(result) 
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
            if ( ! result) { //if not exist
                let defaultTapeState = {
                    arrayOfRecords: [], //array of segments arrays
                    showTapeStatus: false 
                }
                this.props.dispatch(replaceWholeTapeData(defaultTapeState))
                console.log('TAPE DATA NOT EXIST, SO NO UPDATE OF STORE')
            }
            else {
                console.log('TAPE DATA DOES EXIST, SO NOW UPDATIN GSTORE')
                this.props.dispatch(replaceWholeTapeData(result))
            }
            console.log('TAPE OBJECT FROM STORAGE REEAD IN IS: ', result)
        })


        //read in saved skin data
        this.readSkinDataFromLocalStorage()
        .then( result => {
            console.log('SKIN DATA READ FROM LOCAL STORAGE, IS ', result )
            if( ! result) {//if NOT exists
                console.log('SKKIN DATA NOT EXISWT, NOT UPDATING STORE')
                let defaultSkinData = {
                    showColorPickerStatus: false,
                    skinSelectionModeActiveStatus: false,
                    currentComponentSkinToBeChanged: "",
                    memoryBoxesColor: '#000000',
                    memoryButtonsColor: '#000000',
                    percentButtonsColor: '#000000',
                    keysSet1Color: '#000000',
                    keysSet2Color: '#000000',
                    buttonSmallsColor: '#000000',
                } 
                this.props.updateSkinData(defaultSkinData)
            }
            else {//exists
                console.log('SKKIN DATA DOES EXISWT, SO NOW UPDATING STORE')
                this.props.dispatch(updateSkinData(result))
            }
        })



        //read in saved mememory data
        this.readMemoryDataFromLocalStorage()
        .then( result => {
            console.log('MEMORY DATA READ FROM LOCAL STORAGE, IS ', result )
            if( ! result) {//if NOT exists
                console.log('MEMORY DATA NOT EXISWT, NOT UPDATING STORE')
                let memory1Value = 'empty'
                let memory2Value = 'empty'
                let currentActiveMemory = 1
                
                this.props.dispatch(updateMemoryData(memory1Value, memory2Value, currentActiveMemory))
            }
            else {//exists
                console.log('MEMORY DATA DOES EXISWT, SO NOW UPDATING STORE')
                console.log('RESULT RECEIVED FROM READIN MEMORYDATA FROM STORAGE IS: ', result)
                let memory1Value = result.memory1Value
                let memory2Value = result.memory2Value
                let currentActiveMemory = result.currentActiveMemory
                
                this.props.dispatch(updateMemoryData(memory1Value, memory2Value, currentActiveMemory))
            }
        })



        this.readCurrencyDataFromLocalStorage()
        .then( result => {
            if( ! result ) {//if not exist
                result = '$'//default
            }
            console.log('$$$$$$  CURRENCY read in from storage is ' + result)
            this.props.dispatch(updateCurrentCurrency(result))
        })




        this.readDeciPointsStatusFromLocalStorage()
        .then( result => {
            if( ! result ) {
                result = 'auto'//default
            }

            this.props.dispatch(updateNumberOfDeciPoints(result))
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

const mapDispatchToProps = (dispatch) => ({

})


export default connect(mapStateToProps)(CalculatorWhole)


