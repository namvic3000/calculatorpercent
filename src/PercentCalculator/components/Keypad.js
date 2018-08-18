import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Button0To9 from './Button0To9'
import ButtonArithmetic from './ButtonArithmetic';
import ButtonBackSpace from './ButtonBackSpace';
import ButtonClearAll from './ButtonClearAll';
import ButtonNegSign from './ButtonNegSign';




class Keypad extends React.Component {

    state = {
        showThenButtonFlag: false 
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
        })



        return(
            <View style={styles.wholeKeypadContainer}>

                <View style={styles.allMemoriesContainer}>
                    <View style={styles.memory1Container}>
                        {/* <Text style={styles.memTitle}>Mem1</Text> */}
                        <Text style={styles.memoryContentText}> 222278.7777</Text>
                    </View>
                    <View style={styles.memory2Container}>
                        <Text style={styles.memoryContentText}> 77778888.8888</Text>
                    </View>
                </View>

                <View style={styles.percentButtonsRowContainer}>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> {this.handleCalcButtonClicked("(")}}>
                        <Text style={styles.percentButtonText}>(</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> {this.handleCalcButtonClicked(")")}}>
                        <Text style={styles.percentButtonText}>)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> {this.handleCalcButtonClicked("m+")}}>
                        <Text style={styles.memoryButtonText}>M+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> {this.handleCalcButtonClicked("mc")}}>
                        <Text style={styles.memoryButtonText}>MC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> {this.handleCalcButtonClicked("mr")}}>
                        <Text style={styles.memoryButtonText}>MR</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.percentButtonsRowContainer}>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> {this.handleCalcButtonClicked("out of")}}>
                        <Text style={styles.percentButtonText}>out of</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> {this.handleCalcButtonClicked("after added %")}}>
                        <View><Text style={styles.afterPercentAddedButtonText}>after %</Text><Text style={styles.afterPercentAddedButtonText}>added</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> {this.handleCalcButtonClicked("after deducted %")}}>
                        <View><Text style={styles.afterPercentAddedButtonText}>after %</Text><Text style={styles.afterPercentAddedButtonText}>deducted</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> {this.handleCalcButtonClicked("if % is")}}>
                        <Text style={styles.percentButtonText}>if % is</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.percentButtonsRowContainer}>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> {this.handleCalcButtonClicked("% of")}}>
                        <Text style={styles.percentButtonText}>% of</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> {this.handleCalcButtonClicked("add %")}}>
                        <Text style={styles.percentButtonText}>add %</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> {this.handleCalcButtonClicked("deduct %")}}>
                        <Text style={styles.percentButtonText}>deduct %</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> {this.handleCalcButtonClicked("% change")}}>
                        <Text style={styles.percentButtonText}>% change</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.standardButtonRowContainer}>
                {/* doesnt work onLayout={e => this.standardButtonHeight = e.nativeEvent.layout.height} */}
                        {/* <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("7")}}>
                            <Text style={styles.calcButtonText}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("8")}}>
                            <Text style={styles.calcButtonText}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("9")}}>
                            <Text style={styles.calcButtonText}>9</Text>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("÷")}}>
                            <Text style={styles.calcButtonTextArithOperators}>÷</Text>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("«")}}>
                            <Text style={styles.calcButtonTextForBackArrow}>«</Text>
                        </TouchableOpacity> */}
                        <Button0To9 buttonValue="7" />
                        <Button0To9 buttonValue="8" />
                        <Button0To9 buttonValue="9" />
                        <ButtonArithmetic buttonValue="÷" />
                        <ButtonBackSpace />
                </View>

                <View style={styles.standardButtonRowContainer}>
                        {/* <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("4")}}>
                            <Text style={styles.calcButtonText}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("5")}}>
                            <Text style={styles.calcButtonText}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("6")}}>
                            <Text style={styles.calcButtonText}>6</Text>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("x")}}>
                            <Text style={styles.calcButtonTextMultiplyOperator}>x</Text>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("ca")}}>
                            <Text style={styles.calcButtonTextForCA}>CA</Text>
                        </TouchableOpacity> */}
                        <Button0To9 buttonValue="4" />
                        <Button0To9 buttonValue="5" />
                        <Button0To9 buttonValue="6" />
                        <ButtonArithmetic buttonValue="x" />
                        <ButtonClearAll />
                </View>
                    
                <View style={styles.standardButtonRowContainer}>
                        {/* <TouchableOpacity style={styles.standardButtonContainer} onPress={ () => {this.handleCalcButtonClicked("1")}}>
                            <Text style={styles.calcButtonText} >1</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} value={2} onPress={ () => {this.handleCalcButtonClicked("2")}}>
                            <Text style={styles.calcButtonText}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} value={3} onPress={ () => {this.handleCalcButtonClicked("3")}}>
                            <Text style={styles.calcButtonText}>3</Text>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("-")}}>
                            <Text style={styles.calcButtonTextSubtractOperator}>-</Text>
                        </TouchableOpacity> */}
                        <Button0To9 buttonValue="1" />
                        <Button0To9 buttonValue="2" />
                        <Button0To9 buttonValue="3" />
                        <ButtonArithmetic buttonValue="-" />
                        <TouchableOpacity style={styles.standardButtonContainer} value="+" onPress={ () => {this.handleCalcButtonClicked("currency")}}>
                            <Text style={styles.calcButtonTextForCurrency}>$</Text>
                        </TouchableOpacity>
                </View>
                
                <View style={styles.standardButtonRowContainer}>
                        {/* <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("+-")}}>
                            <Text style={styles.calcButtonText}>+-</Text>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("0")}}>
                            <Text style={styles.calcButtonText}>0</Text>
                        </TouchableOpacity> */}
                        <ButtonNegSign />
                        <Button0To9 buttonValue="0" />
                       
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked(".")}}>
                            <Text style={styles.calcButtonText}>.</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.standardButtonContainer} value="+" onPress={ () => {this.handleCalcButtonClicked("+")}}>
                            <Text style={styles.calcButtonTextArithOperators}>+</Text>
                        </TouchableOpacity> */}
                        <ButtonArithmetic buttonValue="+" />


                        {
                            this.state.showThenButtonFlag ? (
                                <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("then")}}>
                                    <Text style={styles.calcButtonText}>then</Text>
                                </TouchableOpacity>
                            )
                            : (
                                <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("=")}}>
                                    <Text style={styles.calcButtonTextForBackArrow}>=</Text>
                                </TouchableOpacity>
                            )
                        }
                </View>

                {/* <View style={styles.buttonSmallRowContainer}>
                        <TouchableOpacity style={styles.buttonSmallContainer} onPress={()=> {this.handleCalcButtonClicked("skin}")}>
                            <Text style={styles.buttonSmallText}>Skin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSmallContainer} onPress={()=> {this.handleCalcButtonClicked("abou}t")}>
                            <Text style={styles.buttonSmallText}>About</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSmallContainer} onPress={()=> {this.handleCalcButtonClicked("tape}")}>
                            <Text style={styles.buttonSmallText}>Tape</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSmallContainer} onPress={()=> {this.handleCalcButtonClicked("adde}r")}>
                            <Text style={styles.buttonSmallText}>Adder</Text>
                        </TouchableOpacity>
                </View> */}
            </View>
        )
    }
}




export default Keypad