import React from 'react'
import { View, Text , StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import  {updateMemoryData} from "../../../actions/memoryActions"
import * as helpers from "../helpers"
import {MAX_NUMBER_LIMIT, MIN_NUMBER_LIMIT} from '../config'
import { updateSkinData } from "../../../actions/skinDataActions"
import { updateCalculatorData } from "../../../actions/calculatorDataActions"








class ButtonMemPlus extends React.Component {

 
    handleCalcButtonClicked = () => {
       


        ////check if in skinn color selection mode, if so, indicate that
        //that component to chage is keysSet1
        if(this.props.skinData.skinSelectionModeActiveStatus) {
            //component to chanage is keyset1

            //leave everything same, except set keys to change to keysset1
            //and showcolorpicker to true.
            let dataObject = {
                showColorPickerStatus: true,//show color picker now
                skinSelectionModeActiveStatus: this.props.skinData.skinSelectionModeActiveStatus,
                currentComponentSkinToBeChanged: 'memoryButtonsColor',
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



        let {segmentsArray, currentSegmentIndex} = this.props 

        let emptyScreenMainLine = (segmentsArray || []).length <= 0
        
        //ignore key if screen is empty, alert user to enter a number first
        if(emptyScreenMainLine) {
            return//dont process below code
        }
                

        
    //console.log('MEMORYPLUS PRESSED')

        //get value of number of current segment if it is a number segment

        //get copy so wont alter original
        let tempStr = JSON.parse(JSON.stringify(segmentsArray[currentSegmentIndex].stringValue))
        
        //see if current segment is a number
        let isANumberSegment = /[0-9]+/g.test(tempStr)

        if(isANumberSegment) {
            //if has 'error' or 'invalid' or 'range' means error
            if(/error/i.test(tempStr)) {//checks for the 'Error: must be less than 100%' msg
            //which has 100% numeral in it, which would give 100
             //console.log('MEMPLUS: SEGMENT HAS ERROR, INVLAID, RANGE , TEXT')
                return//no action
            }

            //get the number
             
            //since answer segment has separators and extra details added, 
            //need to remove the alphas and separators
            tempStr = tempStr.replace(/[a-z]|\'|\,|\'|\)|\(|\=|\]|\[/ig,'')
            //these % and \n dont work in regex, so find them as a string 
            tempStr = tempStr.replace('%', '')
            tempStr = tempStr.replace('\n', '')
            //remove &nbsp; also
            tempStr = tempStr.replace('\u00A0','')
            //rmove white spae if any
            tempStr = tempStr.replace('\s', '')
            
            //rmove all spaces if any
            tempStr = tempStr.replace(/[ ]+/, '')

            //rmove all currency symbols if any
            tempStr = tempStr.replace(/[\$|£|¥|€]/g, '')
            

            
         //console.log('MEMPLUS: NUMBER EXTRACTED FROM SEGMENT IS: ', + tempStr)

            //now update store, with new memory data, react UI will auto update

            let memory1Value = this.props.memory1Value
            let memory2Value = this.props.memory2Value 
            let currentActiveMemory = this.props.currentActiveMemory

         //console.log('AT MEMPLUS: BEFORE CONVERT TO 0, MEM1 VLUE IS: ' + memory1Value)



            //if mem value is 'memory empty', make it a 0
            if(/empty/i.test(memory1Value)) {//if has 'memory empty', make value = 0
             //console.log('MEMPLLUS: MEMVALUE1 INSIDE IF')
                 memory1Value = 0
            }

            if(/empty/i.test(memory2Value)) {//if has 'memory empty',
             //console.log('MEMPLLUS: MEMVALUE2 INSIDE IF')
                 memory2Value = 0
            }



         //console.log('AT MEMPLUS: AFTER CONVERT TO 0, BEFORE ADDING MORE, MEM1 VLUE IS: ' + memory1Value)
            if(currentActiveMemory === 1) {

                //forward look to see if exceeds limit, if so dont add to memory
                if(((Number(memory1Value) + (Number(tempStr))) > MAX_NUMBER_LIMIT)//1000tr
                        || ((Number(memory1Value) + (Number(tempStr))) < MIN_NUMBER_LIMIT)) {//-100tr
                    alert('Exceeded Limit')
                    return//dont add to memory
                }

                //if gets here, means would be under limit

                memory1Value = Number(memory1Value) + (Number(tempStr))
                //truncate dediplaces and store, but dont insert separators because
                //want to store a pure number without seoparators or text
                memory1Value = helpers.truncateDecimalPlacesOfString(memory1Value, this.props.currentNumberOfDeciPoints)
                memory2Value = this.props.memory2Value
            }
            else {//memory2 is active

                //forward look to see if exceeds limit, if so dont add to memory
                if(((Number(memory2Value) + (Number(tempStr))) > MAX_NUMBER_LIMIT)//1000tr
                        || ((Number(memory2Value) + (Number(tempStr))) < MIN_NUMBER_LIMIT)) {//-100tr
                    alert('Exceeded Limit')
                    return//dont add to memory
                }
                

                memory1Value = this.props.memory1Value
                memory2Value = Number(memory2Value) + (Number(tempStr))
                //truncate dediplaces and store, but dont insert separators because
                //want to store a pure number without seoparators or text
                memory2Value = helpers.truncateDecimalPlacesOfString(memory2Value, this.props.currentNumberOfDeciPoints)

            }
 
         //console.log('AT MEMPLUS: AFTER ADDING MORE, MEM1 VLUE IS: ' + memory1Value)

            this.props.dispatch(updateMemoryData(memory1Value, memory2Value, currentActiveMemory))
        
        }
        else {
            //is an operator, cant store it, ignore
         //console.log('MEMPLUS: SEGGMENT IS NOT A NUMBER')
            return
        }
    }//handlecalcbuttonclick






    render() {


        let standardButtonWidth = Dimensions.get('window').width/5

        let fontSizeOfStandardButton = standardButtonWidth/2.8


        
        let isTabletDevice = Dimensions.get('window').width >= 768
        let tabletScaleFactor = 0.75
        
        if(isTabletDevice) {//table, so make font smaller
            fontSizeOfStandardButton *= tabletScaleFactor
        }
        


        let styles = StyleSheet.create( {
            container: {
                //flex 1 means each button in row has equal width, because flexdir is set as 'row'
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: "center",
                backgroundColor: `${this.props.skinData.memoryButtonsColor}`,
                borderWidth: 0,
                borderColor: "black",
                height: "100%",
            },
            buttonText:{
                fontSize: fontSizeOfStandardButton*0.65,
                color: "white",
            },
        })


        
                return(
                    <TouchableOpacity style={styles.container} onPress={this.handleCalcButtonClicked}>
                        <Text style={styles.buttonText}>M+</Text>
                    </TouchableOpacity>
                )
            }

        }



const mapStateToProps = (state) => ({
    memory1Value: state.memory.memoryData.memory1Value,
    memory2Value: state.memory.memoryData.memory2Value,
    currentActiveMemory: state.memory.memoryData.currentActiveMemory,
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    skinData: state.skinData,
    currentNumberOfDeciPoints: state.deciPoints.currentNumberOfDeciPoints
})




export default connect(mapStateToProps)(ButtonMemPlus)
