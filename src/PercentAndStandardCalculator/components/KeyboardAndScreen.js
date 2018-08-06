import React from 'react'
import {Dimensions,onLayout,StyleSheet, Button, TouchableOpacity, View, Text} from 'react-native'
import {updateCurrentOperandNumber} from '../../../actions/keyboardActions'
import {updateContentOfScreenMainTextLine1} from '../../../actions/screenActions'
import {connect} from 'react-redux'



class Keyboard extends React.Component {

    handleCalcButtonClicked = oneCalcButtonString => {

        // let currentContent = this.props.screenMainTextLine1Content
        this.props.dispatch(updateContentOfScreenMainTextLine1(oneCalcButtonString))
        
        // this.setState( prevState => ({
        //   ...prevState,
        //   line1CalculatorInput: prevState.line1CalculatorInput + oneCalcButtonString
        // }))

        // alert('clicked')
        // let value = ReactNativeComponentTree.getInstanceFromNode(e.currentTarget)._currentElement.props.cx
        console.log('at handlecalbuttonclick, value is ', oneCalcButtonString)
        // this.setState({line1CalculatorInput: oneCalcButtonString})
      
        // ////testing to delte
        // if(oneCalcButtonString == 0) {
        //     console.log('button 0 pressed')
        //     this.props.dispatch(updateCurrentOperandNumber(2))
        // }
    }
    

