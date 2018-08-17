import React from 'react'
import {View, StyleSheet, Platform} from 'react-native'
import Screen from './Screen'
import Keypad from './Keypad'





class CalculatorWhole extends React.Component {



    render() {

        let STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : NativeModules.StatusBarManager.HEIGHT 


        let styles = StyleSheet.create({
            containerOfWholeCalculator: {
                flex: 1,
                backgroundColor: "orange"
            },
            paddingToMoveBelowStatusBar: {
                width: "100%",
                height: STATUSBAR_HEIGHT + 2,
                color: "transparent",
                backgroundColor: "pink"
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
                <View style={styles.paddingToMoveBelowStatusBar}>
                    {/* padding to move below status bar */}
                </View>


                <View style={styles.screenContainer}>
                    <Screen />
                </View>

                <View style={styles.wholeKeypadSectionContainer}>
                    {/* keypad includes the 2 memorycontents texts views */}
                    <Keypad />
                </View>
            </View>

            
        )
    }
}



export default CalculatorWhole