import React from 'react'
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Button0To9 from './Button0To9'
import ButtonArithmetic from './ButtonArithmetic';
import ButtonBackSpace from './ButtonBackSpace';
import ButtonClearAll from './ButtonClearAll';
import ButtonNegSign from './ButtonNegSign';
import ButtonDeciPoint from './ButtonDeciPoint';
import ButtonOpenBracket from './ButtonOpenBracket';
import ButtonCloseBracket from './ButtonCloseBracket';
import ButtonPercentOf from './ButtonPercentOf';
import ButtonOutOf from './ButtonOutOf';
import ButtonAddPercent from './ButtonAddPercent';
import ButtonDeductPercent from './ButtonDeductPercent';
import ButtonPercentChange from './ButtonPercentChange';
import ButtonAfterAddedPercent from './ButtonAfterAddedPercent';
import ButtonAfterDeductedPercent from './ButtonAfterDeductedPercent';
import ButtonIfPercentIs from './ButtonIfPercentIs';
import ButtonEquals from './ButtonEquals';
import ButtonThen from './ButtonThen';
import MemoryValuesTextBoxesPanel from './MemoryValuesTextBoxesPanel';
import ButtonMemPlus from './ButtonMemPlus';
import ButtonMemClear from './ButtonMemClear';
import ButtonMemRecall from './ButtonMemRecall';
import ButtonCurrency from './ButtonCurrency'



class Keypad extends React.Component {

    state = {
        showThenButtonFlag: false 
    }

    showThenButton = (booleanFlag) => {
        this.setState({showThenButton: booleanFlag})
    }



    componentDidMount()  {

        if(/if/.test(this.props.screenMainTextLine1)) {
            this.showThenButton(true)
        }
        else {
            this.showThenButton(false)
        }
    }

    render() {


        let standardButtonWidth = Dimensions.get('window').width/5

        let fontSizeOfStandardButton = standardButtonWidth/2.8

 

        let styles = StyleSheet.create({
           
            wholeKeypadContainer: {
                // flex of 1 fills all space in parent container
                flex: 1,
                backgroundColor: "black",
                width: "100%",
                // justifyContent: "center"
            },
         
            standardButtonRowContainer: {
                // flex of 1 for each standard button row, results in equall height of row
                flexDirection: "row",
                flex: 0.9,
            },
              
               
            percentButtonsRowContainer: {
                flexDirection: "row",
                flex: 0.7,//row height is 0.7 compared to 1 of standard buttons
                margin: 0
            },
                
        })



        return(
            <View style={styles.wholeKeypadContainer}>
                <MemoryValuesTextBoxesPanel />
                <View style={styles.percentButtonsRowContainer}>
                    <ButtonOpenBracket />
                    <ButtonCloseBracket />
                    <ButtonMemClear/>
                    <ButtonMemRecall/>
                    <ButtonMemPlus />
                </View>

                <View style={styles.percentButtonsRowContainer}>
                    <ButtonPercentChange />
                    <ButtonAfterAddedPercent />
                    <ButtonAfterDeductedPercent />
                    <ButtonIfPercentIs />
                </View>

                <View style={styles.percentButtonsRowContainer}>
                    <ButtonPercentOf />
                    <ButtonAddPercent />
                    <ButtonDeductPercent />
                    <ButtonOutOf />                    
                </View>

                <View style={styles.standardButtonRowContainer}>
                {/* doesnt work onLayout={e => this.standardButtonHeight = e.nativeEvent.layout.height} */}
                        <Button0To9 buttonValue="7" />
                        <Button0To9 buttonValue="8" />
                        <Button0To9 buttonValue="9" />
                        <ButtonArithmetic buttonValue="÷" />
                        <ButtonBackSpace />
                </View>

                <View style={styles.standardButtonRowContainer}>
                        <Button0To9 buttonValue="4" />
                        <Button0To9 buttonValue="5" />
                        <Button0To9 buttonValue="6" />
                        <ButtonArithmetic buttonValue="x" />
                        <ButtonClearAll />
                </View>
                    
                <View style={styles.standardButtonRowContainer}>
                        <Button0To9 buttonValue="1" />
                        <Button0To9 buttonValue="2" />
                        <Button0To9 buttonValue="3" />
                        <ButtonArithmetic buttonValue="-" />
                        <ButtonCurrency/>
                        
                </View>
                
                <View style={styles.standardButtonRowContainer}>
                        <ButtonNegSign />
                        <Button0To9 buttonValue="0" />
                        <ButtonDeciPoint />
                        <ButtonArithmetic buttonValue="+" />
                        {
                            /if/.test(this.props.screenMainTextLine1)&& (!/then/.test(this.props.screenMainTextLine1)) ? (
                                <ButtonThen />
                            )
                            : (
                                <ButtonEquals />
                            )
                        }
                </View>

            </View>
        )
    }
}


const mapStateToProps = (state) => ({
    screenMainTextLine1: state.calculatorStateData.screenMainTextLine1
})

export default connect(mapStateToProps)(Keypad)