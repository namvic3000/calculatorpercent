import React from 'react'
import {onLayout,StyleSheet, Button, TouchableOpacity, View, Text} from 'react-native'
import {updateCurrentOperandNumber} from '../../actions/keyboardActions'
import {connect} from 'react-redux'


class Keyboard extends React.Component {

    handleCalcButtonClicked = calcButtonValue => {
        // this.setState( prevState => ({
        //   ...prevState,
        //   line1CalculatorInput: prevState.line1CalculatorInput + calcButtonValue
        // }))

        // alert('clicked')
        // let value = ReactNativeComponentTree.getInstanceFromNode(e.currentTarget)._currentElement.props.cx
        console.log('at handlecalbuttonclick, value is ', calcButtonValue)
        // this.setState({line1CalculatorInput: calcButtonValue})
      
        // ////testing to delte
        if(calcButtonValue == 0) {
            console.log('button 0 pressed')
            this.props.dispatch(updateCurrentOperandNumber(2))
        }
    }
    

    render() {


        this.fontSizeOfStandardButton = this.standardButtonWidth
        console.log('STANDARDBUTTONWIDTH IS '+this.standardButtonWidth)

        let styles = StyleSheet.create({
            container: {
                // flex of 1 fills all space in parent container
                flex: 1,
                backgroundColor: "yellow",
                width: "100%",
            },
            standardButtonRowContainer: {
                // flex of 1 for each standard button row, results in equall height of row
                flexDirection: "row",
                flex: 1,
            },
            standardButtonContainer: {
                //container for each individual button
                flex: 1,//each button has equal width, because the flexdir is now 'row'
                alignItems: 'center',
                justifyContent: 'center',
                color: 'blue',
                backgroundColor: "gray",//"rgb(250,250,255)",
                borderWidth: 1,
                height: "100%",
            },
            calcButtonText: {
                fontSize: this.fontSizeOfStandardButton,
                color: "white",
            },
            percentButtonsRowContainer: {
                flexDirection: "row",
                flex: 0.65,//row height is 0.65 compared to 1 of standard buttons
            },
            percentButtonContainer: {
                //flex 1 means each button in row has equal width, because flexdir is set as 'row'
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: "center",
                backgroundColor: "gray",
                borderWidth: 1,
                borderColor: "black",
                height: "100%",
            },
            percentButtonText:{
                fontSize: 18,
                color: "white",
                // justifyContent: "center"
            },
            afterPercentAddedButtonText: {
                fontSize: 18,
                lineHeight: 18,
                // paddingLeft: 15,
                color: "white",
            },
            afterPercentDeductedButtonText: {
                fontSize: 18,
                // paddingLeft: 5,
                color: "white",
                lineHeight: 18,
            },
            buttonSmallRowContainer: {
                flexDirection: "row",
                flex: 0.35,
            },
            buttonSmallContainer: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "yellow",
                borderWidth: 1,
                height: "100%",
            },
            buttonSmallText:{
                fontSize: 18,
                color: "darkblue"
            },
            
            })


        return(
            <View style={styles.container}>
                <View style={styles.percentButtonsRowContainer}>
                <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked(" % of ")}>
                    <Text style={styles.percentButtonText}>( )</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked(" out of ")}>
                    <Text style={styles.percentButtonText}>M+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked(" add ")}>
                    <Text style={styles.percentButtonText}>MC</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked(" deduct ")}>
                    <Text style={styles.percentButtonText}>MR</Text>
                </TouchableOpacity>
                </View>




                <View style={styles.percentButtonsRowContainer}>
                <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked(" % of ")}>
                    <Text style={styles.percentButtonText}>% of</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked(" out of ")}>
                    <Text style={styles.percentButtonText}>out of</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked(" add ")}>
                    <Text style={styles.percentButtonText}>add %</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked(" deduct ")}>
                    <Text style={styles.percentButtonText}>deduct %</Text>
                </TouchableOpacity>
                </View>

                <View style={styles.percentButtonsRowContainer}>
                <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked("-")}>
                    <Text style={styles.percentButtonText}>% change</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked(0)}>
                    <Text style={styles.percentButtonText}>if % is</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked(".")}>
                    <View><Text style={styles.afterPercentAddedButtonText}>after %</Text><Text style={styles.afterPercentAddedButtonText}>added</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked(".")}>
                    <View><Text style={styles.afterPercentAddedButtonText}>after %</Text><Text style={styles.afterPercentAddedButtonText}>deducted</Text></View>
                </TouchableOpacity>
                </View>


                <View style={styles.standardButtonRowContainer}>
                <TouchableOpacity onLayout={e => this.standardButtonWidth = e.nativeEvent.layout.width} style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked(7)}>
                    <Text style={styles.calcButtonText}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked(8)}>
                    <Text style={styles.calcButtonText}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked(9)}>
                    <Text style={styles.calcButtonText}>9</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked(" ÷ ")}>
                    <Text style={styles.calcButtonText}>÷</Text>
                </TouchableOpacity>
                </View>

                <View style={styles.standardButtonRowContainer}>
                <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked(4)}>
                    <Text style={styles.calcButtonText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked(5)}>
                    <Text style={styles.calcButtonText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked(6)}>
                    <Text style={styles.calcButtonText}>6</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked(" x ")}>
                    <Text style={styles.calcButtonText}>x</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.standardButtonRowContainer}>
                <TouchableOpacity style={styles.standardButtonContainer} onPress={ () => this.handleCalcButtonClicked(1)}>
                    <Text style={styles.calcButtonText} >1</Text> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.standardButtonContainer} value={2} onPress={ () => this.handleCalcButtonClicked(2)}>
                    <Text style={styles.calcButtonText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.standardButtonContainer} value={3} onPress={ () => this.handleCalcButtonClicked(3)}>
                    <Text style={styles.calcButtonText}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.standardButtonContainer} value="+" onPress={ () => this.handleCalcButtonClicked(" + ")}>
                    <Text style={styles.calcButtonText}>+</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.standardButtonRowContainer}>
                <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked("-")}>
                    <Text style={styles.calcButtonText}>+-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked(0)}>
                    <Text style={styles.calcButtonText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked(".")}>
                    <Text style={styles.calcButtonText}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked(" - ")}>
                    <Text style={styles.calcButtonText}>-</Text>
                </TouchableOpacity>
                </View>


                <View style={styles.buttonSmallRowContainer}>
                <TouchableOpacity style={styles.buttonSmallContainer} onPress={()=> this.handleCalcButtonClicked("-")}>
                    <Text style={styles.buttonSmallText}>Skin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSmallContainer} onPress={()=> this.handleCalcButtonClicked(0)}>
                    <Text style={styles.buttonSmallText}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSmallContainer} onPress={()=> this.handleCalcButtonClicked(".")}>
                    <Text style={styles.buttonSmallText}>+-x÷</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSmallContainer} onPress={()=> this.handleCalcButtonClicked(" - ")}>
                    <Text style={styles.buttonSmallText}>Adder</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}


export default connect()(Keyboard)