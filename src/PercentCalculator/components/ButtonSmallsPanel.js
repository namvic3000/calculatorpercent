import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ButtonSmallTape from './ButtonSmallTape';
import ButtonSmallAbout from './ButtonSmallAbout';
import ButtonSmallSkin from './ButtonSmallSkin';



 
export default class ButtonSmallsPanel extends React.Component {
    




    render() {
        return (
            <View style={styles.container}>
                <ButtonSmallSkin/>
                <ButtonSmallAbout/>
                <ButtonSmallTape/>
            </View>
        )
    }
}



let styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        position: 'absolute'
    }
})