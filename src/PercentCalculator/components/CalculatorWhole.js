import React from 'react'
import {StyleSheet} from 'react-native'
import Screen from './Screen'
import Keyboard from './Keyboard'





class CalculatorWhole extends React.Component {



    render() {

        let STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : NativeModules.StatusBarManager.HEIGHT 


        let Styles = StyleSheet.create({
            paddingToMoveBelowStatusBar: {
                width: "100%",
                height: STATUSBAR_HEIGHT + 2,
                color: "transparent",
                backgroundColor: "white"
            },
        })





        return(
            <View style={styles.paddingToMoveBelowStatusBar}>
                {/* padding to move below status bar */}
            </View>

            
        )
    }
}