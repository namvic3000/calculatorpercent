import React from 'react'
import { connect } from "react-redux";
import { TouchableOpacity,View, Text, StyleSheet, Dimensions } from 'react-native'
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


import * as helpers from '../helpers.js'
import IconCurrencySign from './IconCurrencySign.js';
import IconDeciPoints from './IconDeciPoints.js';




import ButtonSmallTape from './ButtonSmallTape';
import ButtonSmallAbout from './ButtonSmallAbout';
import ButtonSmallSkin from './ButtonSmallSkin';
import { updateShowButtonSmallsPanelStatus } from "../../../actions/buttonSmallsPanelActions";




import  {updateMemoryData} from "../../../actions/memoryActions"
import {updateCalculatorData} from '../../../actions/calculatorDataActions'
import {updateSkinData} from '../../../actions/skinDataActions'



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


      
       if(window.document) (this.mainTextLine1ID = window.document.getElementById('mainTextLine1ID'))

    }






    thinStripClicked = () => {

        //show buttonsmallspanel
        this.props.dispatch(updateShowButtonSmallsPanelStatus(true))
        
        //set time out to close buttonsmallspanel if no buttonsmalll is clicked
        //dont close if any buttonsmall is clicked and becomes active
        setTimeout( () => {
            if( ( ! this.props.showTapeStatus) 
                && ( ! this.props.skinSelectionModeActiveStatus) 
                &&(( ! this.props.showAboutPageStatus)) )//####ADD MORE SCREENS LATER
                this.props.dispatch(updateShowButtonSmallsPanelStatus(false))
        }, 2000)

    }
 
 




    handleMemoryValuePress = memoryNumber => {


        ////check if in skinn color selection mode, if so, indicate that
        //that component to chage is keysSet1
        if(this.props.skinData.skinSelectionModeActiveStatus) {
            //component to chanage is keyset1

            //leave everything same, except set keys to change to keysset1
            //and showcolorpicker to true.
            let dataObject = {
                showColorPickerStatus: true,//show color picker now
                skinSelectionModeActiveStatus: this.props.skinData.skinSelectionModeActiveStatus,
                currentComponentSkinToBeChanged: 'memoryBoxesColor',
                memoryBoxesColor: this.props.skinData.memoryBoxesColor,
                memoryButtonsColor: this.props.skinData.memoryButtonsColor,
                percentButtonsColor: this.props.skinData.percentButtonsColor,
                keysSet1Color: this.props.skinData.keysSet1Color,
                keysSet2Color: this.props.skinData.keysSet2Color,
                buttonSmallsColor: this.props.skinData.buttonSmallsColor
            }

            this.props.dispatch(updateSkinData(dataObject))


            //show message to pick a color

            //show 'select component to change' message
            ///CLEARALL
            //collate stirng from all segments     
            let screenMainTextLine1 = ""
            let screenLiveAnswerLine = ""
            let screenMidScreenMessage = "use picker to choose color"
            segmentsArray = []
            currentSegmentIndex = 0
            timeMachineArrayOfSegmentsArraySnapShots = []
            //clearall
            this.props.dispatch(updateCalculatorData(
                screenMainTextLine1,
                screenLiveAnswerLine,
                screenMidScreenMessage,
                segmentsArray, 
                currentSegmentIndex, 
                timeMachineArrayOfSegmentsArraySnapShots
            ))

            return;//dont process below code
        }


     //console.log('MEMORY PRESSED, MEMORY NUMER: ' + memoryNumber)

        //update memory status to correct memory number
        let memory1Value = this.props.memory1Value
        let memory2Value = this.props.memory2Value
        let currentActiveMemory = memoryNumber

     //console.log('AT MEMORY VALUES PANEL, mem1value, mem2val, currntactivemem are: ', + memory1Value, memory2Value, currentActiveMemory)
        
        this.props.dispatch(updateMemoryData(memory1Value, memory2Value, currentActiveMemory))
    }






    render() {


        let standardButtonWidth = Dimensions.get('window').width/5

        let fontSizeOfStandardButton = standardButtonWidth/2.8

 
        
        let isTabletDevice = Dimensions.get('window').width >= 768
        let tabletScaleFactor = 0.75
        
        if(isTabletDevice) {//table, so make font smaller
            fontSizeOfStandardButton *= tabletScaleFactor
        }












    let {segmentsArray, currentSegmentIndex, screenMainTextLine1, 
        screenLiveAnswerLine, screenMidScreenMessage} = this.props
    
    

    //THE REAL DATA IS IN THE SEGMENTSARRAY[].STRINGVALUE WHICH ARE NOT ALTERED,
    //, HERE WE ALTER THE COPIES OR 
    //ALTER THE OTHER FIELDS IN THE SEGMENTS ARRAY WHICH CHANGE CONSTANTLY AND CAN
    //BE DEDUCED FROM THE SEGMENTSARRAY[].STRINGVALUE FIELD.

    //NOTE: ALLL THE ALTERING FOR USER DISPLAY IS DONE HERE IN SCREEN.JS, AND DONT ALTER
    //THE UNDERLYING DATA SEGMENTSARRAY[].STRINGVALUE 

    //WHEN GETS HERE, ANSWER IS ALREADY CALCULATED AND STORED IN SCREENLIVEANSWERLINE
    //, WE ALTER THE MIRROR HERE ONLY FOR DISPLAY, THE REAL ANSWER STORED 
    //IS UNALTERED.



 //console.log('AT SCREEN.JS: REAL SEGMENTS ARRAY BEFORE ALTERING FOR USER DISPLAY IS: ',segmentsArray)
 //console.log('AT SCREEN.JS: LIVEANSWERLINE BEFORE ALTERING FOR USER DISPLAY IS: ',screenLiveAnswerLine)


    //truncate the decimal places, for user display only, internally not truncated
    //for keeping precision
    //do this first before inserting thousands separators which would error
    screenLiveAnswerLine = helpers.truncateDecimalPlacesOfString(screenLiveAnswerLine, this.props.currentNumberOfDeciPoints) 


    ////MUST ADD EXTRA DETAILS BEFORE ADDING SEPARATORS. WONT WORK IF HAVE
    //SEPARATORS IN THE STRING TO PASS TO ADDEXTRADETAILS
    ///add extra details
    //now add the extra text details to the result, e.g '% change' 
    // , result is e.g 255 , we add %sign and 'increase' in, becomes 255% (increase)
    //this method requires answer string, and whole calculation tring
    screenLiveAnswerLine = helpers.addExtraDetailsTextToAnswer(screenLiveAnswerLine, helpers.collateStringsIntoOneString(segmentsArray))

    //insert thousands separators, for display to screen only, 
    //dont alter the segments array[].stingvalue which created the screenMainTextLine1.
    screenLiveAnswerLine = helpers.insertThousandsSeparatorsForOneSingleNumberString(screenLiveAnswerLine)
    screenMainTextLine1 = helpers.insertThousandsSeparatorsForWholeCalculation(segmentsArray)
    
    //add currency symbol if it is a quantity amount, not a percentage
    screenLiveAnswerLine = helpers.addCurrencySymbolToAnswerIfAppropriate(screenLiveAnswerLine, helpers.collateStringsIntoOneString(segmentsArray), this.props.currentCurrency)
    


 //console.log('AT SCREEN.JS: REAL SEGMENTS ARRAY AFTER ALTERING FOR USER DISPLAY IS: ',segmentsArray)
 //console.log('AT SCREEN.JS: LIVEANSWERLINE AFTER ALTERING FOR USER DISPLAY IS: ',screenLiveAnswerLine)




    
    let fontSizeOfScreenMainLine1;//default
    ////////fontsize for mainline1
    let allowedLengthBeforeShrinking = 79

    if(isTabletDevice) {
        allowedLengthBeforeShrinking = 100
    }


    let overflow = screenMainTextLine1.length - allowedLengthBeforeShrinking//allow 50 chars before shrinking
    if(overflow < 0) {//error check
        overflowFromInitialExpectedLength = 0
    }

    // console.log('AT SCREEN, SCREENMAINTEXTLINE1 IS: ', screenMainTextLine1)

    //large fontsize for initial x number of characters, before start shrinking
    if(screenMainTextLine1.length <= allowedLengthBeforeShrinking) {
        //length is within allowed initial length, gets large font
        fontSizeOfScreenMainLine1 = Dimensions.get('window').width/12
        if(isTabletDevice) {
            fontSizeOfScreenMainLine1 *= tabletScaleFactor
        }
    }
    else {//length is OVER allowed initial limit, now smaller font and start shrinking as length gets longer
        fontSizeOfScreenMainLine1 = Dimensions.get('window').width/13 - ((overflow * 0.06))
        
        if(isTabletDevice) {
            fontSizeOfScreenMainLine1 = tabletScaleFactor * Dimensions.get('window').width/13 - ((overflow * 0.06/tabletScaleFactor))
        }
    }
    
    // //******TESTING , TO DELTE***** */
    // console.log('LENGTH OF LINE1 IS: ' , screenMainTextLine1.length)

    // let numberOfLFs = screenMainTextLine1.match(/\+/g)
    // console.log('NUMBER OF LFs IN LINE1 IS: ' , numberOfLFs)

    // let splitStr = screenMainTextLine1.split(/\r?\n/g)
    // console.log('SPLIT LINE1 IS: ', splitStr)

    // // let mainTextLine1ID = document.getElementById('mainTextLine1ID')
    
    // this.mainTextLine1ID && console.log('VIA DOM ID, LINE HEIGHT IS IS: ', this.mainTextLine1ID.style.lineHeight)
    // //************** */


    let allowedLengthOfLiveAnswerLineBeforeShrinking = 16
    let excess = screenLiveAnswerLine.length - allowedLengthOfLiveAnswerLineBeforeShrinking
    if (excess < 0) {
      excess = 0
    }

    fontSizeOfScreenLiveAnswerLine = Dimensions.get('window').width/16 - ((excess * 0.1))


    if(isTabletDevice) {
        fontSizeOfScreenLiveAnswerLine *= tabletScaleFactor
    }







 
    //insert separators to the mem value to be dipsplayed
    let mem1ValueWithSeparators = helpers.truncateDecimalPlacesOfString(this.props.memory1Value)
    mem1ValueWithSeparators = helpers.insertThousandsSeparatorsForOneSingleNumberString(this.props.memory1Value)
    let mem2ValueWithSeparators = helpers.truncateDecimalPlacesOfString(this.props.memory2Value)
    mem2ValueWithSeparators = helpers.insertThousandsSeparatorsForOneSingleNumberString(this.props.memory2Value)





    let allowedLengthOfMemoryValueBeforeShrinking = 10
        
    let mem1Excess = (this.props.memory1Value||'').length - allowedLengthOfMemoryValueBeforeShrinking
    if (mem1Excess < 0) {
      mem1Excess = 0
    }
    
    let mem2Excess = (this.props.memory2Value||'').length - allowedLengthOfMemoryValueBeforeShrinking
    if (mem2Excess < 0) {
      mem2Excess = 0
    }

 //console.log('MEMVALUES PANEL: MEM1 AND MEM2 EXCESSES AREE: '+mem1Excess, mem2Excess)
    let fontSizeOfMem1Value = Dimensions.get('window').width/22 - ((mem1Excess * 0.4))
    let fontSizeOfMem2Value = Dimensions.get('window').width/22 - ((mem2Excess * 0.4))

    
    if(isTabletDevice) {
        fontSizeOfMem1Value *= tabletScaleFactor
        fontSizeOfMem2Value *= tabletScaleFactor
    }

 //console.log('MEMVALUES CONTAINER, BGCOLORS ARE: ' + this.props.skinData.memoryBoxesColor)
 



    // this.refID && console.log('REFID IS: ' , this.refID)
    // this.refID && console.log('REFID STYLE IS: ' , this.refID.viewConfig.validAttributes.style.lineHeight)




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
                // flex: 0.3,
                height: '10%'
            },
            percentButtonsRowContainer: {
                flexDirection: "row",
                // flex: 0.7,//row height is 0.7 compared to 1 of standard buttons
                height: '8%',
                margin: 0
            },





            screen: {
                flex: 1,
                flexWrap: "wrap",
                backgroundColor: "white",
                width: "100%",
                paddingLeft: this.calculatorScreenHeight/22,//defined in <view></view>
                paddingRight: this.calculatorScreenHeight/25,
                paddingBottom: 0,
                paddingTop: 0
              },
              screenMainTextLine1Style: {
                display: "flex",
                flex:1, 
                paddingLeft: '2%',
                paddingRight: '2%',
                paddingTop: '1%',
                paddingBottom: '1%',
                width: "100%",
                marginTop: fontSizeOfScreenMainLine1/6,
                fontSize: fontSizeOfScreenMainLine1,
                lineHeight: fontSizeOfScreenMainLine1 + (fontSizeOfScreenMainLine1/20),//originall was 12, good for ios but android needs 20
                color: "black",
                backgroundColor: "white",
                textAlign: "left",
                flexWrap: "wrap"
              },
              screenLiveAnswerLineStyle: {
                position: "absolute",
                display: "flex",
                height: "auto",
                width: "100%",
                bottom: 0,
                marginTop: fontSizeOfScreenMainLine1/6,
                fontSize: fontSizeOfScreenLiveAnswerLine,
                lineHeight: fontSizeOfScreenLiveAnswerLine,// + (fontSizeOfScreenLiveAnswerLine/12),
                color: "gray",
                backgroundColor: "transparent",
                textAlign: "center",
                flexWrap: "wrap"
              },
              // midScreenMsgContainer: {
        
              // }
              midScreenMsgContainer: {
                flex: 1,
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent"
              },
              midScreenMessageTextReady: {
                fontSize: fontSizeOfScreenMainLine1,
                color: "black"
              },
              midScreenMessageTextSkinChangePrompts: {
                fontSize: fontSizeOfScreenMainLine1*0.7,
                color: "darkorange"
              },
              iconsContainer: {
                flex: 1,
                flexDirection: "row",
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                justifyContent: "space-between",
                alignItems: "flex-start",
                backgroundColor: "transparent",
                paddingLeft: 10,
                paddingRight: 10
              },
              iconsText: {
                fontSize: fontSizeOfScreenMainLine1*0.5,
                color: "gray"
              },
              buttonSmallsPanelContainer: {
                flexDirection: 'row',
                // flex: 1,
                height: '6%',
                backgroundColor: `${this.props.skinData.buttonSmallsColor}`,
            },
            thinStripContainer: {
                // position: 'absolute',
                // bottom: 0,
                // height: '2%',
                // flex:0.1,
                height: '2.5%',
                width: '100%',
                backgroundColor: 'blue'
            },
            memoryValuesContainer: {
                // flex: 0.3,
                height: '3.2%',
                flexDirection: "row",
            },
            memory1ValueContainer: {
                flex: 1,
                flexDirection: "row",
                paddingLeft: "3%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: `${this.props.skinData.memoryBoxesColor}` || '#000000',
                borderWidth: 0,
            },
            memory2ValueContainer: {
                flex: 1,
                flexDirection: "row",
                paddingRight: "3%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: `${this.props.skinData.memoryBoxesColor}`,
                borderWidth: 0,
                borderColor: "black"
            },
            memory1ValueTextStyle: {
                // alignItems: "center",
                fontSize: fontSizeOfMem1Value,
                backgroundColor: "transparent",
                lineHeight: fontSizeOfMem1Value*1.1
            },
            memory2ValueTextStyle: {
                // alignItems: "center",
                fontSize: fontSizeOfMem2Value,
                lineHeight: fontSizeOfMem2Value*1.1,                
                backgroundColor: "transparent"
            },
            memoryContentActive: {
                color: "white"
            },
            memoryContentInActive: {
                color: "darkgray"
            },
            line1Portions1and3Active: {
                color: 'black',
            },
            line1Portions1and3InActive: {
                color: 'darkgray',
            },
            line1PortionPercentActive: {
                color: 'rgb(244, 104, 65)',
            },
            line1PortionPercentInActive: {
                color: 'rgba(244, 104, 65, 0.4)',
            },
            line1PortionAnswerBlack: {
                color: 'black',
                lineHeight: fontSizeOfScreenMainLine1 + (fontSizeOfScreenMainLine1/5),
            },
            line1PortionAnswerGreen: {
                color: 'green',
                lineHeight: fontSizeOfScreenMainLine1 + (fontSizeOfScreenMainLine1/5),
            },
            line1PortionAnswerRed: {
                color: 'red',
                lineHeight: fontSizeOfScreenMainLine1 + (fontSizeOfScreenMainLine1/5),
            },

                
        })





    //change midscreen message style accordin to message content

    let midScreenMessageStyle;
    if(screenMidScreenMessage == 'Ready') {
      midScreenMessageStyle = styles.midScreenMessageTextReady
    }
    else {//skin change propmts
      midScreenMessageStyle = styles.midScreenMessageTextSkinChangePrompts
    }






    let memory1ValueTextStyle, memory2ValueText;
    //make the correct mmory box turn into color of active box
    if(this.props.currentActiveMemory === 1) {//memory1 is active
        memory1ValueText = [styles.memory1ValueTextStyle, styles.memoryContentActive]
        memory2ValueText = [styles.memory2ValueTextStyle, styles.memoryContentInActive]
    }
    else {//memory2 is active
        memory1ValueText = [styles.memory1ValueTextStyle, styles.memoryContentInActive]
        memory2ValueText = [styles.memory2ValueTextStyle, styles.memoryContentActive]
    }


    //portion1 is portion beore the [ bracket
    //portion2 is portion from [ to ] brackets
    //portion3 is portion after the ] bracket
    //portionAnswer is portion with segment that has '=' sign. the answer
    //is contained within this 1 segment
    //portionNoten is the segment after the = segment is the note segment, which may or
    //may not exist.


    ///SPLIT SEGMENTS ARRAY INTO PORTIONS OF CALCULTIONS.
    //SCREENMAINLINE1 STILL EXISTS, CAN STILL BE DISPLAYED AS
    //1 COMBINED LINE, BUT WE USE MIRROR LINE HERE TO SPLIT 
    //CALCULATION INTO PORTIONS FOR COLORING PURPOSES
    let mirrorScreenMainLine1Object = helpers.splitScreenMainTextLine1IntoConstituents(segmentsArray)
    console.log('RESULT OBJECT IS ', mirrorScreenMainLine1Object)


    
    //insert thousands separators into each portion, because these portions
    //come from segments array, not screenmainline1, so separators
    //not yet inserted
   
    ///TO COMMENT OUT OR NOT?
    // mirrorScreenMainLine1Object.portion1 = helpers.insertThousandsSeparatorsForOneSingleNumberString(mirrorScreenMainLine1Object.portion1)
    // mirrorScreenMainLine1Object.portion2 = helpers.insertThousandsSeparatorsForOneSingleNumberString(mirrorScreenMainLine1Object.portion2)
    // mirrorScreenMainLine1Object.portion3 = helpers.insertThousandsSeparatorsForOneSingleNumberString(mirrorScreenMainLine1Object.portion3)
    // mirrorScreenMainLine1Object.portionAnswer = helpers.insertThousandsSeparatorsForOneSingleNumberString(mirrorScreenMainLine1Object.portionAnswer)


    //REPLACE SQUARE BRACKET IN PORTION2, THE PERCENT PORTION WITH
    //ROUND BRACKETS
    mirrorScreenMainLine1Object.portion2 = mirrorScreenMainLine1Object.portion2.replace('[', '(')
    mirrorScreenMainLine1Object.portion2 = mirrorScreenMainLine1Object.portion2.replace(']', ')')
 

    let portion1Style, portion2Style, portion3Style, portionAnswerStyle;
    
    // if answer exists
    if( mirrorScreenMainLine1Object.portionAnswer && mirrorScreenMainLine1Object.portionAnswer.length > 0) {
        portion1Style = [styles.screenMainTextLine1Style, styles.line1Portions1and3InActive ]
        portion3Style = [styles.screenMainTextLine1Style, styles.line1Portions1and3InActive ]
        portion2Style = [styles.screenMainTextLine1Style, styles.line1PortionPercentInActive ]
    } 
    else{//answer not exist, so portionns are active
        portion1Style = [styles.screenMainTextLine1Style, styles.line1Portions1and3Active ]
        portion3Style = [styles.screenMainTextLine1Style, styles.line1Portions1and3Active ]
        portion2Style = [styles.screenMainTextLine1Style, styles.line1PortionPercentActive ]
 
    }
    
    ///answer style is always black, unless it is % change
    portionAnswerStyle = [styles.screenMainTextLine1Style, styles.line1PortionAnswerBlack ]

    //if it it is %change, then change color of answer
    if(/increase/i.test(mirrorScreenMainLine1Object.portionAnswer)) {//means %change increase
        portionAnswerStyle = [styles.screenMainTextLine1Style, styles.line1PortionAnswerGreen]
    }
    if(/decrease/i.test(mirrorScreenMainLine1Object.portionAnswer)) {//means %change decrease
        portionAnswerStyle = [styles.screenMainTextLine1Style, styles.line1PortionAnswerRed]
    }

        return(
            <View style={styles.wholeKeypadContainer}>


            {/* newly added screen */}
            {/* ref={ ref => this.refID = ref} */}
            <View style={styles.screen}>
                <Text style={{backgroundColor: 'white', paddingLeft:'2%', paddingRight: '2%', paddingTop: '3%'}}>
                    <Text style={portion1Style}>{mirrorScreenMainLine1Object.portion1}</Text>
                    <Text style={portion2Style}>{mirrorScreenMainLine1Object.portion2}</Text>
                    <Text style={portion3Style}>{mirrorScreenMainLine1Object.portion3}</Text>
                    <Text style={portionAnswerStyle}>{mirrorScreenMainLine1Object.portionAnswer}</Text>
                </Text>
                <View style={styles.midScreenMsgContainer}>
                    <Text style={midScreenMessageStyle}>{screenMidScreenMessage}</Text>
                </View>
                <IconCurrencySign/>
                <IconDeciPoints/>
                <Text style={[styles.screenLiveAnswerLineStyle]}>{screenLiveAnswerLine}</Text>
            </View>
            {/* ORIGINAL <View style={styles.screen}>
                <Text style={styles.screenMainTextLine1Style}>{screenMainTextLine1}</Text>
                <Text style={styles.screenLiveAnswerLineStyle}>{screenLiveAnswerLine}</Text>
                <View style={styles.midScreenMsgContainer}>
                    <Text style={midScreenMessageStyle}>{screenMidScreenMessage}</Text>
                </View>
                <IconCurrencySign/>
                <IconDeciPoints/>
            </View> */}





            <View style={styles.memoryValuesContainer}>
                <TouchableOpacity style={styles.memory1ValueContainer} onPress={() => {this.handleMemoryValuePress(1)}}>
                    <Text style={memory1ValueText}> {mem1ValueWithSeparators}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.memory2ValueContainer} onPress={() => {this.handleMemoryValuePress(2)}}>
                    <Text style={memory2ValueText}> {mem2ValueWithSeparators}</Text>
                </TouchableOpacity>
            </View>
                 
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

                {
                    this.props.showButtonSmallsPanelStatus ? (
                    <View style={styles.buttonSmallsPanelContainer}>
                        <ButtonSmallSkin/>
                        <ButtonSmallAbout/>
                        <ButtonSmallTape/>
                    </View>
                    ): (
                        <TouchableOpacity onPress={this.thinStripClicked} style={styles.thinStripContainer}><Text></Text></TouchableOpacity>
                    )
                }

            </View>
        )
    }
}


const mapStateToProps = (state) => ({
    screenMainTextLine1: state.calculatorStateData.screenMainTextLine1,


    screenLiveAnswerLine: state.calculatorStateData.screenLiveAnswerLine,
    screenMidScreenMessage: state.calculatorStateData.screenMidScreenMessage,
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    currentCurrency: state.currency.currentCurrency,
    currentNumberOfDeciPoints: state.deciPoints.currentNumberOfDeciPoints,
  


    showButtonSmallsPanelStatus: state.buttonSmallsPanel.showButtonSmallsPanelStatus,
    showTapeStatus: state.tape.showTapeStatus,
    skinSelectionModeActiveStatus: state.skinData.skinSelectionModeActiveStatus || false,
    skinData: state.skinData,
    showAboutPageStatus: state.aboutPage.showAboutPageStatus,



    memory1Value: state.memory.memoryData.memory1Value,
    memory2Value: state.memory.memoryData.memory2Value,
    currentActiveMemory: state.memory.memoryData.currentActiveMemory,
    // skinData: state.skinData
})

export default connect(mapStateToProps)(Keypad)