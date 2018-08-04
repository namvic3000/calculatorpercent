import React, {Component} from '../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, onLayout} from 'react-native';



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// type Props = {};

class PercentAndStandardCalculator extends Component {

  state = {
    line1CalculatorInput: ""
  }

  handleCalcButtonClicked = calcButtonValue => {
    this.setState( prevState => ({
      ...prevState,
      line1CalculatorInput: prevState.line1CalculatorInput + calcButtonValue
    }))
    // alert('clicked')
    // let value = ReactNativeComponentTree.getInstanceFromNode(e.currentTarget)._currentElement.props.cx
    console.log('at handlecalbuttonclick, value is ', calcButtonValue)
    // this.setState({line1CalculatorInput: calcButtonValue})
  }

  componentDidMount = () => {
  }
  
  
  render() {

    // this.calculatorScreenWidth = Dimensions.get('window').width
    // this.calculatorScreenLine1FontSize = this.calculatorScreenWidth / 6
    // console.log('*****screenwidth is, and fontsize is : ' + this.calculatorScreenWidth + this.calculatorScreenLine1FontSize)
    
    // this.calculatorScreenHeight = Dimensions.get('window').width
    this.calculatorScreenLine1FontSize = this.calculatorScreenHeight / 4
    console.log('*****screenheight is' + this.calculatorScreenHeight)
    

    const styles = StyleSheet.create({
      pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      calculatorScreen: {
        flex: 1.5,
        backgroundColor: "white",
        width: "100%",
        paddingLeft: this.calculatorScreenHeight/30,
        paddingRight: this.calculatorScreenHeight/30,
        paddingBottom: 0,//-this.calculatorScreenHeight/40,
        paddingTop: this.calculatorScreenHeight/18,
      },
      calcButtonRowContainer: {
        // display: "flex",
        flex: 1,
        flexDirection: "row",
        // height: "15%",
        // marginBottom: 10
      },
      calcButtonContainer: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'blue',
        backgroundColor: "gray",//"rgb(250,250,255)",
        borderWidth: 1,
        height: "100%",
      },
      calcButtonText: {
        fontSize: 35,
        color: "white",
      },
      percentButtonsRowContainer: {
        flex: 0.65,
        flexDirection: "row",
      },
      percentButtonContainer: {
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
        flex: 0.35,
        flexDirection: "row",
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
      line1CalculatorInput: {
        display: "flex",
        flexDirection: "row",
        flex:1, 
        width: "100%",
        fontSize: this.calculatorScreenLine1FontSize,//32,
        lineHeight: this.calculatorScreenLine1FontSize + (this.calculatorScreenLine1FontSize/5.5),
        color: "black",
        backgroundColor: "white",
        // height: "25%",
        width: "100%"
      },
    
      line2CalculatorInput: {
        display: "flex",
        flexDirection: "row",
        flex:1,
        fontSize: 36,
        color: "blue",
        // height: "25%",
        width: "100%"
      },
    
      line3CalculatorInput: {
        display: "flex",
        flexDirection: "row",
        flex:1,
        fontSize: 36,
        color: "blue",
        // height: "25%",
        width: "100%"
      },
    
      line4CalculatorInput: {
        display: "flex",
        flexDirection: "row",
        flex:1,
        fontSize: 36,
        color: "blue",
        // height: "25%",
        width: "100%"
      }
      
    })
    







    return (
      <View style={styles.pageContainer}>
        <View style={styles.calculatorScreen} onLayout={ e => {this.calculatorScreenHeight = e.nativeEvent.layout.height}}>
          <Text style={styles.line1CalculatorInput}>{this.state.line1CalculatorInput}</Text>
          {/* <Text style={styles.line2CalculatorInput}>{this.state.line1CalculatorInput}</Text>
          <Text style={styles.line3CalculatorInput}>{this.state.line1CalculatorInput}</Text>
          <Text style={styles.line4CalculatorInput}>{this.state.line1CalculatorInput}</Text> */}

        </View>
        


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


        <View style={styles.calcButtonRowContainer}>
          <TouchableOpacity style={styles.calcButtonContainer} onPress={()=> this.handleCalcButtonClicked(7)}>
            <Text style={styles.calcButtonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calcButtonContainer} onPress={()=> this.handleCalcButtonClicked(8)}>
            <Text style={styles.calcButtonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calcButtonContainer} onPress={()=> this.handleCalcButtonClicked(9)}>
            <Text style={styles.calcButtonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calcButtonContainer} onPress={()=> this.handleCalcButtonClicked(" ÷ ")}>
            <Text style={styles.calcButtonText}>÷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calcButtonRowContainer}>
          <TouchableOpacity style={styles.calcButtonContainer} onPress={()=> this.handleCalcButtonClicked(4)}>
            <Text style={styles.calcButtonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calcButtonContainer} onPress={()=> this.handleCalcButtonClicked(5)}>
            <Text style={styles.calcButtonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calcButtonContainer} onPress={()=> this.handleCalcButtonClicked(6)}>
            <Text style={styles.calcButtonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calcButtonContainer} onPress={()=> this.handleCalcButtonClicked(" x ")}>
            <Text style={styles.calcButtonText}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calcButtonRowContainer}>
          <TouchableOpacity style={styles.calcButtonContainer} onPress={ () => this.handleCalcButtonClicked(1)}>
             <Text style={styles.calcButtonText} >1</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.calcButtonContainer} value={2} onPress={ () => this.handleCalcButtonClicked(2)}>
            <Text style={styles.calcButtonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calcButtonContainer} value={3} onPress={ () => this.handleCalcButtonClicked(3)}>
            <Text style={styles.calcButtonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calcButtonContainer} value="+" onPress={ () => this.handleCalcButtonClicked(" + ")}>
            <Text style={styles.calcButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calcButtonRowContainer}>
          <TouchableOpacity style={styles.calcButtonContainer} onPress={()=> this.handleCalcButtonClicked("-")}>
            <Text style={styles.calcButtonText}>+-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calcButtonContainer} onPress={()=> this.handleCalcButtonClicked(0)}>
            <Text style={styles.calcButtonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calcButtonContainer} onPress={()=> this.handleCalcButtonClicked(".")}>
            <Text style={styles.calcButtonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calcButtonContainer} onPress={()=> this.handleCalcButtonClicked(" - ")}>
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
    );
  }
}
 


export default PercentAndStandardCalculator