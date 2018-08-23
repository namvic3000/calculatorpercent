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
import ButtonSmallsPanel from './ButtonSmallsPanel'



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
                backgroundColor: "lightgray",
                width: "100%",
                // justifyContent: "center"
            },
            
            allMemoriesContainer: {
                flex: 0.3,
                flexDirection: "row",
            },
            memory1Container: {
                flex: 1,
                flexDirection: "row",
                paddingLeft: "1%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                borderWidth: 0,
                // borderRightWidth: 1,
                // borderColor: "gray"
            },
            memory2Container: {
                flex: 1,
                flexDirection: "row",
                paddingRight: "1%",
                // width: "49%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                borderWidth: 0,
                borderColor: "black"
            },
            memoryButtonText: {
                fontSize: fontSizeOfStandardButton*0.75,
                color: "white",
            },
            memoryContentText: {
                alignItems: "center",
                fontSize: fontSizeOfStandardButton*0.62,
                color: "blue",
            },
            standardButtonRowContainer: {
                // flex of 1 for each standard button row, results in equall height of row
                flexDirection: "row",
                flex: 0.9,
            },
            standardButtonContainer: {
                //container for each individual button
                flex: 1,//each button has equal width, because the flexdir is now 'row'
                alignItems: 'center',
                justifyContent: 'center',
                color: 'blue',
                backgroundColor: "darkblue",//"rgb(250,250,255)",
                borderWidth: 0,
                height: "100%",
            },
            calcButtonText: {
                fontSize: fontSizeOfStandardButton,
                color: "white",
            },
            calcButtonTextForCA: {
                fontSize: fontSizeOfStandardButton*0.83,
                color: "white",
            },
            calcButtonTextForBackArrow: {
                fontSize: fontSizeOfStandardButton*1.2,
                color: "white",
            },
            calcButtonTextForCurrency: {
                fontSize: fontSizeOfStandardButton*0.95,
                color: "white",
            },
            calcButtonTextArithOperators: {
                fontSize: fontSizeOfStandardButton*1.1,
                color: "white",
            },
            calcButtonTextSubtractOperator: {
                fontSize: fontSizeOfStandardButton*1.3,
                color: "white",
            },
            calcButtonTextMultiplyOperator: {
                fontSize: fontSizeOfStandardButton*1.1,
                color: "white",
                bottom: 2.5
            },
            percentButtonsRowContainer: {
                flexDirection: "row",
                flex: 0.7,//row height is 0.7 compared to 1 of standard buttons
                margin: 0
            },
            percentButtonsRowContainerLast: {
                flexDirection: "row",
                position: "relative",
                bottom: 15,
                flex: 0.7,//row height is 0.7 compared to 1 of standard buttons
                margin: 0
            },
            percentButtonContainer: {
                //flex 1 means each button in row has equal width, because flexdir is set as 'row'
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: "center",
                backgroundColor: "gray",
                borderWidth: 0,
                borderColor: "black",
                height: "100%",
            },
            percentButtonText:{
                fontSize: fontSizeOfStandardButton*0.7,
                color: "white",
            },
            afterPercentAddedButtonText: {
                fontSize: fontSizeOfStandardButton*0.7,
                lineHeight: fontSizeOfStandardButton*0.7,
                color: "white",
            },
            afterPercentDeductedButtonText: {
                fontSize: fontSizeOfStandardButton*0.7,
                color: "white",
                lineHeight: fontSizeOfStandardButton*0.7,
            },
            buttonSmallsRowContainer: {
                
            }
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
                    <ButtonOutOf />
                    <ButtonAfterAddedPercent />
                    <ButtonAfterDeductedPercent />
                    <ButtonIfPercentIs />
                </View>

                <View style={styles.percentButtonsRowContainer}>
                    <ButtonPercentOf />
                    <ButtonAddPercent />
                    <ButtonDeductPercent />
                    <ButtonPercentChange />
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
                        <TouchableOpacity style={styles.standardButtonContainer} value="+" onPress={ () => {this.handleCalcButtonClicked("currency")}}>
                            <Text style={styles.calcButtonTextForCurrency}>$</Text>
                        </TouchableOpacity>
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