import React from 'react'
import {AsyncStorage,View, StyleSheet, Platform, NativeModules, Text, TouchableOpacity} from 'react-native'
import { connect } from "react-redux"
import {ColorPicker, fromHsv} from "react-native-color-picker"






class ColorPickerTool extends React.Component {
 

 



    colorPicked = color => {

        let hexColor = fromHsv(color)
        console.log('color picked is ' + hexColor)
    }



    render() {

 

 


        return(
                this.props.showColorPickerStatus ? (
                    <View style={styles.colorPickerOuterMostContainer}>

                    <View style={styles.colorPickerContainer}>
                        <ColorPicker style={styles.colorPicker} 
                                onColorChange={color => { this.colorPicked(color) }}
                                hideSliders={true}/>
                    </View>
                    </View>
                ): (
                    null
                )
        )
    }
}



let styles = StyleSheet.create({
    
    colorPickerOuterMostContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'

    },
    colorPickerContainer: {
        // position: 'absolute',
        height: '40%',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'transparent' //'rgba(20,30,50,0.3)'
    },
    colorPicker: {
        height: '100%',
        width: '100%',
    }
})




const mapStateToProps = (state) => ({
    showColorPickerStatus: state.skinData.showColorPickerStatus,
    showButtonSmallsPanelStatus: state.buttonSmallsPanel.showButtonSmallsPanelStatus
})


export default connect(mapStateToProps)(ColorPickerTool)


