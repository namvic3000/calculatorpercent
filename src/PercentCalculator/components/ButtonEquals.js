import React from 'react'
import { AsyncStorage,Button, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'
import {addRecordToTape} from '../../../actions/tapeActions'
import { updateSkinData } from "../../../actions/skinDataActions";



class ButtonEquals extends React.Component {

    constructor() {
        super()
        //some how, if we leave this binding out, there will be an error: this.handleCalcButtonCliced 
        //is not a function. shouldnt need this line but will error without it. we do 
        //the constructor function just to do this. weird.
        this.handleCalcButtonClicked = this.handleCalcButtonClicked.bind(this)
    }




    handleCalcButtonClicked = (buttonValue) => {


        ////check if in skinn color selection mode, if so, indicate that
        //that component to chage is keysSet1
        if(this.props.skinData.skinSelectionModeActiveStatus) {
            //component to chanage is keyset1

            //leave everything same, except set keys to change to keysset1
            //and showcolorpicker to true.
            let dataObject = {
                showColorPickerStatus: true,//show color picker now
                skinSelectionModeActiveStatus: this.props.skinData.skinSelectionModeActiveStatus,
                currentComponentSkinToBeChanged: 'keysSet2',
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
            let screenMidScreenMessage = "set the color"
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



        
        let {segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots} = this.props 

        let allowToTakeSnapShotOfState = true
        
        let emptyScreenMainLine = (segmentsArray || []).length <= 0



        
        //ignore key if screen is empty, alert user to enter a number first
        if(emptyScreenMainLine) {
            // alert('Enter a Number First')
            return//dont process below code
        }




        //if previous calculation has been completed, and the answer has been
        //presented
        //check for '=' sign to tell if answer been presented
        
        if(/\=/.test(segmentsArray[currentSegmentIndex].stringValue)) {
            // console.log('******THERE IS = SIGN IN CURRENT SEGMENT, SO WILLL CLEARALL')
             
            //if annswer been presented, and =sign again pressed, no action
            
            return //dont process below code
            
        }




        //clear any trailing decimal point if exist, every time press on 
        //arith operator or percent operator or close bracket
        helpers.cleanUpAllTrailingDeciPoints(segmentsArray)


    
     //console.log('AT EQUALSBUTON START: SCREENLIVEANSWER IS: ' + this.props.screenLiveAnswerLine)
        
        //get result of whole calculation
        let answer = helpers.calculateResultOfWholeCalculation(helpers.collateStringsIntoOneString(segmentsArray))//this.props.screenLiveAnswerLine//gets number only, no extra details text
        
        //truncate decipooints
        answer = helpers.truncateDecimalPlacesOfString(answer, this.props.currentNumberOfDeciPoints)
        //dont insert thousand separators because this is the reeal string, not 
        //user mirror string for user to see only
        


        ////MUST ADD EXTRA DETAILS BEFORE ADDING SEPARATORS. WONT WORK IF HAVE
        //SEPARATORS IN THE STRING TO PASS TO ADDEXTRADETAILS
        ///add extra details
        //now add the extra text details to the result, e.g '% change' 
        // , result is e.g 255 , we add %sign and 'increase' in, becomes 255% (increase)
        //this method requires answer string, and whole calculation tring
        answer = helpers.addExtraDetailsTextToAnswer(answer, helpers.collateStringsIntoOneString(segmentsArray))


        //add thousand separators
        answer = helpers.insertThousandsSeparatorsForOneSingleNumberString(answer)

        //add extra details, e.g 'originally was' or '%' to the answer
        // answer = helpers.addExtraDetailsTextToAnswer(answer, helpers.collateStringsIntoOneString(segmentsArray))
        
        //add currency symbol if it is a quantity amount, not a percentage
        answer = helpers.addCurrencySymbolToAnswerIfAppropriate(answer, helpers.collateStringsIntoOneString(segmentsArray), this.props.currentCurrency)
         

        //add whole answer with extra details e.g 'origiallly was' 
        //as a segment to segments array, so a segment of
        //the array, and therefore is now included in the whole calculaton stirng.
        currentSegmentIndex++//move forward 1 spot
        segmentsArray[currentSegmentIndex] = {}//create object
        segmentsArray[currentSegmentIndex].stringValue = '\n=\u00A0' + answer





        
     //console.log('AT EQUALS BUTTON: AFTER ADDED ANSWER TO SEGMENTS ARRAY, SEGMENTS ARRAY IS NOW: ', segmentsArray)

        //save to timemachine
        if(allowToTakeSnapShotOfState) {
            //take a snapshot and return
            timeMachineArrayOfSegmentsArraySnapShots = helpers.takeASnapShotOfCurrentCalculationState(segmentsArray, timeMachineArrayOfSegmentsArraySnapShots)
        }
        

        //before saving array to tape, add separators for each segment

        //get a copy so wont point to and alter the original array
        let tempArr = JSON.parse(JSON.stringify(segmentsArray))

        //at Screen.js,, will insert separators to display, real segments
        //array has no separators inserted.

        //add separators to each segment, before savving to tape
        for(let i = 0; i <= tempArr.length - 2; i++) {//dont do the last segment which is the answer
            tempArr[i].stringValue = helpers.insertThousandsSeparatorsForOneSingleNumberString(tempArr[i].stringValue)
        }
         
        //save the finished calculation, ie the whole segments array which holds the 
        //one whole calculation

        // let wholeCalculationString = 
        this.props.dispatch(addRecordToTape(tempArr))

  

        
        //collate stirng from all segments and update store
        let screenMainTextLine1 = ""//WILL GET REFILLED AT SCREEN.JS 
        let screenLiveAnswerLine = ""//WILL GET REFILLED AT SCREEN.JS 
        let screenMidScreenMessage = ''
        
        // console.log('EQUALS BUTTON: PAYLOAD TO SEND TO REDUCER IS' + screenMainTextLine1)
        this.props.dispatch(updateCalculatorData(
            screenMainTextLine1,
            screenLiveAnswerLine,
            screenMidScreenMessage,
            segmentsArray, 
            currentSegmentIndex, 
            timeMachineArrayOfSegmentsArraySnapShots
        ))

    }//handleclick





    render() {

        let standardButtonWidth = Dimensions.get('window').width/5

        let fontSizeOfStandardButton = standardButtonWidth/2.8


        let styles = StyleSheet.create({
            standardButtonContainer: {
                //container for each individual button
                flex: 1,//each button has equal width, because the flexdir is now 'row'
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: `${this.props.skinData.keysSet2Color}`,
                borderWidth: 0,
                height: "100%",
            },
            calcButtonTextForEquals: {
                fontSize: fontSizeOfStandardButton*1.2,
                color: "white",
            },
        })



        return(
            <TouchableOpacity style={styles.standardButtonContainer} onPress={()=> {this.handleCalcButtonClicked("=")}}>
                <Text style={styles.calcButtonTextForEquals}>=</Text>
            </TouchableOpacity>
        )
    }

}




const mapStateToProps = (state) => ({
    screenLiveAnswerLine: state.calculatorStateData.screenLiveAnswerLine,
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    timeMachineArrayOfSegmentsArraySnapShots: state.calculatorStateData.timeMachineArrayOfSegmentsArraySnapShots,
    arrayOfRecords: state.tape.arrayOfRecords,
    skinData: state.skinData,
    currentCurrency: state.currency.currentCurrency,
    currentNumberOfDeciPoints: state.deciPoints.currentNumberOfDeciPoints

})


export default connect(mapStateToProps)(ButtonEquals)