    render() {


        this.standardButtonWidth = Dimensions.get('window').width/5

        this.fontSizeOfStandardButton = this.standardButtonWidth/2.5

        this.fontSizeOfScreenMainLine1 = Dimensions.get('window').width/11.5
        
        
        let styles = StyleSheet.create({
            container: {
                // flex of 1 fills all space in parent container
                flex: 1,
                backgroundColor: "lightgray",
                width: "100%",
                // justifyContent: "center"
            },
            screen: {
                flex: 2,
                flexWrap: "wrap",
                backgroundColor: "white",
                width: "100%",
                paddingLeft: this.calculatorScreenHeight/30,
                paddingRight: this.calculatorScreenHeight/30,
                paddingBottom: 0,//-this.calculatorScreenHeight/40,
                paddingTop: 0//this.calculatorScreenHeight/18,
              },
              screenMainTextLine1: {
                display: "flex",
                flexDirection: "row",
                flex:1, 
                width: "100%",
                marginTop: this.fontSizeOfScreenMainLine1/6,
                fontSize: this.fontSizeOfScreenMainLine1,//32,
                lineHeight: this.fontSizeOfScreenMainLine1 + (this.fontSizeOfScreenMainLine1/12),
                color: "black",
                backgroundColor: "white",
                // height: "25%",
              },
            allMemoriesContainer: {
                flexDirection: "row",
                flex: 0.5,
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
            memoryText: {
                alignItems: "center",
                fontSize: this.fontSizeOfStandardButton*0.67,
                color: "blue",
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
                borderWidth: 0,
                height: "100%",
            },
            calcButtonText: {
                fontSize: this.fontSizeOfStandardButton,
                color: "white",
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
                fontSize: this.fontSizeOfStandardButton*0.65,
                color: "white",
            },
            afterPercentAddedButtonText: {
                fontSize: this.fontSizeOfStandardButton*0.65,
                lineHeight: this.fontSizeOfStandardButton*0.65,
                color: "white",
            },
            afterPercentDeductedButtonText: {
                fontSize: this.fontSizeOfStandardButton*0.65,
                color: "white",
                lineHeight: this.fontSizeOfStandardButton*0.65,
            },
            buttonSmallRowContainer: {
                flexDirection: "row",
                flex: 0.3,
            },
            buttonSmallContainer: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "lightgray",
                borderWidth: 0,
                height: "100%",
            },
            buttonSmallText:{
                fontSize: this.fontSizeOfStandardButton*0.6,
                // lineHeight: this.fontSizeOfStandardButton*0.8,
                color: "darkblue"
            },
            
        })


        return(
            <View style={styles.container}>
                <View style={styles.screen} onLayout={ e => {this.calculatorScreenHeight = e.nativeEvent.layout.height}}>
                    {/* <Text style={styles.line1CalculatorInput}>{this.state.line1CalculatorInput}</Text> */}
                    {/* <Text style={styles.line2CalculatorInput}>{this.state.line1CalculatorInput}</Text>
                    <Text style={styles.line3CalculatorInput}>{this.state.line1CalculatorInput}</Text>
                    <Text style={styles.line4CalculatorInput}>{this.state.line1CalculatorInput}</Text> */}
                    <Text style={styles.screenMainTextLine1}>{this.props.screenMainTextLine1Content}</Text>
                </View>

                <View style={styles.allMemoriesContainer}>
                    <View style={styles.memory1Container}>
                        {/* <Text style={styles.memTitle}>Mem1</Text> */}
                        <Text style={styles.memoryText}> 222278.7777</Text>
                    </View>
                    <View style={styles.memory2Container}>
                        <Text style={styles.memoryText}> 77778888.8888</Text>
                    </View>
                </View>

                <View style={styles.percentButtonsRowContainer}>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked("()")}>
                        <Text style={styles.percentButtonText}>( )</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked("m+")}>
                        <Text style={styles.percentButtonText}>M+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked("mc")}>
                        <Text style={styles.percentButtonText}>MC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked("mr")}>
                        <Text style={styles.percentButtonText}>MR</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.percentButtonsRowContainer}>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked("if % is")}>
                        <Text style={styles.percentButtonText}>if % is</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked("after % added")}>
                        <View><Text style={styles.afterPercentAddedButtonText}>after %</Text><Text style={styles.afterPercentAddedButtonText}>added</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked("after % deducted")}>
                        <View><Text style={styles.afterPercentAddedButtonText}>after %</Text><Text style={styles.afterPercentAddedButtonText}>deducted</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked("out of")}>
                        <Text style={styles.percentButtonText}>out of</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.percentButtonsRowContainer}>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked("% of")}>
                        <Text style={styles.percentButtonText}>% of</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked("add %")}>
                        <Text style={styles.percentButtonText}>add %</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked("deduct %")}>
                        <Text style={styles.percentButtonText}>deduct %</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.percentButtonContainer} onPress={()=> this.handleCalcButtonClicked("% change")}>
                        <Text style={styles.percentButtonText}>% change</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.standardButtonRowContainer}>
                {/* doesnt work onLayout={e => this.standardButtonHeight = e.nativeEvent.layout.height} */}
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked("7")}>
                            <Text style={styles.calcButtonText}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked("8")}>
                            <Text style={styles.calcButtonText}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked("9")}>
                            <Text style={styles.calcButtonText}>9</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked("÷")}>
                            <Text style={styles.calcButtonText}>÷</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked("<-")}>
                            <Text style={styles.calcButtonText}>&lt;-</Text>
                        </TouchableOpacity>
                </View>

                <View style={styles.standardButtonRowContainer}>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked("4")}>
                            <Text style={styles.calcButtonText}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked("5")}>
                            <Text style={styles.calcButtonText}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked("6")}>
                            <Text style={styles.calcButtonText}>6</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked("x")}>
                            <Text style={styles.calcButtonText}>x</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked("ca")}>
                            <Text style={styles.calcButtonText}>CA</Text>
                        </TouchableOpacity>
                </View>
                    
                <View style={styles.standardButtonRowContainer}>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={ () => this.handleCalcButtonClicked("1")}>
                            <Text style={styles.calcButtonText} >1</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} value={2} onPress={ () => this.handleCalcButtonClicked("2")}>
                            <Text style={styles.calcButtonText}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} value={3} onPress={ () => this.handleCalcButtonClicked("3")}>
                            <Text style={styles.calcButtonText}>3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} value="+" onPress={ () => this.handleCalcButtonClicked("+")}>
                            <Text style={styles.calcButtonText}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} value="+" onPress={ () => this.handleCalcButtonClicked("currency")}>
                            <Text style={styles.calcButtonText}>$</Text>
                        </TouchableOpacity>
                </View>
                
                <View style={styles.standardButtonRowContainer}>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked("+-")}>
                            <Text style={styles.calcButtonText}>+-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked("0")}>
                            <Text style={styles.calcButtonText}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked(".")}>
                            <Text style={styles.calcButtonText}>.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked("-")}>
                            <Text style={styles.calcButtonText}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> this.handleCalcButtonClicked("=")}>
                            <Text style={styles.calcButtonText}>=</Text>
                        </TouchableOpacity>
                </View>

                <View style={styles.buttonSmallRowContainer}>
                        <TouchableOpacity style={styles.buttonSmallContainer} onPress={()=> this.handleCalcButtonClicked("skin")}>
                            <Text style={styles.buttonSmallText}>Skin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSmallContainer} onPress={()=> this.handleCalcButtonClicked("about")}>
                            <Text style={styles.buttonSmallText}>About</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSmallContainer} onPress={()=> this.handleCalcButtonClicked("tape")}>
                            <Text style={styles.buttonSmallText}>Tape</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSmallContainer} onPress={()=> this.handleCalcButtonClicked("adder")}>
                            <Text style={styles.buttonSmallText}>Adder</Text>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    screenMainTextLine1Content: state.screenStatus.screenMainTextLine1Content
}) 


export default connect(mapStateToProps)(Keyboard)