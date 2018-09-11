import React from 'react'
import {Dimensions ,StyleSheet,TouchableOpacity, Text } from 'react-native'
import {  connect } from "react-redux";
import * as helpers from '../helpers'
import {updateCalculatorData} from '../../../actions/calculatorDataActions'


class IconSwitchOperands extends React.Component {



    handleClick = () => {
 
        //if gets here, icon already displayed and vetted, so
        //when gets here, calculation format is either
        //has full set of square brackets, ie
        //23 x [22% of 222] ...  or [22% of 222] x 2 
        //or a pure percent calculation eg 23% of 222

        let {segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots} = this.props


        let wholeString = helpers.collateStringsIntoOneString(segmentsArray)
     //console.log('WHOLESTRING IS: ' , wholeString)
    
        //see if has a percent calculation, 
        let stringHasPercentCalculationFlag = /(out|of|add|deduct|after|to|is)/.test(wholeString)
     
        // console.log('STRING HAS PERCENT CALCULAION FLAG IS : ' , stringHasPercentCalculationFlag)
        
        let stringHasOpenSquareBracketFlag = /\[/.test(wholeString)
        // console.log('STRING HAS OPEN SQUARE BRACKET [ FLAG IS : ' + stringHasOpenSquareBracketFlag)
        
        let stringHasCloseSquareBracketFlag = /\]/.test(wholeString)
        // console.log('STRING HAS CLOSE SQUARE BRACKET ] FLAG IS : ' + stringHasCloseSquareBracketFlag)
        
        let indexOfOpenSquareBracket = wholeString.search(/\[/)// -1 if not found
            
        let indexOfCloseSquareBracket = wholeString.search(/\]/)// -1 if not found
            





        //get index of segment with open square bracket
        let percentPortionSegmentsArray;
        let indexOfSegmentWithOpenSquareBracket = -1
        let indexOfSegmentWithCloseSquareBracket = -1
        let indexOfOpenSquareBracketCharWithinSegment = -1
        let indexOfCloseSquareBracketCharWithinSegment = -1
        let indexOfSegmentWithPercentOperator = -1




        segmentsArray.forEach( (segment, index) => {
            // console.log('INSIDE LOOP, SEGMNT.STRINGVALUE IS:', segment.stringValue)
            //see if has open square bracket
            if(/\[/.test(segment.stringValue)) {
                // console.log('FOUND OPEN SQUARE BRACKET')
                indexOfSegmentWithOpenSquareBracket = index 
                indexOfOpenSquareBracketCharWithinSegment = segment.stringValue.search(/\[/)
            }
            //see if has close square bracket
            if(/\]/.test(segment.stringValue)) {
                // console.log('FOUND CLOSE SQUARE BRACKET')
                indexOfSegmentWithCloseSquareBracket = index 
                indexOfCloseSquareBracketCharWithinSegment = segment.stringValue.search(/\]/)
            }

            //segment that has percent operator, evenif multiple
            //words, e.g after deducted, the percent operarot is just 1 segment
            if(/(out|of|add|deduct|to|after|is)/.test(segment.stringValue)) {
                indexOfSegmentWithPercentOperator = index 
            }

        })


     //console.log('BEFORE ALTERING: IDEX OF SEGMENT WITH OPEN AND CLOSE, AND OPERAND ARE: ' ,indexOfSegmentWithOpenSquareBracket , indexOfSegmentWithCloseSquareBracket , indexOfSegmentWithPercentOperator)

     //console.log('INDEX OF [ CHAR AND ] CHAR WITHIN THEIR SEGMENT ARE: ' ,indexOfOpenSquareBracketCharWithinSegment , indexOfCloseSquareBracketCharWithinSegment)


        //if is a pure percent calulatin, then has no open or close
        //square bracket, process accordigly
        if( ! stringHasOpenSquareBracketFlag){
            //if gets here, it is a pure percent calculation, no 
            //square brackets

         //console.log('NO OPEN OR CLOSE SQUARE BRACKET, PURE PERCENT CALCULATION')
            indexOfSegmentWithOpenSquareBracket = 0
            indexOfSegmentWithCloseSquareBracket = segmentsArray.length-1//last
            indexOfOpenSquareBracketCharWithinSegment = -1//so +1 will bring it to 0
            indexOfCloseSquareBracketCharWithinSegment = segmentsArray[indexOfSegmentWithCloseSquareBracket].stringValue.length


         //console.log('IDEX OF SEGMENT WITH OPEN AND CLOSE, AND OPERAND ARE: ' ,indexOfSegmentWithOpenSquareBracket, indexOfSegmentWithCloseSquareBracket, indexOfSegmentWithPercentOperator)
                    
        }

 

        //get the opeand1 and opand2 segments
        //note that orignal array is not changed
        let operand1SegmentsArray = segmentsArray.slice(indexOfSegmentWithOpenSquareBracket, indexOfSegmentWithPercentOperator)
        
        let operand2SegmentsArray = segmentsArray.slice(indexOfSegmentWithPercentOperator+1, indexOfSegmentWithCloseSquareBracket+1)
   


     //console.log('OPEAND1 SEGMENTS ARRAY IS ', operand1SegmentsArray)
     //console.log('OPEAND2 SEGMENTS ARRAY IS ', operand2SegmentsArray)

 
        //now record if opand1 and 2 have percent or currency signs
        let tempStr = helpers.collateStringsIntoOneString(operand1SegmentsArray)
        
        let operand1HasPercentSignFlag = /%/.test(tempStr)
     //console.log('OPAND1 HAS PERCENTSIGN FLAG IS: ' + operand1HasPercentSignFlag)
        let operand1HasCurrencySignFlag = /\$|£|€|¥/.test(tempStr)
     //console.log('OPAND1 HAS CURRENCY FLAG IS: ' + operand1HasCurrencySignFlag)
        let operand1HasIsTextFlag = /is/.test(tempStr)
     //console.log('OPAND1 HAS IS TEXT FLAG IS: ' + operand1HasIsTextFlag)
        let operand1HasFromTextFlag = /from/.test(tempStr)
     //console.log('OPAND1 HAS FROM TEXT FLAG IS: ' + operand1HasFromTextFlag)
        let operand1HasIfTextFlag = /if/.test(tempStr)
     //console.log('OPAND1 HAS FROM TEXT FLAG IS: ' + operand1HasIfTextFlag)


        //NOW FOR OPAND2
        tempStr = helpers.collateStringsIntoOneString(operand2SegmentsArray)
        
        let operand2HasPercentSignFlag = /%/.test(tempStr)
     //console.log('OPAND2 HAS PERCENTSIGN FLAG IS: ' + operand2HasPercentSignFlag)
        let operand2HasCurrencySignFlag = /\$|£|€|¥/.test(tempStr)
     //console.log('OPAND2 HAS CURRENCY FLAG IS: ' + operand2HasCurrencySignFlag)
        






        //get the portion prior to and including the open [  bracket
        //within the first segment
        //eg get the ([ before the [ , include the [
        let portion1OfFirstSegment = operand1SegmentsArray[0].stringValue.slice(0,indexOfOpenSquareBracketCharWithinSegment+1)//includes [bracket
        
        //now remove this portion from opeand1 first segment
        operand1SegmentsArray[0].stringValue = operand1SegmentsArray[0].stringValue.slice(indexOfOpenSquareBracketCharWithinSegment+1)//rest of segment 0
        
        
        
        //get the closing ]) portion from opand2,
        // include the close bracket ]
        let portion2OfLastSegment = operand2SegmentsArray[operand2SegmentsArray.length -1].stringValue.slice(indexOfCloseSquareBracketCharWithinSegment)
        
        //now remove this last portion from opeand2
        operand2SegmentsArray[operand2SegmentsArray.length -1].stringValue = operand2SegmentsArray[operand2SegmentsArray.length -1].stringValue.slice(0,indexOfCloseSquareBracketCharWithinSegment)
     //console.log('OPEAND2SEGMENTS ARRAY IS:',operand2SegmentsArray)



        //now remove all currency and % sign from both operand1 and 2,
        //ready to be switched, these will be re-added after the switch
        operand1SegmentsArray.forEach( segment => {
            segment.stringValue = segment.stringValue.replace(/\$|£|€|¥|%/g, '')
        })
        //now for opand2
        operand2SegmentsArray.forEach( segment => {
            segment.stringValue = segment.stringValue.replace(/\$|£|€|¥|%/g, '')
        })


        //now remove the 'is' and 'from' and 'if' in [is xxx after deducted .....
        //or [from xxx to xxx]
        operand1SegmentsArray.forEach( segment => {
            segment.stringValue = segment.stringValue.replace(/is|from|if/, '')
        })



        //now switch the 2 operand segmentarrays
        let tempArr = JSON.parse(JSON.stringify(operand1SegmentsArray))
        let switchedOperand1SegmentsArray = JSON.parse(JSON.stringify(operand2SegmentsArray))
        let switchedOperand2SegmentsArray = tempArr



        //now re-add the % and currency signs for opand1 if exists
        if(operand1HasPercentSignFlag) {
            switchedOperand1SegmentsArray[switchedOperand1SegmentsArray.length-1].stringValue += '%'
         //console.log('AFTER RE-ADD % SIGN, OPAND1ARRAY IS ',switchedOperand1SegmentsArray)
        }



        //readd currency sign, to every numeral, since we can only
        //guess, as user may have [$23 add (5 x 2)%] , we can only
        //guess that it is ($5 x $2) add 23%
        if(operand1HasCurrencySignFlag) {
            switchedOperand1SegmentsArray.forEach( segment => {
                let indexOfFirstNumeral = segment.stringValue.search(/[0-9]|-/)
                //insert currency sign
                if(indexOfFirstNumeral >= 0) {
                    if(segment.stringValue[indexOfFirstNumeral] !== '-') {
                        //is a numeral, not a '-' sign, so ok to add in front of numeral
                        segment.stringValue = this.props.currentCurrency + segment.stringValue.slice(indexOfFirstNumeral)
                    }
                    else {//is a -sign, so add currency after -sign
                        segment.stringValue = segment.stringValue.slice(0,indexOfFirstNumeral+1)//includes - sign
                         + this.props.currentCurrency + segment.stringValue.slice(indexOfFirstNumeral+1)
                    }
                }
            })
         //console.log('AFTER RE-ADD CURRENCY, OPAND1ARRAY IS ',switchedOperand1SegmentsArray)
        }



        //if opand1 has 'is' then re-add the 'is'
        if(operand1HasIsTextFlag) {
            switchedOperand1SegmentsArray[0].stringValue = 'is ' + 
                switchedOperand1SegmentsArray[0].stringValue
            //bug fix, a space is added after 'from' each time 'from ' is added,
            //and accumulates, so remove multiple occurences, replace with 1 space
            switchedOperand1SegmentsArray[0].stringValue = switchedOperand1SegmentsArray[0].stringValue.replace(/ +/g, ' ')
         //console.log('AFTER RE-ADD IS WORD, OPAND1ARRAY IS ',switchedOperand1SegmentsArray)
        }



        //if opand1 has 'from' then re-add the 'from'
        if(operand1HasFromTextFlag) {
            switchedOperand1SegmentsArray[0].stringValue = 'from ' + 
                switchedOperand1SegmentsArray[0].stringValue
            //bug fix, a space is added after 'from' each time 'from ' is added,
            //and accumulates, so remove multiple occurences, replace with 1 space
            switchedOperand1SegmentsArray[0].stringValue = switchedOperand1SegmentsArray[0].stringValue.replace(/ +/g, ' ')
         //console.log('AFTER RE-ADD FROM WORD, OPAND1ARRAY IS ',switchedOperand1SegmentsArray)
        }



        //if opand1 has 'if' then re-add the 'if'
        if(operand1HasIfTextFlag) {
            switchedOperand1SegmentsArray[0].stringValue = 'if ' + 
                switchedOperand1SegmentsArray[0].stringValue
            //bug fix, a space is added after 'from' each time 'from ' is added,
            //and accumulates, so remove multiple occurences, replace with 1 space
            switchedOperand1SegmentsArray[0].stringValue = switchedOperand1SegmentsArray[0].stringValue.replace(/ +/g, ' ')
         //console.log('AFTER RE-ADD IF WORD, OPAND1ARRAY IS ',switchedOperand1SegmentsArray)
        }



        //bug fix, a space is added after 'from' each time 'from ' is added,
        //and accumulates, so remove multiple occurences, replace with 1 space
        switchedOperand1SegmentsArray[0].stringValue = switchedOperand1SegmentsArray[0].stringValue.replace(/ +/g, ' ')



        //now readd the first portion ([ to operand1
        switchedOperand1SegmentsArray[0].stringValue = portion1OfFirstSegment + 
                    switchedOperand1SegmentsArray[0].stringValue



        //now do the same for opand2

        //now re-add the % and currency signs for opand2 if exists
        if(operand2HasPercentSignFlag) {
            switchedOperand2SegmentsArray[switchedOperand2SegmentsArray.length-1].stringValue += '%'
        }

        //readd currency sign, to every numeral, since we can only
        //guess, as user may have [$23 add (5 x 2)%] , we can only
        //guess that it is ($5 x $2) add 23%
        if(operand2HasCurrencySignFlag) {
            switchedOperand2SegmentsArray.forEach( segment => {
                let indexOfFirstNumeral = segment.stringValue.search(/[0-9]/)
                //insert currency sign
                if(indexOfFirstNumeral >= 0) {
                    segment.stringValue = segment.stringValue.slice(0,indexOfFirstNumeral) + this.props.currentCurrency + segment.stringValue.slice(indexOfFirstNumeral)
                }
            })
        }


        //bug fix, a space is added after 'from' each time 'from ' is added,
        //and accumulates, so remove multiple occurences, replace with 1 space
        //after switching,there is a space before the operand2 segment 0,
        //so remove it, it is from transfering from operand1
        switchedOperand2SegmentsArray[0].stringValue = switchedOperand2SegmentsArray[0].stringValue.replace(/ +/g, '')



        //now re-add the last portion ]) to operand2
        switchedOperand2SegmentsArray[switchedOperand2SegmentsArray.length-1].stringValue += portion2OfLastSegment






        //get copy of segmentsarray to work with
        let copySegmentsArray = JSON.parse(JSON.stringify(segmentsArray))
        

        //now replace opeand1 with opand2
        copySegmentsArray.splice(indexOfSegmentWithOpenSquareBracket,operand1SegmentsArray.length, ...switchedOperand1SegmentsArray)

                





        //now replace opand2 with oopand1,
        //need to update indexes, coz after rplaced opand1 
        //, indexes of segment with close ] bracket and with
        //percent operator have changed

        copySegmentsArray.forEach( (segment, index) => {

            //segment that has percent operator, evenif multiple
            //words, e.g after deducted, the percent operarot is just 1 segment
            if(/(out|of|add|deduct|to|after|is)/.test(segment.stringValue)) {
                indexOfSegmentWithPercentOperator = index 
            }

        })

 

        //now replace opand2 with opand1
        copySegmentsArray.splice(indexOfSegmentWithPercentOperator+1, operand2SegmentsArray.length, ...switchedOperand2SegmentsArray)
     //console.log('AFTER REPLACING OPERAN2 WITH OPAND2, WHOLE ARRAY IS ',copySegmentsArray)


        //copy back to real segments array
        segmentsArray = JSON.parse(JSON.stringify(copySegmentsArray))


        ///save to store which will update state

        //save to timemachine
        // if(allowToTakeSnapShotOfState) {
        //     //take a snapshot and return
        // timeMachineArrayOfSegmentsArraySnapShots = helpers.takeASnapShotOfCurrentCalculationState(segmentsArray, timeMachineArrayOfSegmentsArraySnapShots)
        // }
        
         //collate stirng from all segments and update store
         let screenMainTextLine1 = helpers.collateStringsIntoOneString(segmentsArray)
         let screenLiveAnswerLine = helpers.calculateResultOfWholeCalculation(screenMainTextLine1) 
         let screenMidScreenMessage = ''
         
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


        let tabletScaleFactor = 1
        
        if(Dimensions.get('window').width >= 768 ) {
            tabletScaleFactor = 0.75
        }



        


        let styles = StyleSheet.create({
            container: {
                position:'absolute',
                zIndex: 1000,//so it is above the liveanswerview and can receive touch
                bottom: '12%',
                right: '1.5%',
                backgroundColor: 'transparent',
                height: '10%',
                width: '50%',
            },
            iconText: {
                color: 'rgb(2, 14, 255)',//'rgb(244, 77, 65)',//'darkorange',
                fontSize: Dimensions.get('window').width * 0.045 * tabletScaleFactor,
                textAlign: 'right'
            }
        })



                
        


        return(
            
                this.props.showSwitchOperandsIconStatus ? (
                    <TouchableOpacity style={styles.container} onPress={this.handleClick}>
                        <Text style={styles.iconText}>switch</Text>
                    </TouchableOpacity>
                ): (
                    null
                )
        )
    }
}

 


const mapStateToProps = (state) => ({
    showSwitchOperandsIconStatus: state.switchOperands.showSwitchOperandsIconStatus,
    segmentsArray: state.calculatorStateData.segmentsArray,
    currentSegmentIndex: state.calculatorStateData.currentSegmentIndex,
    currentCurrency: state.currency.currentCurrency,
    timeMachineArrayOfSegmentsArraySnapShots: state.calculatorStateData.timeMachineArrayOfSegmentsArraySnapShots
})


export default connect(mapStateToProps)(IconSwitchOperands)





