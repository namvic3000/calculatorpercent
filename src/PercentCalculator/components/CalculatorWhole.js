import React from 'react'
import {View, StyleSheet, Platform, NativeModules} from 'react-native'
import Screen from './Screen'
import Keypad from './Keypad'





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
            }
        })





        return(
            <View style={styles.containerOfWholeCalculator}>
                <View style={styles.screenContainer}>
                    <Screen />
                </View>

                {/* keypad includes the 2 memorycontents text views */}
                <View style={styles.wholeKeypadSectionContainer}>
                    <Keypad />
                </View>
            </View>

            
        )
    }
}



export default CalculatorWhole