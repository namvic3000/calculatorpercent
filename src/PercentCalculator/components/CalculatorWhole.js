import React from 'react'
import {View, StyleSheet, Platform, NativeModules} from 'react-native'
import Screen from './Screen'
import Keypad from './Keypad'
import Tape from "./Tape";
import ButtonSmallsPanel from "./ButtonSmallsPanel";



class CalculatorWhole extends React.Component {



    render() {

        let styles = StyleSheet.create({
            containerOfWholeCalculator: {
                flex: 1,
                backgroundColor: "orange"
            },
            screenContainer: {
                flex: 1
            },
            wholeKeypadSectionContainer: {
                flex: 3
            },
            buttonSmallsRowContainer: {
                flex: 0.3
            }
        })





        return(
            <View style={styles.containerOfWholeCalculator}>
                <View style={styles.screenContainer}>
                    <Screen />
                </View>

                <View style={styles.wholeKeypadSectionContainer}>
                    <Keypad />
                </View>

                <View style={styles.buttonSmallsRowContainer}>
                    <ButtonSmallsPanel />
                </View>

                <Tape/>
            </View>

            
        )
    }
}



export default CalculatorWhole