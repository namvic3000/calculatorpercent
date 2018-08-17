//GLOBAL VARS FOR THIS FILE

//data structure: 
// segmentsArray = [
//     { stringValue: String},
//     { stringValue: String},
//     { stringValue: String},
//     etc...
// ]
// 
// timeMachineArrayOfSegmentsArraySnapShots = [
//     { segmentsArray: [...segmentsArray] },
//     { segmentsArray: [...segmentsArray] },
//     { segmentsArray: [i.e {},{},] },
//     etc...
// ]


let segmentsArray = []///stores each segment of the mainscreenline1 string for 1 whole calculation.
let currentSegmentIndex = 0//initially points to 1st segment

let timeMachineArrayOfSegmentsArraySnapShots = [] //contains many segmentsArray's, each segmemtnsArray is
//a snapshot after each key  is pressed. for the backspace key so user can go back to prev steps.


//segmentsArray is :
//e.g 88.2 x 55% of 250 + 100
//segmentsArray element[0] is 88.2
//segmentsArray[1] is x
//segmentsArray[2] is 55
//segmentsArray[3] is % of
//segmentsArray[4] is 250
//segmentsArray[5] is +
//segmentsArray[6] is 100

// //each element is an object {
    //stringValue:
// }




export const updateScreenWithNewInput = (newKeyInput) => {
    
    console.log('***AT START OF LOGIC, UPDATE WITH NEW INPUT, INDEXPOINTER IS ' + currentSegmentIndex)
    console.log('***AT START OF LOGIC, UPDATE WITH NEW INPUT, KEY PASSED IN IS  ' + newKeyInput)


    if( ! /([0-9]|\.)/.test(newKeyInput)) {
        cleanUpAllTrailingDeciPoints()
   }

        
    let objectToReturn = {}

    // detect if newkeyinput is a number
    let newKeyInputIsANumber = /[0-9]/.test(newKeyInput)//returns a boolean
    


    //if empty operands
    //if array is empty, screen main text line is empty, segments array is empty
    if(segmentsArray.length <=0) {//empty array, first key input
        objectToReturn = processInputWhenEmptyScreenMainTextLines(newKeyInput)
        return objectToReturn
    }
    
 
    // console.log('AT POINT 100, SEGMNTARRAY IS ',segmentsArray)
    // console.log('AT POINT 100, CURRENTSEGMNTINDEX IS ',currentSegmentIndex)
    
     

    //if gets here, segments array is not empty


    //check if ca button is pressed, if so clearall
    if(newKeyInput === 'ca') {//clearall button
        return clearAllReadyForNextCalculation()//returns the object returned
    }



    //if button is 0-9
    if(/[0-9]/.test(newKeyInput)) {//0-9 button
        objectToReturn = processInputFor0To9Keys(newKeyInput)
        return objectToReturn
    }//if <-



    //if button is +-x÷ arith buttons
    if(newKeyInput === '+' || newKeyInput === '-' ||
        newKeyInput === 'x' || newKeyInput === '÷') {//if + - x ÷
        
        objectToReturn = processInputFor4ArithmeticKeys(newKeyInput)
        return objectToReturn
    }



    //if key is -sign
    if(newKeyInput == '+-') {// +- neg sign operator
        objectToReturn = processInputForNegSignKey(newKeyInput)
        return objectToReturn
    }


    //if key is decipoint
    if(newKeyInput == '.') {// +- neg sign operator
        objectToReturn = processInputForDeciPointKey(newKeyInput)
        return objectToReturn
    }



    //if key is ( key
    if(newKeyInput === '(') {
        objectToReturn = processInputForOpenBracketKey(newKeyInput)
        return objectToReturn
    }

    //if key is ) key
    if(newKeyInput === ')') {
        objectToReturn = processInputForCloseBracketKey(newKeyInput)
        return objectToReturn
    }



    //if key is % of
    if(newKeyInput === '% of') {
        objectToReturn = processInputForPercentOfKey(newKeyInput)
        return objectToReturn
    }

    //if key is 'out of'
    if(newKeyInput === 'out of') {
        objectToReturn = processInputForOutOfKey(newKeyInput)
        return objectToReturn
    }



    //if key is 'add %'
    if(newKeyInput === 'add %') {
        objectToReturn = processInputForAddPercentKey(newKeyInput)
        return objectToReturn
    }




    //if key is 'deduct %'
    if(newKeyInput === 'deduct %') {
        objectToReturn = processInputForDeductPercentKey(newKeyInput)
        return objectToReturn
    }


    //if key is '% change'
    if(newKeyInput === '% change') {
        objectToReturn = processInputForPercentChangeKey(newKeyInput)
        return objectToReturn
    }


    //if key is 'after added %'
    if(newKeyInput === 'after added %') {
        objectToReturn = processInputForAfterAddedPercentKey(newKeyInput)
        return objectToReturn
    }


    
    //if key is 'after deducted %'
    if(newKeyInput === 'after deducted %') {
        objectToReturn = processInputForAfterDeductedPercentKey(newKeyInput)
        return objectToReturn
    }
    

    
    //if key is 'if % is'
    if(newKeyInput === 'if % is') {
        objectToReturn = processInputForIfPercentIsKey(newKeyInput)
        return objectToReturn
    }



    //if key is 'then'
    if(newKeyInput === 'then') {
        objectToReturn = processInputForThenKey(newKeyInput)
        return objectToReturn
    }
 

    //if key is backspace
    if(newKeyInput === '«') {//backspace button
        objectToReturn = processInputForBackSpaceKey(newKeyInput)
        return objectToReturn
    }//if <-
    
 



    console.log('GOT TO POINT1000')
    let result = calculateResultOfWholeCalculation(collateStringsIntoOneString(segmentsArray))
    return {
        screenMainTextLine1: collateStringsIntoOneString(segmentsArray),
        answerLine: '= ' + result,
        screenMainTextLine3: 'to to test 100 point'
    }

//###################################



    //first detect if current segment is a number or not
    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
     
    //if current segment is a number
    if(currentSegmentIsANumberFlag) {
        console.log('GOT TO CURENTSEGMENTIS A NUMBER')
        //if input is a number, append to current number
        if(newKeyInputIsANumber) {
            //append to current segment number string
            segmentsArray[currentSegmentIndex].stringValue += newKeyInput
        }
        else //keyinput is an operator or .point or -sign
            if(newKeyInput == '+-') {//check to see if is +- neg sign operator
                console.log('GOT TO OPERATOR IS -SIGN')
                //toggle the - sign
                let tempStr = segmentsArray[currentSegmentIndex].stringValue
                //see if string has the - sign at the front
                let hasNegSign = (tempStr[0]==='-')
                console.log('HAS NEG SIGN VALUE IS ' + hasNegSign)
                if(hasNegSign) {
                    //replace - with nothing
                    segmentsArray[currentSegmentIndex].stringValue = tempStr.replace('-','')
                }
                else {//no neg - sign, so add it
                    segmentsArray[currentSegmentIndex].stringValue = '-' + segmentsArray[currentSegmentIndex].stringValue
                }
            }
            else 
                if(newKeyInput == '.') { //decipoint
                    //check if already exists on this ssame numbr before adding
                    if( ! /[.]/.test(segmentsArray[currentSegmentIndex].stringValue)) { //if not already on this number
                        segmentsArray[currentSegmentIndex].stringValue += '.'                    
                    }
                }
                else {//all other operators
                    //move to next segment, this segment is done
                    currentSegmentIndex++
                    segmentsArray[currentSegmentIndex] = {}//create newobject
                    segmentsArray[currentSegmentIndex].stringValue = newKeyInput
                }
    }
    
    
    if( ! currentSegmentIsANumberFlag) {//if currentsegment is an operator
        console.log('GOT TO CURRENTSEGMENT IS AN OPERATOR')
        if(newKeyInputIsANumber) {
            //move to next segment and store the number
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {}//create new object
            segmentsArray[currentSegmentIndex].stringValue = newKeyInput
        }
        else {//input is an ooperator
            //input is another operator, ignore it
            console.log('ANOTHER OPERATOR ONTOP OF OPERATOR: IGNORED')
        }
    }
    


    //colate all the string values of all the segments together to send to 
    //calculate method
    let collatedString = "";
    segmentsArray.forEach((obj, index) => {
        collatedString = collatedString + obj.stringValue + ' '
    })
    
    objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
    return  objectToReturn



    // 1. if currentSegment is the first segment, can only have number, ignore
    //        operators
    //2. if currentsegment is a number:
            // - if newkeyinput is a number, append to string
            // - if newkeyinput is not a number but an operator, put in new next segment of array 
    //3. if currentsegment is an operator
            // - if newKeyInput is a number, put number in next segment of Array
            // - if newKeyInput is an operator, ignore, because cannot have 2 consecutive ooperators,
            //     cann only have 1 operator between 2 numbers
       



}//method updateScreen

//##########









const processInputWhenEmptyScreenMainTextLines = (newKeyInput) => {
    console.log('**GOT TO INSIDE EMPTY SEGMENTSARRAY')


    let allowToTakeSnapShotOfState = true

    let objectToReturn = {}

    // detect if newkeyinput is a number
    let newKeyInputIsANumber = /[0-9]/.test(newKeyInput)//returns a boolean
    
    // currentSegmentIndex = 0 //reset if not already, redundant
    if(newKeyInputIsANumber) {//ok
        segmentsArray[0] = {}//create empty object
        segmentsArray[0].stringValue = newKeyInput
        objectToReturn =  {
            screenMainTextLine1: segmentsArray[0].stringValue,
            screenMainTextLine2: "line2",//calculateResult(segmentsArray[0].stringValue),
            screenMainTextLine3: ""
        }
    }
    else //is not number, check if is a decipoint
        if (newKeyInput === '.') {//if decipoint when empty, add preceding 0
            segmentsArray[0] = {}//create empty object
            segmentsArray[0].stringValue = '0.'
            
            objectToReturn =  {
                screenMainTextLine1: segmentsArray[0].stringValue,
                screenMainTextLine2: "line2",//calculateResult(segmentsArray[0].stringValue),
                screenMainTextLine3: ""
            }
        }
        else //check if bracket
            if(newKeyInput === '('){
                segmentsArray[0] = {}//create empty object
                segmentsArray[0].stringValue = '('
                objectToReturn =  {
                    screenMainTextLine1: segmentsArray[0].stringValue,
                    screenMainTextLine2: "line2",//calculateResult(segmentsArray[0].stringValue),
                    screenMainTextLine3: ""
                }
            }
            else {//operator,ignore key input
                objectToReturn = {
                    screenMainTextLine1: "",
                    screenMainTextLine2: "",
                    screenMainTextLine3: "Ready"//ready msg when both lines empty
                }
                //dont take a snapshot, just
                allowToTakeSnapShotOfState = false 
            }



    if(allowToTakeSnapShotOfState) {
        takeASnapShotOfCurrentCalculationState()
    }
    return objectToReturn

}//method, empty screen











const processInputFor0To9Keys = (newKeyInput) => {
    console.log('###GOT TO PROCESS 0-9 KEYS###')

    let objectToReturn = {}

    let allowToTakeSnapShotOfState = true



    //first detect if current segment is a number or not
    //include % and ) as a number for this key input
    let currentSegmentIsANumberFlag = /([0-9]|%|\)|\()/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
    console.log('AT PROCESS 0-9, CURENTSEGENT IS A NUMBER FLAG IS ' + currentSegmentIsANumberFlag)
    
    let isEmptySegmentFlag = segmentsArray[currentSegmentIndex].stringValue.length <= 0
    console.log('AT PROCESS 0-9, ISEMPTYSEGMENT FLAG IS ' + isEmptySegmentFlag)
    
    let currentSegmentHasOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT PROCESS 0-9, HAS OPENBRACKET FLAG IS ' + currentSegmentHasOpenBracketFlag)
    
    let currentSegmentHasCloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT PROCESS 0-9, HAS CLOSE BRACKET FLAG IS ' + currentSegmentHasCloseBracketFlag)
    
    let currentSegmentHasCloseSquareBracketFlag = /\]/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT PROCESS 0-9, HAS CLOSE ] BRACKET FLAG IS ' + currentSegmentHasCloseSquareBracketFlag)
    
    let hasPriorOpenSquareBracketFlag = /\[/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT PROCESS 0-9, HAS OPEN [ BRACKET FLAG IS ' + hasPriorOpenSquareBracketFlag)
    
    // let hasPriorOpenSquareBracketFlag = /\[/.test(segmentsArray[currentSegmentIndex].stringValue)
    // console.log('AT PROCESS 0-9, HAS OPEN [ BRACKET FLAG IS ' + hasPriorOpenSquareBracketFlag)
    
    let hasPercentSignFlag = /\%/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT PROCESS 0-9, HASPERCENTSIGN FLAG IS ' + hasPercentSignFlag)



    //segment is never empty, always has number or operator, except at 
    //start when string is empty.
    //if segmnt is empty, just add the string value
    if(isEmptySegmentFlag) {
        //never gets here
        segmentsArray[currentSegmentIndex].stringValue = newKeyInput
    }


    //if segment is a number
    if(currentSegmentIsANumberFlag) {
        console.log('AT PROCESS0-9KEYS, GOT TO CURENTSEGMENTIS A NUMBER')

        //check for input lengh
        let overLimit = checkNumberLengthOfUserInput(segmentsArray[currentSegmentIndex].stringValue)
        if(overLimit) {
            //return as is, no change, ignnore user input
            //collate stirng from all segments, to return     
            let collatedString = collateStringsIntoOneString(segmentsArray)
            return objectToReturn = {
                screenMainTextLine1: collatedString,
                screenMainTextLine2: 'answer',
                screenMainTextLine3: ''
            }
        }



        //if has closing bracket, insert number before that closing bracket
        if(currentSegmentHasCloseBracketFlag) {
            //if already has closing bracket, e.g 55) can only
            //enter  more ) if still not closed, 
            //but can not enter more numbers after close bracket input.
            //prevents user confusion.

            // //get the string, minus the last char whichis the ) bracket
            // let tempStr = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)
            // //append key value and reinsert the )
            // tempStr = tempStr + newKeyInput + ')'
            // //copy back to real string
            // segmentsArray[currentSegmentIndex].stringValue = tempStr

            //dont save to timemachine
            allowToTakeSnapShotOfState = false

        }
        else 
            if(currentSegmentHasCloseSquareBracketFlag) {
                //if has percent sign, add input before the percent sign
                 // //get the string, minus the last char whichis the  bracket
                if(hasPercentSignFlag) {
                    //e.g 2 x [23 add 23%] into 2 x [23 add 235%], need to remove both %] chars
                    //add in new numeral, and add back in '%]' chars
                    let tempStr = segmentsArray[currentSegmentIndex].stringValue.slice(0,-2)//everything except the '%]' 2 chars
                    //append key value and reinsert the )
                    tempStr = tempStr + newKeyInput + '%]'
                    //copy back to real string
                    segmentsArray[currentSegmentIndex].stringValue = tempStr
                }
                else {//no % sign, just ] bracket only, 1 char
                    let tempStr = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)//everything except the last char
                    //append key value and reinsert the )
                    tempStr = tempStr + newKeyInput + ']'
                    //copy back to real string
                    segmentsArray[currentSegmentIndex].stringValue = tempStr
                }
            
            }
            else
                if(hasPriorOpenSquareBracketFlag && (!currentSegmentHasCloseSquareBracketFlag) && hasPercentSignFlag){
                    //add number before the % sign
                    tempStr = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)//everything except the last % char
                    //append key value and reinsert the )
                    tempStr = tempStr + newKeyInput + '%'
                    //copy back to real string
                    segmentsArray[currentSegmentIndex].stringValue = tempStr
                }
                else
                    if((!hasPriorOpenSquareBracketFlag) && (!currentSegmentHasCloseSquareBracketFlag)&&(hasPercentSignFlag)) {
                        //if has no open and close square bracket, and has % sign, then insert before the %sign
                        //add number before the % sign
                        tempStr = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)//everything except the last % char
                        //append key value and reinsert the )
                        tempStr = tempStr + newKeyInput + '%'
                        //copy back to real string
                        segmentsArray[currentSegmentIndex].stringValue = tempStr
                    }
                    else {//no square brackt, either has open bracket, or no brackets, append the numaeral key value string
                        //need to prevent cases of 0005 (0005 etc... so look at last numeral,
                        //if it is a 0 without a decipoint, 0. is ok, 0 will be replaced if it is the
                        //first numeral

                        //if current segment has 1 numeral, and it is a 0, and no dedipoint, then remove it before
                        //adding this numeral input
                        let currentSegmentString = segmentsArray[currentSegmentIndex].stringValue
                        if( ((currentSegmentString.match(/[0-9]/) || []).length ===1) //len of 1 numeral
                                && ( currentSegmentString[currentSegmentString.search(/[0-9]/)] === '0')//first numeral is a '0'
                                && ( ! /\./.test(segmentsArray[currentSegmentIndex].stringValue)) ) {//no decipoint present
                            //remove the leading 0, no decipoint present
                            segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)
                        }

                        //add the input 
                        segmentsArray[currentSegmentIndex].stringValue += newKeyInput
                    }

    }
    else {//curr segent is ann operator
        //move to next segment, and put input value there
        console.log('AT 0-9 KEYS, CURRENTLY AT OPERATOR , SO MOVE TO NEXT SEGMENT')
        currentSegmentIndex++
        segmentsArray[currentSegmentIndex] = {}//create new object for  next array element
        segmentsArray[currentSegmentIndex].stringValue = newKeyInput
    }

    

    //if has no open or close bracket, and has '[' bracket, 
    //then add a ] bracket at the end
    console.log('GOT TO PERCENTOF CALCTYPE')
    let thisSegmentHasCloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT INSIDE %OF CALC, HAS CLOSE BRACKET FLAG IS ' + thisSegmentHasCloseBracketFlag)
    
    // let thisSegmentHasOpenBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    // console.log('AT INSIDE %OF CALC, HAS OPEN BRACKET FLAG IS ' + thisSegmentHasOpenBracketFlag)
        
    // let hasPriorOpenSquareBracketFlag = /\[/.test(collateStringsIntoOneString(segmentsArray))
    // console.log('AT INSIDE %OF CALC, HAS OPEN [ BRACKET FLAG IS ' + hasPriorOpenSquareBracketFlag)
    
    let alreadyHasPriorCloseSquareBracketFlag = /\]/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT INSIDE %OF CALC, HAS CLOSE ] BRACKET FLAG IS ' + alreadyHasPriorCloseSquareBracketFlag)
    
    
    if( hasPriorOpenSquareBracketFlag && (! alreadyHasPriorCloseSquareBracketFlag)) {
        console.log('GOT TO PERCENTOF CALCTYPE, HAS  PRIIOR OPEN [ BRACKET')
        //if nett value is 0, in cases of 23 x ([(20 x 5)% of inputhere]
        //we can insert the ] bracket after the number if () nettvalue is 0. 
        //dont  insert if nettvalue is 0, e.g 23 x ([(20 x 5)% of (57   ie 2nd operand is
        //incomplete, therefore nettvalue of () is not 0.
        let tempStr = collateStringsIntoOneString(segmentsArray)
        let indexOfOpenSquareBracket = tempStr.search(/\[/)
        if(indexOfOpenSquareBracket === -1) {
            indexOfOpenSquareBracket = 0
        }
        let nettValueOfParenthesis = getParenthesesNetValueFromString(tempStr.slice(indexOfOpenSquareBracket))
        console.log('NETVALUE OF PARANTHESIS IS ' + nettValueOfParenthesis)
        if(nettValueOfParenthesis === 0) {

            //for if%is calcultion, dont add the ] at the 2nd operand, coa it has 3 operands, 
            //unlike other percnt calcultions
            if(/if/.test(collateStringsIntoOneString(segmentsArray))
                && ( ! /then/.test(collateStringsIntoOneString(segmentsArray)))){
                    //if there is 'if' but no 'then' then we are at the 2nd operand
                    //of if%is calculation, e.g 'if 5% is 5777' , no operadn3 yet, 
                    //so dont add the close sqaure bracket. complete calculation is e.g if 5% is 50 then 20%

                    //do nothig, no addig of the close square bracket which is for othr
                    //percentage calculations which has opeand2 as the last operand. this
                    //if%is has 3 oeprands, so we dont close it with square braccket yet.

                }
            else {
                //for every other percennt calculaltoin , 
                //if not already added on previous inputs, then add the ] close square bracket
                //so it is e.g 23 x ([(25 x 5)% of 35]
                //add square bracket at the end if not already present
                let strLen = segmentsArray[currentSegmentIndex].stringValue.length
                let lastChar = segmentsArray[currentSegmentIndex].stringValue[strLen -1]
                console.log('LAST CHAR IN SEGMENT IS ' + lastChar)
                if(lastChar !== ']') {
                    segmentsArray[currentSegmentIndex].stringValue += ']'
                }
            }

        }

    }//if has prior open [ square bracket

    //save to timemachine
    if(allowToTakeSnapShotOfState) {
        takeASnapShotOfCurrentCalculationState()
    }
    
    //collate stirng from all segments, to return     
    let collatedString = collateStringsIntoOneString(segmentsArray)
    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }


}










processInputFor4ArithmeticKeys = (newKeyInput) => {



    console.log('GOT TO PROCESS 4ARITH KEYS')


    let objectToReturn = {}

    let allowToTakeSnapShotOfState = true


    //first detect if current segment is a number or not
    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
    console.log('AT PROCESS4ARITHKEYS, CURENTSEGENT IS A NUMBER FLAG IS ' + currentSegmentIsANumberFlag)
    
    let hasPriorPercentCalculation = /of|add|deduct|to|added|deducted|is|then/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT PROCESS4ARITHKEYS, CURENTSEGENT HAS PRIOR PERCENT CALC FLAG IS ' + hasPriorPercentCalculation)
    
    let hasPriorOpenSquareBracket = /\[/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT PROCESS4ARITHKEYS, CURENTSEGENT HAS PRIOR OPEN SQUARE BRACKET FLAG IS ' + hasPriorOpenSquareBracket)
    
    let nettOpenParenthesisValue = getParenthesesNetValueFromString(collateStringsIntoOneString(segmentsArray))
    console.log('AT 4ARITHKEYS, NETT OPEN BRACKETS VALUE IS ' + nettOpenParenthesisValue)
    //if current segment is a number,  can proceed


    //special if%is case, if there is just 'if' without 'then', then at operand2, no
    //arith operators allowed so just return
    if( (/if/i.test(collateStringsIntoOneString(segmentsArray))) && ( ! /then/i.test(collateStringsIntoOneString(segmentsArray))) ) {
        //just return as is, no action
         //collate stirng from all segments, to return 
        let collatedString = collateStringsIntoOneString(segmentsArray)
        return objectToReturn = {
            screenMainTextLine1: collatedString,
            screenMainTextLine2: 'answer',
            screenMainTextLine3: ''
        }
    }


    if(currentSegmentIsANumberFlag) {
        console.log('AT PROCESS4ARITHS, CURENTSEGMENT IS A NUMBER')
        //for cases where the first expression is a complete percentage calucaltion,
        //then user presses arith key, e.g 12% of 35 then user presses arith key,
        //we must insert open and close [] square brackets to encapsulate the percentage
        //calculation , before appending the arith operator after, outside of the [] brackets,
        //so becomes e.g [12% of 35] x 150

        //if there has been a percent calculation, and no open square bracket [,
        //and user presses an arith key, means this is the first arith key after
        //the percent calculation (because theere is no square brackets yet, square
        //bracketes would have been inserted at first arith operator after the percent
        //calculaltion)

        if(hasPriorPercentCalculation && ( ! hasPriorOpenSquareBracket) && (nettOpenParenthesisValue === 0)) {
            // if gets here , has prior percent, no [ bracket, and nett () value of 0,
            //has to be nettvalue of 0 to prevent [10% of (5] x 8 , ie square bracket inserted in middle of 
            //open parenthesis.

            //insert the open [ bracket at start of whole calculation, ie first segment
            segmentsArray[0].stringValue = '[' + segmentsArray[0].stringValue//first char of first segment
            //insert close ] bracket at end of current segment (ie the last segment)
            segmentsArray[currentSegmentIndex].stringValue += ']'//last char of current (ie last) segment
        }
 
        //now proceed as normal and move to next segment and append the arith operator
        currentSegmentIndex++
        segmentsArray[currentSegmentIndex] = {} //create new element
        //put the operator in the new element
        segmentsArray[currentSegmentIndex].stringValue = newKeyInput
    }
    else {//current seg is not a number, is an operator
        //ignore
        console.log('AT PROCESS4ARITHS, ANOTHER OPERATOR PRESSED, IGINORED')
        //dont take snapshot
        allowToTakeSnapShotOfState = false 
    }



    if(allowToTakeSnapShotOfState) {
        takeASnapShotOfCurrentCalculationState()
    }

    //collate stirng from all segments, to return 
    let collatedString = collateStringsIntoOneString(segmentsArray)

    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
}//method process 4ariths operators








const processInputForNegSignKey = (newKeyInput) => {

    console.log('GOT TO PROCESS OPERATOR -SIGN')

    let allowToTakeSnapShotOfState = true 

    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
        
    //if segment has a close round bracket , no more input, no changing -ssign also
    if(/\)/.test(segmentsArray[currentSegmentIndex].stringValue)) {
        //return as is, no bindActionCreators, segment has a ) close round bracket

        //collate stirng from all segments, to return 
        let collatedString = collateStringsIntoOneString(segmentsArray)

        return objectToReturn = {
            screenMainTextLine1: collatedString,
            screenMainTextLine2: 'answer',
            screenMainTextLine3: ''
        }
    }


    //if segment is a number, ok, can toggle sign,
    //if is ooperator, then ignore key input

    //toggle the - sign
    if(currentSegmentIsANumberFlag) {

        //if has - sign, then remove it
        if(/\-/.test(segmentsArray[currentSegmentIndex].stringValue)) {//-sign exists
            //remove the - sign, in real string
            segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue.replace(/\-/,'')
        }
        else {//no -sign present, add it
            //need to find start index of numeral, coz could be ((5 , to become ((-5
            let indexOfFirstNumeral = segmentsArray[currentSegmentIndex].stringValue.search(/[0-9]/)
            let tempStr = segmentsArray[currentSegmentIndex].stringValue
            segmentsArray[currentSegmentIndex].stringValue = tempStr.slice(0, indexOfFirstNumeral) 
                + '-' + tempStr.slice(indexOfFirstNumeral)
        }
    }
    else {
        //is ann operator, ignore
        //dont take a snapshot
        allowToTakeSnapShotOfState = false
    }




    if(allowToTakeSnapShotOfState) {
        takeASnapShotOfCurrentCalculationState()
    }
    
    //collate stirng from all segments, to return 
    let collatedString = collateStringsIntoOneString(segmentsArray)

    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }

}//method, -sign key









const processInputForDeciPointKey = (newKeyInput) => {

    
    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    let currentSegmentString = segmentsArray[currentSegmentIndex].stringValue
    
    let allowToTakeSnapShotOfState = true

    //note: current segment is never empty, except when whole array
    //is empty at start or after CA, so no need to check that condition

    //if currentsegment is a number then add . if not existed alreay
    if(currentSegmentIsANumberFlag) {
        //add only if not already exists
        if( ! /[.]/.test(currentSegmentString)) { //if not already on this number
            //decipoint not yet exist, add it

            //if string has a ')' closing bracket, locked, then cant add a decipoint to a bracket
            //becuase closing brackets means number is locked, cant alter it.
            if(/\)/.test(currentSegmentString)) {
                //ignore, no action
                //dont take snapshot
                allowToTakeSnapShotOfState = false 
            }
            else {//may have naked number e.g 35 or has ']' eg '35]' or '35%]'
                //append decpoint to last numeral, e.g 3%] becomes 3.%] or 3% becomes 3.%
                //or 3 becomes 3. 

                //find index of last numeral and insert the decipoint right after it

                //find length of returned array, to find out number of numerals existing
                let numberLength = (currentSegmentString.match(/[0-9]/g) || []).length //starts from 0, 
                //remembr to put in the G flag, else would return first match only
                
                //get index of first number
                let indexOfFirstNumeral = currentSegmentString.search(/[0-9]/)
                //deduce index of last numeral
                let indexOfLastNumeral = indexOfFirstNumeral + (numberLength - 1)
                //insert the decipoint
                let portion1 = currentSegmentString.slice(0, indexOfLastNumeral + 1)//+1 to include last numeral
                let portion2 = currentSegmentString.slice(indexOfLastNumeral + 1)//to eo stirng
                //copy back to real string
                segmentsArray[currentSegmentIndex].stringValue = portion1 + '.' + portion2
            }
                 
        }
        else {
            //decipoint already exists, igonore decipoint key input
            //dont take snapshot
            allowToTakeSnapShotOfState = false
        }
    }
    else //if is just a % sign, and user presses . decipoint, then becomes 0.%
        if(currentSegmentString.length === 1 && /\%/.test(currentSegmentString)) {// only 1 char, and it is a %sign
            segmentsArray[currentSegmentIndex].stringValue = '0.%'   
        }
        else {//curr segment is an operator or empty
            //move to next segment and add 0.
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {}//create
            segmentsArray[currentSegmentIndex].stringValue = '0.'
        }




    if(allowToTakeSnapShotOfState) {
        takeASnapShotOfCurrentCalculationState()
    }

    //collate stirng from all segments, to return 
    let collatedString = collateStringsIntoOneString(segmentsArray)

    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }

}//mthod









const processInputForOpenBracketKey = (newKeyInput) => {

    console.log('GOT TO PROCESS BRACKET OPEN KEY')

    let objectToReturn = {}

    let allowToTakeSnapShotOfState = true 


    ///can only enter a open bracket if current segment is 
    //empty then ok to add openbracket, or is arithmetic of percent operator,
    // e.g 'of' 'to' '+' 'x' 'add' etc...
    //then jump to next segment then add the open bracket
    
    //first detect if current segment is either arith or percent operator or not
    let currentSegmentIsAnArithOrPercentOperatorFlag = /(\+|-|x|÷|of|add|deduct|to|is|then|deducted|added)/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
    console.log('AT PROCESS BRACKET OPEN, CURENTSEGENT IS A OPERATOR FLAG IS ' + currentSegmentIsAnArithOrPercentOperatorFlag)
    
    let currentSegmentHasPercentSignFlag = /\%/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean


    let currentSegmentAlreadyHasOpenBracket = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
    
    let isEmptySegmentFlag = segmentsArray[currentSegmentIndex].stringValue.length <= 0
    console.log('AT PROCESS BRACKET OPEN, ISEMPTYSEGMENT FLAG IS ' + isEmptySegmentFlag)
     

    //work out how many outstanding open brackets there are in whole
    //array
    //first scan array and determine nett value of brackets
    let collatedString = collateStringsIntoOneString(segmentsArray)
    let tempArr = collatedString.match(/\(/g) || []//if not found
    let numberOfOpenBracketsInWholeArray = tempArr.length
    console.log('AT BRAKET OPEN, NUMBER OF OPEN BRACKETS COUNT IS :' + numberOfOpenBracketsInWholeArray)
    tempArr = collatedString.match(/\)/g) || []  
    numberOfCloseBracketsInWholeArray = tempArr.length
    console.log('AT BRAKET OPEN, NUMBER OF CLOSE BRACKETS COUNT IS :' + numberOfCloseBracketsInWholeArray)
    
    let numberOfTotalOpenBracketsOutstandingInWholeArray = numberOfCloseBracketsInWholeArray - numberOfOpenBracketsInWholeArray
    console.log('AT BRAKET OPEN, NUMBER OF OPEN BRACKETS OUTSTNDING IS :' + numberOfTotalOpenBracketsOutstandingInWholeArray)


    if(isEmptySegmentFlag) {
        //never gets here, pointer always points to current segment which 
        //jumps from last on char input, so is never empty
        segmentsArray[currentSegmentIndex].stringValue = newKeyInput
    }


    //if current segment is a number, cant add anymore open brackets after number is present
    if(currentSegmentIsANumberFlag) {
        //return data as is, unchanged

        //collate stirng from all segments, to return 
        collatedString = collateStringsIntoOneString(segmentsArray)

        return objectToReturn = {
            screenMainTextLine1: collatedString,
            screenMainTextLine2: 'answer',
            screenMainTextLine3: ''
        }

        //dont take snapshot
    }


    //if current segment is an operator, move to next segment and add a open bracket (
    if(currentSegmentIsAnArithOrPercentOperatorFlag) {
        //move to next segment then add open bracket
        //NOTE: an open bracket is included in operator search,
        //so if already has a open bracket or more, ok to add on.
        currentSegmentIndex++
        segmentsArray[currentSegmentIndex] = {}//create new element
        segmentsArray[currentSegmentIndex].stringValue = '('
    }
    else 
        if(currentSegmentAlreadyHasOpenBracket) {
            //just add another bracket, dont add at next segment but
            //add at this current segment, so this segment may have many
            //open brackets

            //if less than 2 open brackets then allow to insert more
            if(numberOfTotalOpenBracketsOutstandingInWholeArray > -2) {
                segmentsArray[currentSegmentIndex].stringValue += '('
            }
        }
        else 
            if(currentSegmentHasPercentSignFlag) {//empty % sign, cant be a numbered % sign, ie % , cant be 5%
                //e.g 23 add (25% x 5) when should be 23 add (25 x 5)%, so we remove
                //remove the % sign before we add the ( before the number 25

                //add the ( open bracket, now is (%
                segmentsArray[currentSegmentIndex].stringValue = '(' + segmentsArray[currentSegmentIndex].stringValue 
                //now remove the % sign at the end, becomes (
                segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)
            }
 

    if(allowToTakeSnapShotOfState) {
        takeASnapShotOfCurrentCalculationState()
    }

    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)

    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }

}











const processInputForCloseBracketKey = (newKeyInput) => {

    console.log('GOT TO PROCESS BRACKET CLOSE KEY')

    let objectToReturn = {}

    let allowToTakeSnapShotOfState = true 

    ///can only enter a close bracket if current segment is a number,
    //and nett bracket count is -1 or less
    //Each ( has value of -1
    //Each ) has value of +1
    //if nett is 0 means equal, correct.

    //must be a number, can already have a closing bracket , ok
    //but cant have a open bracket
    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT PROCESS BRACKET CLOSE, CURENTSEGENT IS A NUMBER FLAG IS ' + currentSegmentIsANumberFlag)
    
    let hasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT PROCESS BRACKET CLOSE, CURENTSEGENT HASOPENBRACKET FLAG IS ' + hasAnOpenBracketFlag)
   
    let hasPriorOpenSquareBracketFlag = /\[/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT PROCESS BRACKET CLOSE, CURENTSEGENT HAS PRIOR [ SQUARE BRACKET FLAG IS ' + hasPriorOpenSquareBracketFlag)

    let hasPriorPercentSign = /\%/.test(collateStringsIntoOneString(segmentsArray))

    //first scan array and determine nett value of brackets
    let nettValue = getParenthesesNetValueFromString(collateStringsIntoOneString(segmentsArray))
    console.log('AT PROCESS BRACKET CLOSE, NETTVALUE OF BRACKETS IS  ' + nettValue)
     
    let hasPriorPercentCalculationNeedingPercentSignInOperand2 = /add|deduct|added|deducted|then|if/.test(collateStringsIntoOneString(segmentsArray))
    console.log('NEEDS PERCNT SIGN IN OPERAND2 FLAG IS:', hasPriorPercentCalculationNeedingPercentSignInOperand2)
    
    //if segment has a number,segment has no open brackets, and -1 or less nett bracket,
    //then ok to proceed and add close bracket
    if(currentSegmentIsANumberFlag && (! hasAnOpenBracketFlag) && (nettValue <= -1)) {
        segmentsArray[currentSegmentIndex].stringValue += ')'
        
    }


    if(hasPriorOpenSquareBracketFlag) {
        console.log('*******GOT TO HASOPENSQUAREBRACKET')
        //has open square bracket e.g 23 x [(25 x 3)% of (23 x 30)]
        //once the last close parenthesis is input, completing the unit
        //, need to add the closng square bracktt

        //check if the closing bracket completes the round bracket sets within
        //the square bracket if so, append the closing square bracket to encapsulate
        //te percntage calculation
        
        //get the string from start of the square bracket
        let tempStr = collateStringsIntoOneString(segmentsArray)
        let indexOfOpenSquareBracket = tempStr.search(/\[/)//returns an integer
        if(indexOfOpenSquareBracket === -1) indexOfOpenSquareBracket = 0
        tempStr = tempStr.slice(indexOfOpenSquareBracket)//get the portion from [ only
        let nettValueOfParenthesis = getParenthesesNetValueFromString(tempStr)
        console.log('******AT HASOPENSQUAREBRACKET, PARENTHESIS NET VALUE IS ' + nettValueOfParenthesis)
        
        if(nettValueOfParenthesis === 0) {//all open bracketss within open square bracket are now closed
            //now add the ] closing square bracket if not already exists
            if( ! /\]/.test(collateStringsIntoOneString(segmentsArray))) {//if not exist
                let hasIfWord = /if/i.test(collateStringsIntoOneString(segmentsArray))
                let hasThenWord = /then/i.test(collateStringsIntoOneString(segmentsArray))
                if(hasIfWord && (! hasThenWord)) {
                    //e.g  '2 x [if (2 x 3)% is (5x6)' , dont add anything, only midway
                    //dont take snpshot
                    allowToTakeSnapShotOfState = false
                }
                else 
                    if(hasThenWord) {
                        segmentsArray[currentSegmentIndex].stringValue += '%]'
                    }
                    else
                        //if is a 'add' or 'dedduct' or 'if' or 'added' or 'deducted' then add a '%]'
                        if(/add|deduct|added|deducted/.test(collateStringsIntoOneString(segmentsArray))) {
                            segmentsArray[currentSegmentIndex].stringValue += '%]'
                        }
                        else { //must be: %of, outof, %change, no need for % sign
                            segmentsArray[currentSegmentIndex].stringValue += ']'
                        }
            }
        }
    }
    else {//if no prior square braket, and is a percent calcultion, and nett parenthesis is 0, then add % sign
        
        //e.g 5 add (23 x 5) becomes 5 add (23 x 5)%
        //if gets here, means no prior square bracket, if is a percent calc, then it is a simpleone
        //without square brackets, ie without arith operators existing
        if(hasPriorPercentCalculationNeedingPercentSignInOperand2 && (getParenthesesNetValueFromString(collateStringsIntoOneString(segmentsArray))===0)) {
            console.log('GOT TO ADDING PERCENT SIGN FOR NEEDING PERCENT SIGN')
            //add the % sign , bracket close added with nett value of 0
            //add if not already exist
            
            if( /then/.test(collateStringsIntoOneString(segmentsArray)) 
                && collateStringsIntoOneString(segmentsArray).match(/\%/).length<2) {//if not already exist
                    segmentsArray[currentSegmentIndex].stringValue += '%'
            }
            else 
            if( ! hasPriorPercentSign ) {//if not already exist
                segmentsArray[currentSegmentIndex].stringValue += '%'
            }
        }
    }




    if(allowToTakeSnapShotOfState) {
        takeASnapShotOfCurrentCalculationState()
    }


    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)

    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }

}//mthod


 








const processInputForPercentOfKey = (newKeyInput) => {

    //to get valid '% of' input, current segment must be a
    //number, number with open bracket, or numbr with close bracket at end.
    //e.g   367% of,   or (5 x 63)% of .. , or (55% of ..
    //so 
    //1. must be a number with no open or close bracket, e.g 150 x 367% of .. , 
    //.In this case we put an open bracket in, segment becomes 150 x (367% of ...)
    //2. number  e.g 20 with open bracket, e.g 150 x (20% of .. ,means user already inserted 
    //open bracket in front of the 20, we dont need to put in another open bracket.
    //3. number e.g 20 with closing bracket e.g (150 x 20)% of ..., means
    //we go back to before (150 portion and add open bracket in, becomes
    //((150 x 20)% of ...

    //summary: so current segment must have a 0-9 number in it,
    //1. if current segment has no open or close bracket in it, 
    //and there is prior arith operator e.g 5 x 20%, we put
    //an open bracket in front of the 20, becomes 5 x (20% of ...
    //If there is no prior arith operator, e.g just 20 then we
    //dont put a bracket in frontn of 20, so becomes 20% of ...
    //2. if current segment has a closing bracket at end of it, e.g (5 x 20)%,
    //ie closeing bracket after 20, we go back to in front of the unit,
    //unit is the (5 x 20) portion, and insert an open bracket in front of it
    //, becomes ((5 x 20)% of ...
    //3. if current segmnt as an open bracket in front of it, e.g 5 x (20% of ...
    //open bracket in front of the 20, we dont put any brackets in, we just add
    //the '% of ' portion as per normal


    let allowToTakeSnapShotOfState = true 

    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTISANUMBER FLAG IS :' + currentSegmentIsANumberFlag)

    let currentSegmentHasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHAS OPENBRACKET FLAG IS :' + currentSegmentHasAnOpenBracketFlag)

    let currentSegmentHasACloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHASCLOSEBRACKET FLAG IS :' + currentSegmentHasACloseBracketFlag)
    
    let currentSegmentHasNoOpenOrCloseBracketFlag = ! /(\(|\))/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHAS NO OPEN OR CLOSE BRACKET FLAG IS :' + currentSegmentHasNoOpenOrCloseBracketFlag)
    
    let currentSegmentHasPriorArithOperator = /(\+|-|x|÷)/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT %OF INPUT, currentSegmentHasPriorArithOperator FLAG IS :' + currentSegmentHasPriorArithOperator)
    




    //first make sure that there has been no previous percentage related
    //operator in the whole calculatoion
    let collatedString = collateStringsIntoOneString(segmentsArray)
    let wholeCalculationHasAPercentOperatorFlag = /(of|add|deduct|to|is|then|deducted|added)/.test(collatedString)//returns a boolean

    if(wholeCalculationHasAPercentOperatorFlag) {
        //has prior percentage operator, so no action,
        //ignore input, return as is.

        //collate stirng from all segments, to return 
        let collatedString = collateStringsIntoOneString(segmentsArray)
        console.log('COLLATED STRING IS: ', collatedString)
        return objectToReturn = {
            screenMainTextLine1: collatedString,
            screenMainTextLine2: 'answer',
            screenMainTextLine3: ''
        }
    }



    
    //if gets to here then has no previous percent operator in the line
 
    //if current segment is not a number one, ignore user key input
    if( ! currentSegmentIsANumberFlag ){ //not a number segment
        //ignore
        //dont take snapshot
        allowToTakeSnapShotOfState = false
    }
    else {//is a number segment, so proceed
        if(currentSegmentHasNoOpenOrCloseBracketFlag) {
            if( ! currentSegmentHasPriorArithOperator) {//no prior arith operator.
                //25 x ((23 + 10% ... becomes 25 x ((23 + [10% of ...
                //or 25 becomes 25% of ...
                console.log('AT %OF, GOT TO NUMBER HAS NO OPEN OR CLOSE BRACKET, NO PRIOR ARITH OPERATOR')                
                //no priior arith operator, no closing or open bracket,
                // so we  just proceed to add '% of' portion
                
                //add the % sign at end of this segmnt and 'of' in the next segment
                segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue + '%'
                //add 'of' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'of'
            }
            else {//has prior arith operator.
                console.log('AT %OF, GOT TO NUMBER HAS NO BRACKETS, BUT HAS PRIOR ARITH OPERATOR')
                //e.g 5 x 20, so we put open brack in front of 20, 
                //becomes 5 x (20% of ...
    
                //put ( in front of current segment
                segmentsArray[currentSegmentIndex].stringValue = '[' + segmentsArray[currentSegmentIndex].stringValue
                //add the % sign at end of this segmnt and 'of' in the next segment
                segmentsArray[currentSegmentIndex].stringValue += '%'
                //add 'of' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'of'
            }
        }//if no open or close bracket

        else
        if(currentSegmentHasAnOpenBracketFlag) {//has an open bracket. 
            console.log('AT %OF, GOT TO SEGMENT HAS OPEN BRACKT')
            //if has open bracket at start of segment, means user 
            //typed it in, e.g 5 x (20 , or ((20% of ...
            //if it is 5 x (20 , ie has prior arith operator, then we insert
            //a square bracket) 
            //. if it has no priior operator e.g ((20% of ... then we dont insert
            //the square bracket.
            
            // if(currentSegmentHasPriorArithOperator) {
                //has prior arth operator, so we insert a square bracket 
                //in front of the number

                //get index of first numeral in segment, note: no g flag
                let tempStr = segmentsArray[currentSegmentIndex].stringValue
                let indexOfFirstNumeral = tempStr.search(/[0-9]/)
                //need to slice and recombine, to insert the square bracket
                let portion1 = tempStr.slice(0, indexOfFirstNumeral)
                let portion2 = tempStr.slice(indexOfFirstNumeral)//defaults to eostring, ie lenght-1
                tempStr = portion1 + '[' + portion2//insert
                //copy back to real string
                segmentsArray[currentSegmentIndex].stringValue = tempStr
            // }
            // else {//has no prior operator
            //     //igonore, dont insert square bracket
            // }

            //add the % sign at end of this segmnt and 'of' in the next segment
            segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue + '%'
            //add 'of' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'of'
        }
        else 
        if(currentSegmentHasACloseBracketFlag) {//has a close bracket.
            console.log('AT %OF, GOT TO SEGMENT HAS CLOSE BRACKT')
            //if has a close bracket, means user just entered a bracketed caluculation,
            //e.g (5 x 20)% of ... or 25 x (30 + 20)% of ...
            //if it is (5 x 20)%, ie no prior arith outside of unit, 
            //then no need to insert square bracket, no action.
            //if there is prior arith operator outside of unit, e.g
            // 25 x (20 + 30)% ... the 25 x is outside of the unit.
            //so we put the square bracket at the begining of the unit,
            //beecomes 25 x [(20 + 30)% ... 
            //if it is 25 x ((20 + 30)%, becomes 25 x ([(20 + 30)%

 

            let indexOfSegmentWithFirstOpenBracket = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfSegment
            let indexOfOpenBracketWithinSegment = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfOpenBracketWithinSegmentString
            
            //if prior arith operator exists, then add '[' before the open
            //bracket of the unit
            if( currentSegmentHasPriorArithOperator) {
                //add the '[' before unit's open bracket e.g 25 x ((23 + 10) ... 
                //becomes 25 x ([(23 + 10) ...
                let tempStr = segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue
                let portion1 = tempStr.slice(0, indexOfOpenBracketWithinSegment)//exclusive of open bracket
                let portion2 = tempStr.slice(indexOfOpenBracketWithinSegment)//defualt end is length -1 
                tempStr = portion1 + '[' + portion2
                //copy back to real string
                segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue = tempStr


            }
            
            //add the % sign at end of this segmnt and 'of' in the next segment
            segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue + '%'
            //add 'of' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'of'
    

        }
    }//else is a number segment
    



    if(allowToTakeSnapShotOfState) {
        takeASnapShotOfCurrentCalculationState()
    }
      
    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)
    console.log('COLLATED STRING IS: ', collatedString)
    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
    
}



 


const processInputForOutOfKey = (newkeyinput) => {

    //to get valid '% of' input, current segment must be a
    //number, number with open bracket, or numbr with close bracket at end.
    //e.g   367% of,   or (5 x 63)% of .. , or (55% of ..
    //so 
    //1. must be a number with no open or close bracket, e.g 150 x 367% of .. , 
    //.In this case we put an open bracket in, segment becomes 150 x (367% of ...)
    //2. number  e.g 20 with open bracket, e.g 150 x (20% of .. ,means user already inserted 
    //open bracket in front of the 20, we dont need to put in another open bracket.
    //3. number e.g 20 with closing bracket e.g (150 x 20)% of ..., means
    //we go back to before (150 portion and add open bracket in, becomes
    //((150 x 20)% of ...

    //summary: so current segment must have a 0-9 number in it,
    //1. if current segment has no open or close bracket in it, 
    //and there is prior arith operator e.g 5 x 20%, we put
    //an open bracket in front of the 20, becomes 5 x (20% of ...
    //If there is no prior arith operator, e.g just 20 then we
    //dont put a bracket in frontn of 20, so becomes 20% of ...
    //2. if current segment has a closing bracket at end of it, e.g (5 x 20)%,
    //ie closeing bracket after 20, we go back to in front of the unit,
    //unit is the (5 x 20) portion, and insert an open bracket in front of it
    //, becomes ((5 x 20)% of ...
    //3. if current segmnt as an open bracket in front of it, e.g 5 x (20% of ...
    //open bracket in front of the 20, we dont put any brackets in, we just add
    //the '% of ' portion as per normal



    let allowToTakeSnapShotOfState = true 

    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTISANUMBER FLAG IS :' + currentSegmentIsANumberFlag)

    let currentSegmentHasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHAS OPENBRACKET FLAG IS :' + currentSegmentHasAnOpenBracketFlag)

    let currentSegmentHasACloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHASCLOSEBRACKET FLAG IS :' + currentSegmentHasACloseBracketFlag)
    
    let currentSegmentHasNoOpenOrCloseBracketFlag = ! /(\(|\))/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHAS NO OPEN OR CLOSE BRACKET FLAG IS :' + currentSegmentHasNoOpenOrCloseBracketFlag)
    
    let currentSegmentHasPriorArithOperator = /(\+|-|x|÷)/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT %OF INPUT, currentSegmentHasPriorArithOperator FLAG IS :' + currentSegmentHasPriorArithOperator)
    




    //first make sure that there has been no previous percentage related
    //operator in the whole calculatoion
    let collatedString = collateStringsIntoOneString(segmentsArray)
    let wholeCalculationHasAPercentOperatorFlag = /(of|add|deduct|to|is|then|deducted|added)/.test(collatedString)//returns a boolean

    if(wholeCalculationHasAPercentOperatorFlag) {
        //has prior percentage operator, so no action,
        //ignore input, return as is.

        //collate stirng from all segments, to return 
        let collatedString = collateStringsIntoOneString(segmentsArray)
        console.log('COLLATED STRING IS: ', collatedString)
        return objectToReturn = {
            screenMainTextLine1: collatedString,
            screenMainTextLine2: 'answer',
            screenMainTextLine3: ''
        }
    }



    
    //if gets to here then has no previous percent operator in the line
 
    //if current segment is not a number one, ignore user key input
    if( ! currentSegmentIsANumberFlag ){ //not a number segment
        //ignore
        //dont rtake snapshot
        allowToTakeSnapShotOfState = false
    }
    else {//is a number segment, so proceed
        if(currentSegmentHasNoOpenOrCloseBracketFlag) {
            if( ! currentSegmentHasPriorArithOperator) {//no prior arith operator.
                //25 x ((23 + 10% ... becomes 25 x ((23 + [10% of ...
                //or 25 becomes 25% of ...
                console.log('AT %OF, GOT TO NUMBER HAS NO OPEN OR CLOSE BRACKET, NO PRIOR ARITH OPERATOR')                
                //no priior arith operator, no closing or open bracket,
                // so we  just proceed to add '% of' portion
                
                //add 'outof' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'out of'
            }
            else {//has prior arith operator.
                console.log('AT %OF, GOT TO NUMBER HAS NO BRACKETS, BUT HAS PRIOR ARITH OPERATOR')
                //e.g 5 x 20, so we put open brack in front of 20, 
                //becomes 5 x (20% of ...
    
                //put ( in front of current segment
                segmentsArray[currentSegmentIndex].stringValue = '[' + segmentsArray[currentSegmentIndex].stringValue
                //add 'out of' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'out of'
            }
        }//if no open or close bracket

        else
        if(currentSegmentHasAnOpenBracketFlag) {//has an open bracket. 
            //if has an open bracket e.g (45 then becomes ([45
            console.log('AT %OF, GOT TO SEGMENT HAS OPEN BRACKT')
            //if has open bracket at start of segment, means user 
            //typed it in, e.g 5 x (20 , or ((20% of ...
            //if it is 5 x (20 , ie has prior arith operator, then we insert
            //a square bracket) 
            //. if it has no priior operator e.g ((20% of ... then we dont insert
            //the square bracket.
            
            // if(currentSegmentHasPriorArithOperator) {
                //has prior arth operator, so we insert a square bracket 
                //in front of the number e.g 23 x (45 out of, becomes 23 x ([45 out of ..

                //get index of first numeral in segment, note: no g flag
                let tempStr = segmentsArray[currentSegmentIndex].stringValue
                let indexOfFirstNumeral = tempStr.search(/[0-9]/)
                //need to slice and recombine, to insert the square bracket
                let portion1 = tempStr.slice(0, indexOfFirstNumeral)
                let portion2 = tempStr.slice(indexOfFirstNumeral)//defaults to eostring, ie lenght-1
                tempStr = portion1 + '[' + portion2//insert
                //copy back to real string
                segmentsArray[currentSegmentIndex].stringValue = tempStr
            // }
            // else {//has no prior operator
            //     //igonore, dont insert square bracket
            // }

            //add 'out of' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'out of'
        }
        else 
        if(currentSegmentHasACloseBracketFlag) {//has a close bracket.
            console.log('AT %OF, GOT TO SEGMENT HAS CLOSE BRACKT')
            //if has a close bracket, means user just entered a bracketed caluculation,
            //e.g (5 x 20)% of ... or 25 x (30 + 20)% of ...
            //if it is (5 x 20)%, ie no prior arith outside of unit, 
            //then no need to insert square bracket, no action.
            //if there is prior arith operator outside of unit, e.g
            // 25 x (20 + 30)% ... the 25 x is outside of the unit.
            //so we put the square bracket at the begining of the unit,
            //beecomes 25 x [(20 + 30)% ... 
            //if it is 25 x ((20 + 30)%, becomes 25 x ([(20 + 30)%

 

            let indexOfSegmentWithFirstOpenBracket = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfSegment
            let indexOfOpenBracketWithinSegment = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfOpenBracketWithinSegmentString
            
            //if prior arith operator exists, then add '[' before the open
            //bracket of the unit
            if( currentSegmentHasPriorArithOperator) {
                //add the '[' before unit's open bracket e.g 25 x ((23 + 10) ... 
                //becomes 25 x ([(23 + 10) ...
                let tempStr = segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue
                let portion1 = tempStr.slice(0, indexOfOpenBracketWithinSegment)//exclusive of open bracket
                let portion2 = tempStr.slice(indexOfOpenBracketWithinSegment)//defualt end is length -1 
                tempStr = portion1 + '[' + portion2
                //copy back to real string
                segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue = tempStr


            }
            
            //add 'out of' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'out of'
    

        }
    }//else is a number segment
    
      


    if(allowToTakeSnapShotOfState) {
        takeASnapShotOfCurrentCalculationState()
    }


    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)
    console.log('COLLATED STRING IS: ', collatedString)
    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
    
}





const processInputForAddPercentKey = (newkeyinput) => {

    //to get valid '% of' input, current segment must be a
    //number, number with open bracket, or numbr with close bracket at end.
    //e.g   367% of,   or (5 x 63)% of .. , or (55% of ..
    //so 
    //1. must be a number with no open or close bracket, e.g 150 x 367% of .. , 
    //.In this case we put an open bracket in, segment becomes 150 x (367% of ...)
    //2. number  e.g 20 with open bracket, e.g 150 x (20% of .. ,means user already inserted 
    //open bracket in front of the 20, we dont need to put in another open bracket.
    //3. number e.g 20 with closing bracket e.g (150 x 20)% of ..., means
    //we go back to before (150 portion and add open bracket in, becomes
    //((150 x 20)% of ...

    //summary: so current segment must have a 0-9 number in it,
    //1. if current segment has no open or close bracket in it, 
    //and there is prior arith operator e.g 5 x 20%, we put
    //an open bracket in front of the 20, becomes 5 x (20% of ...
    //If there is no prior arith operator, e.g just 20 then we
    //dont put a bracket in frontn of 20, so becomes 20% of ...
    //2. if current segment has a closing bracket at end of it, e.g (5 x 20)%,
    //ie closeing bracket after 20, we go back to in front of the unit,
    //unit is the (5 x 20) portion, and insert an open bracket in front of it
    //, becomes ((5 x 20)% of ...
    //3. if current segmnt as an open bracket in front of it, e.g 5 x (20% of ...
    //open bracket in front of the 20, we dont put any brackets in, we just add
    //the '% of ' portion as per normal


    let allowToTakeSnapShotOfState = true 

    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTISANUMBER FLAG IS :' + currentSegmentIsANumberFlag)

    let currentSegmentHasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHAS OPENBRACKET FLAG IS :' + currentSegmentHasAnOpenBracketFlag)

    let currentSegmentHasACloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHASCLOSEBRACKET FLAG IS :' + currentSegmentHasACloseBracketFlag)
    
    let currentSegmentHasNoOpenOrCloseBracketFlag = ! /(\(|\))/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHAS NO OPEN OR CLOSE BRACKET FLAG IS :' + currentSegmentHasNoOpenOrCloseBracketFlag)
    
    let currentSegmentHasPriorArithOperator = /(\+|-|x|÷)/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT %OF INPUT, currentSegmentHasPriorArithOperator FLAG IS :' + currentSegmentHasPriorArithOperator)
    




    //first make sure that there has been no previous percentage related
    //operator in the whole calculatoion
    let collatedString = collateStringsIntoOneString(segmentsArray)
    let wholeCalculationHasAPercentOperatorFlag = /(of|add|deduct|to|is|then|deducted|added)/.test(collatedString)//returns a boolean

    if(wholeCalculationHasAPercentOperatorFlag) {
        //has prior percentage operator, so no action,
        //ignore input, return as is.

        //collate stirng from all segments, to return 
        let collatedString = collateStringsIntoOneString(segmentsArray)
        console.log('COLLATED STRING IS: ', collatedString)
        return objectToReturn = {
            screenMainTextLine1: collatedString,
            screenMainTextLine2: 'answer',
            screenMainTextLine3: ''
        }
    }



    
    //if gets to here then has no previous percent operator in the line
 
    //if current segment is not a number one, ignore user key input
    if( ! currentSegmentIsANumberFlag ){ //not a number segment
        //ignore
        //dont take snapshot
        allowToTakeSnapShotOfState = false
    }
    else {//is a number segment, so proceed
        if(currentSegmentHasNoOpenOrCloseBracketFlag) {
            if( ! currentSegmentHasPriorArithOperator) {//no prior arith operator.
                //25 x ((23 + 10% ... becomes 25 x ((23 + [10% of ...
                //or 25 becomes 25% of ...
                console.log('AT %OF, GOT TO NUMBER HAS NO OPEN OR CLOSE BRACKET, NO PRIOR ARITH OPERATOR')                
                //no priior arith operator, no closing or open bracket,
                // so we  just proceed to add '% of' portion
                
                //add 'outof' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'add'
                //add % sign to next segmet
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = '%'
            }
            else {//has prior arith operator.
                console.log('AT %OF, GOT TO NUMBER HAS NO BRACKETS, BUT HAS PRIOR ARITH OPERATOR')
                //e.g 5 x 20, so we put open brack in front of 20, 
                //becomes 5 x (20% of ...
    
                //put ( in front of current segment
                segmentsArray[currentSegmentIndex].stringValue = '[' + segmentsArray[currentSegmentIndex].stringValue
                //add 'out of' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'add'
                //add % sign in next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = '%'
            }
        }//if no open or close bracket

        else
        if(currentSegmentHasAnOpenBracketFlag) {//has an open bracket. 
            //if has an open bracket e.g (45 then becomes ([45
            console.log('AT %OF, GOT TO SEGMENT HAS OPEN BRACKT')
            //if has open bracket at start of segment, means user 
            //typed it in, e.g 5 x (20 , or ((20% of ...
            //if it is 5 x (20 , ie has prior arith operator, then we insert
            //a square bracket) 
            //. if it has no priior operator e.g ((20% of ... then we dont insert
            //the square bracket.
            
            // if(currentSegmentHasPriorArithOperator) {
                //has prior arth operator, so we insert a square bracket 
                //in front of the number e.g 23 x (45 out of, becomes 23 x ([45 out of ..

                //get index of first numeral in segment, note: no g flag
                let tempStr = segmentsArray[currentSegmentIndex].stringValue
                let indexOfFirstNumeral = tempStr.search(/[0-9]/)
                //need to slice and recombine, to insert the square bracket
                let portion1 = tempStr.slice(0, indexOfFirstNumeral)
                let portion2 = tempStr.slice(indexOfFirstNumeral)//defaults to eostring, ie lenght-1
                tempStr = portion1 + '[' + portion2//insert
                //copy back to real string
                segmentsArray[currentSegmentIndex].stringValue = tempStr
            // }
            // else {//has no prior operator
            //     //igonore, dont insert square bracket
            // }

            //add 'out of' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'add'
            //add % in next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = '%'
        }
        else 
        if(currentSegmentHasACloseBracketFlag) {//has a close bracket.
            console.log('AT %OF, GOT TO SEGMENT HAS CLOSE BRACKT')
            //if has a close bracket, means user just entered a bracketed caluculation,
            //e.g (5 x 20)% of ... or 25 x (30 + 20)% of ...
            //if it is (5 x 20)%, ie no prior arith outside of unit, 
            //then no need to insert square bracket, no action.
            //if there is prior arith operator outside of unit, e.g
            // 25 x (20 + 30)% ... the 25 x is outside of the unit.
            //so we put the square bracket at the begining of the unit,
            //beecomes 25 x [(20 + 30)% ... 
            //if it is 25 x ((20 + 30)%, becomes 25 x ([(20 + 30)%

 

            let indexOfSegmentWithFirstOpenBracket = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfSegment
            let indexOfOpenBracketWithinSegment = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfOpenBracketWithinSegmentString
            
            //if prior arith operator exists, then add '[' before the open
            //bracket of the unit
            if( currentSegmentHasPriorArithOperator) {
                //add the '[' before unit's open bracket e.g 25 x ((23 + 10) ... 
                //becomes 25 x ([(23 + 10) ...
                let tempStr = segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue
                let portion1 = tempStr.slice(0, indexOfOpenBracketWithinSegment)//exclusive of open bracket
                let portion2 = tempStr.slice(indexOfOpenBracketWithinSegment)//defualt end is length -1 
                tempStr = portion1 + '[' + portion2
                //copy back to real string
                segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue = tempStr


            }
            
            //add 'add' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'add'
             //add % in next segment
             currentSegmentIndex++
             segmentsArray[currentSegmentIndex] = {} //create
             segmentsArray[currentSegmentIndex].stringValue = '%'

        }
    }//else is a number segment
    
      

    if(allowToTakeSnapShotOfState) {
        takeASnapShotOfCurrentCalculationState()
    }
    
    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)
    console.log('COLLATED STRING IS: ', collatedString)
    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
    
}





const processInputForDeductPercentKey = (newkeyinput) => {

    //to get valid '% of' input, current segment must be a
    //number, number with open bracket, or numbr with close bracket at end.
    //e.g   367% of,   or (5 x 63)% of .. , or (55% of ..
    //so 
    //1. must be a number with no open or close bracket, e.g 150 x 367% of .. , 
    //.In this case we put an open bracket in, segment becomes 150 x (367% of ...)
    //2. number  e.g 20 with open bracket, e.g 150 x (20% of .. ,means user already inserted 
    //open bracket in front of the 20, we dont need to put in another open bracket.
    //3. number e.g 20 with closing bracket e.g (150 x 20)% of ..., means
    //we go back to before (150 portion and add open bracket in, becomes
    //((150 x 20)% of ...

    //summary: so current segment must have a 0-9 number in it,
    //1. if current segment has no open or close bracket in it, 
    //and there is prior arith operator e.g 5 x 20%, we put
    //an open bracket in front of the 20, becomes 5 x (20% of ...
    //If there is no prior arith operator, e.g just 20 then we
    //dont put a bracket in frontn of 20, so becomes 20% of ...
    //2. if current segment has a closing bracket at end of it, e.g (5 x 20)%,
    //ie closeing bracket after 20, we go back to in front of the unit,
    //unit is the (5 x 20) portion, and insert an open bracket in front of it
    //, becomes ((5 x 20)% of ...
    //3. if current segmnt as an open bracket in front of it, e.g 5 x (20% of ...
    //open bracket in front of the 20, we dont put any brackets in, we just add
    //the '% of ' portion as per normal



    let allowToTakeSnapShotOfState = true

    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTISANUMBER FLAG IS :' + currentSegmentIsANumberFlag)

    let currentSegmentHasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHAS OPENBRACKET FLAG IS :' + currentSegmentHasAnOpenBracketFlag)

    let currentSegmentHasACloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHASCLOSEBRACKET FLAG IS :' + currentSegmentHasACloseBracketFlag)
    
    let currentSegmentHasNoOpenOrCloseBracketFlag = ! /(\(|\))/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHAS NO OPEN OR CLOSE BRACKET FLAG IS :' + currentSegmentHasNoOpenOrCloseBracketFlag)
    
    let currentSegmentHasPriorArithOperator = /(\+|-|x|÷)/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT %OF INPUT, currentSegmentHasPriorArithOperator FLAG IS :' + currentSegmentHasPriorArithOperator)
    




    //first make sure that there has been no previous percentage related
    //operator in the whole calculatoion
    let collatedString = collateStringsIntoOneString(segmentsArray)
    let wholeCalculationHasAPercentOperatorFlag = /(of|add|deduct|to|is|then|deducted|added)/.test(collatedString)//returns a boolean

    if(wholeCalculationHasAPercentOperatorFlag) {
        //has prior percentage operator, so no action,
        //ignore input, return as is.

        //collate stirng from all segments, to return 
        let collatedString = collateStringsIntoOneString(segmentsArray)
        console.log('COLLATED STRING IS: ', collatedString)
        return objectToReturn = {
            screenMainTextLine1: collatedString,
            screenMainTextLine2: 'answer',
            screenMainTextLine3: ''
        }
    }



    
    //if gets to here then has no previous percent operator in the line
 
    //if current segment is not a number one, ignore user key input
    if( ! currentSegmentIsANumberFlag ){ //not a number segment
        //ignore
        //dont take snapshot
        allowToTakeSnapShotOfState = false
    }
    else {//is a number segment, so proceed
        if(currentSegmentHasNoOpenOrCloseBracketFlag) {
            if( ! currentSegmentHasPriorArithOperator) {//no prior arith operator.
                //25 x ((23 + 10% ... becomes 25 x ((23 + [10% of ...
                //or 25 becomes 25% of ...
                console.log('AT %OF, GOT TO NUMBER HAS NO OPEN OR CLOSE BRACKET, NO PRIOR ARITH OPERATOR')                
                //no priior arith operator, no closing or open bracket,
                // so we  just proceed to add '% of' portion
                
                //add 'outof' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'deduct'
                //add % sign to next segmet
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = '%'
            }
            else {//has prior arith operator.
                console.log('AT %OF, GOT TO NUMBER HAS NO BRACKETS, BUT HAS PRIOR ARITH OPERATOR')
                //e.g 5 x 20, so we put open brack in front of 20, 
                //becomes 5 x (20% of ...
    
                //put ( in front of current segment
                segmentsArray[currentSegmentIndex].stringValue = '[' + segmentsArray[currentSegmentIndex].stringValue
                //add 'out of' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'deduct'
                //add % sign in next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = '%'
            }
        }//if no open or close bracket

        else
        if(currentSegmentHasAnOpenBracketFlag) {//has an open bracket. 
            //if has an open bracket e.g (45 then becomes ([45
            console.log('AT %OF, GOT TO SEGMENT HAS OPEN BRACKT')
            //if has open bracket at start of segment, means user 
            //typed it in, e.g 5 x (20 , or ((20% of ...
            //if it is 5 x (20 , ie has prior arith operator, then we insert
            //a square bracket) 
            //. if it has no priior operator e.g ((20% of ... then we dont insert
            //the square bracket.
            
            // if(currentSegmentHasPriorArithOperator) {
                //has prior arth operator, so we insert a square bracket 
                //in front of the number e.g 23 x (45 out of, becomes 23 x ([45 out of ..

                //get index of first numeral in segment, note: no g flag
                let tempStr = segmentsArray[currentSegmentIndex].stringValue
                let indexOfFirstNumeral = tempStr.search(/[0-9]/)
                //need to slice and recombine, to insert the square bracket
                let portion1 = tempStr.slice(0, indexOfFirstNumeral)
                let portion2 = tempStr.slice(indexOfFirstNumeral)//defaults to eostring, ie lenght-1
                tempStr = portion1 + '[' + portion2//insert
                //copy back to real string
                segmentsArray[currentSegmentIndex].stringValue = tempStr
            // }
            // else {//has no prior operator
            //     //igonore, dont insert square bracket
            // }

            //add 'out of' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'deduct'
            //add % in next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = '%'
        }
        else 
        if(currentSegmentHasACloseBracketFlag) {//has a close bracket.
            console.log('AT %OF, GOT TO SEGMENT HAS CLOSE BRACKT')
            //if has a close bracket, means user just entered a bracketed caluculation,
            //e.g (5 x 20)% of ... or 25 x (30 + 20)% of ...
            //if it is (5 x 20)%, ie no prior arith outside of unit, 
            //then no need to insert square bracket, no action.
            //if there is prior arith operator outside of unit, e.g
            // 25 x (20 + 30)% ... the 25 x is outside of the unit.
            //so we put the square bracket at the begining of the unit,
            //beecomes 25 x [(20 + 30)% ... 
            //if it is 25 x ((20 + 30)%, becomes 25 x ([(20 + 30)%

 

            let indexOfSegmentWithFirstOpenBracket = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfSegment
            let indexOfOpenBracketWithinSegment = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfOpenBracketWithinSegmentString
            
            //if prior arith operator exists, then add '[' before the open
            //bracket of the unit
            if( currentSegmentHasPriorArithOperator) {
                //add the '[' before unit's open bracket e.g 25 x ((23 + 10) ... 
                //becomes 25 x ([(23 + 10) ...
                let tempStr = segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue
                let portion1 = tempStr.slice(0, indexOfOpenBracketWithinSegment)//exclusive of open bracket
                let portion2 = tempStr.slice(indexOfOpenBracketWithinSegment)//defualt end is length -1 
                tempStr = portion1 + '[' + portion2
                //copy back to real string
                segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue = tempStr


            }
            
            //add 'add' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'deduct'
             //add % in next segment
             currentSegmentIndex++
             segmentsArray[currentSegmentIndex] = {} //create
             segmentsArray[currentSegmentIndex].stringValue = '%'

        }
    }//else is a number segment
    


    if(allowToTakeSnapShotOfState) {
        takeASnapShotOfCurrentCalculationState()
    }
      
    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)
    console.log('COLLATED STRING IS: ', collatedString)
    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
    
}






const processInputForPercentChangeKey = (newKeyInput) => {

    //to get valid '% of' input, current segment must be a
    //number, number with open bracket, or numbr with close bracket at end.
    //e.g   367% of,   or (5 x 63)% of .. , or (55% of ..
    //so 
    //1. must be a number with no open or close bracket, e.g 150 x 367% of .. , 
    //.In this case we put an open bracket in, segment becomes 150 x (367% of ...)
    //2. number  e.g 20 with open bracket, e.g 150 x (20% of .. ,means user already inserted 
    //open bracket in front of the 20, we dont need to put in another open bracket.
    //3. number e.g 20 with closing bracket e.g (150 x 20)% of ..., means
    //we go back to before (150 portion and add open bracket in, becomes
    //((150 x 20)% of ...

    //summary: so current segment must have a 0-9 number in it,
    //1. if current segment has no open or close bracket in it, 
    //and there is prior arith operator e.g 5 x 20%, we put
    //an open bracket in front of the 20, becomes 5 x (20% of ...
    //If there is no prior arith operator, e.g just 20 then we
    //dont put a bracket in frontn of 20, so becomes 20% of ...
    //2. if current segment has a closing bracket at end of it, e.g (5 x 20)%,
    //ie closeing bracket after 20, we go back to in front of the unit,
    //unit is the (5 x 20) portion, and insert an open bracket in front of it
    //, becomes ((5 x 20)% of ...
    //3. if current segmnt as an open bracket in front of it, e.g 5 x (20% of ...
    //open bracket in front of the 20, we dont put any brackets in, we just add
    //the '% of ' portion as per normal



    let allowToTakeSnapShotOfState = true 

    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTISANUMBER FLAG IS :' + currentSegmentIsANumberFlag)

    let currentSegmentHasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHAS OPENBRACKET FLAG IS :' + currentSegmentHasAnOpenBracketFlag)

    let currentSegmentHasACloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHASCLOSEBRACKET FLAG IS :' + currentSegmentHasACloseBracketFlag)
    
    let currentSegmentHasNoOpenOrCloseBracketFlag = ! /(\(|\))/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHAS NO OPEN OR CLOSE BRACKET FLAG IS :' + currentSegmentHasNoOpenOrCloseBracketFlag)
    
    let currentSegmentHasPriorArithOperator = /(\+|-|x|÷)/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT %OF INPUT, currentSegmentHasPriorArithOperator FLAG IS :' + currentSegmentHasPriorArithOperator)
    




    //first make sure that there has been no previous percentage related
    //operator in the whole calculatoion
    let collatedString = collateStringsIntoOneString(segmentsArray)
    let wholeCalculationHasAPercentOperatorFlag = /(of|add|deduct|to|is|then|deducted|added)/.test(collatedString)//returns a boolean

    if(wholeCalculationHasAPercentOperatorFlag) {
        //has prior percentage operator, so no action,
        //ignore input, return as is.

        //collate stirng from all segments, to return 
        let collatedString = collateStringsIntoOneString(segmentsArray)
        console.log('COLLATED STRING IS: ', collatedString)
        return objectToReturn = {
            screenMainTextLine1: collatedString,
            screenMainTextLine2: 'answer',
            screenMainTextLine3: ''
        }
    }



    
    //if gets to here then has no previous percent operator in the line
 
    //if current segment is not a number one, ignore user key input
    if( ! currentSegmentIsANumberFlag ){ //not a number segment
        //ignore
        //dont take snapshot
        allowToTakeSnapShotOfState = false
    }
    else {//is a number segment, so proceed
        if(currentSegmentHasNoOpenOrCloseBracketFlag) {
            if( ! currentSegmentHasPriorArithOperator) {//no prior arith operator.
                //25 x ((23 + 10% ... becomes 25 x ((23 + [10% of ...
                //or 25 becomes 25% of ...
                console.log('AT %OF, GOT TO NUMBER HAS NO OPEN OR CLOSE BRACKET, NO PRIOR ARITH OPERATOR')                
                //no priior arith operator, no closing or open bracket,
                // so we  just proceed to add '% of' portion
                
                //insert 'from ' before current number, and 'to' in the next segment
                segmentsArray[currentSegmentIndex].stringValue = 'from ' + segmentsArray[currentSegmentIndex].stringValue
                //add 'of' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'to'
            }
            else {//has prior arith operator.
                console.log('AT %OF, GOT TO NUMBER HAS NO BRACKETS, BUT HAS PRIOR ARITH OPERATOR')
                //e.g 5 x 20, so we put open brack in front of 20, 
                //becomes 5 x (20% of ...
    
                //put ( in front of current segment
                segmentsArray[currentSegmentIndex].stringValue = '[' + 'from ' + segmentsArray[currentSegmentIndex].stringValue
                //add the % sign at end of this segmnt and 'of' in the next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'to'
            }
        }//no open or close bracket

        else
        if(currentSegmentHasAnOpenBracketFlag) {//has an open bracket. 
            console.log('AT %OF, GOT TO SEGMENT HAS OPEN BRACKT')
            //if has open bracket at start of segment, means user 
            //typed it in, e.g 5 x (20 , or ((20% of ...
            //if it is 5 x (20 , ie has prior arith operator, then we insert
            //a square bracket) 
            //. if it has no priior operator e.g ((20% of ... then we dont insert
            //the square bracket.
            
            // if(currentSegmentHasPriorArithOperator) {
                //has prior arth operator, so we insert a square bracket 
                //in front of the number

                //get index of first numeral in segment, note: no g flag
                let tempStr = segmentsArray[currentSegmentIndex].stringValue
                let indexOfFirstNumeral = tempStr.search(/[0-9]/)
                //need to slice and recombine, to insert the square bracket
                let portion1 = tempStr.slice(0, indexOfFirstNumeral)
                let portion2 = tempStr.slice(indexOfFirstNumeral)//defaults to eostring, ie lenght-1
                tempStr = portion1 + '[' + 'from ' + portion2//insert
                //copy back to real string
                segmentsArray[currentSegmentIndex].stringValue = tempStr
            // }
            // else {//has no prior operator
            //     //igonore, dont insert square bracket
            // }

            //add 'to' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'to'
        }
        else 
        if(currentSegmentHasACloseBracketFlag) {//has a close bracket.
            console.log('AT %OF, GOT TO SEGMENT HAS CLOSE BRACKT')
            //if has a close bracket, means user just entered a bracketed caluculation,
            //e.g (5 x 20)% of ... or 25 x (30 + 20)% of ...
            //if it is (5 x 20)%, ie no prior arith outside of unit, 
            //then no need to insert square bracket, no action.
            //if there is prior arith operator outside of unit, e.g
            // 25 x (20 + 30)% ... the 25 x is outside of the unit.
            //so we put the square bracket at the begining of the unit,
            //beecomes 25 x [(20 + 30)% ... 
            //if it is 25 x ((20 + 30)%, becomes 25 x ([(20 + 30)%

 

            let indexOfSegmentWithFirstOpenBracket = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfSegment
            let indexOfOpenBracketWithinSegment = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfOpenBracketWithinSegmentString
            
            //if prior arith operator exists, then add '[' before the open
            //bracket of the unit
            if( currentSegmentHasPriorArithOperator) {
                //add the '[' before unit's open bracket e.g 25 x ((23 + 10) ... 
                //becomes 25 x ([(23 + 10) ...
                let tempStr = segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue
                let portion1 = tempStr.slice(0, indexOfOpenBracketWithinSegment)//exclusive of open bracket
                let portion2 = tempStr.slice(indexOfOpenBracketWithinSegment)//defualt end is length -1 
                tempStr = portion1 + '[' + 'from ' + portion2
                //copy back to real string
                segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue = tempStr


            }
            
            //add 'of' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'to'
    

        }
    }//else is a number segment
    


    if(allowToTakeSnapShotOfState) {
        takeASnapShotOfCurrentCalculationState()
    }
      
    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)
    console.log('COLLATED STRING IS: ', collatedString)
    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
    
}


 






const processInputForAfterAddedPercentKey = (newkeyinput) => {


    //to get valid '% of' input, current segment must be a
    //number, number with open bracket, or numbr with close bracket at end.
    //e.g   367% of,   or (5 x 63)% of .. , or (55% of ..
    //so 
    //1. must be a number with no open or close bracket, e.g 150 x 367% of .. , 
    //.In this case we put an open bracket in, segment becomes 150 x (367% of ...)
    //2. number  e.g 20 with open bracket, e.g 150 x (20% of .. ,means user already inserted 
    //open bracket in front of the 20, we dont need to put in another open bracket.
    //3. number e.g 20 with closing bracket e.g (150 x 20)% of ..., means
    //we go back to before (150 portion and add open bracket in, becomes
    //((150 x 20)% of ...

    //summary: so current segment must have a 0-9 number in it,
    //1. if current segment has no open or close bracket in it, 
    //and there is prior arith operator e.g 5 x 20%, we put
    //an open bracket in front of the 20, becomes 5 x (20% of ...
    //If there is no prior arith operator, e.g just 20 then we
    //dont put a bracket in frontn of 20, so becomes 20% of ...
    //2. if current segment has a closing bracket at end of it, e.g (5 x 20)%,
    //ie closeing bracket after 20, we go back to in front of the unit,
    //unit is the (5 x 20) portion, and insert an open bracket in front of it
    //, becomes ((5 x 20)% of ...
    //3. if current segmnt as an open bracket in front of it, e.g 5 x (20% of ...
    //open bracket in front of the 20, we dont put any brackets in, we just add
    //the '% of ' portion as per normal



    let allowToTakeSnapShotOfState = true

    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTISANUMBER FLAG IS :' + currentSegmentIsANumberFlag)

    let currentSegmentHasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHAS OPENBRACKET FLAG IS :' + currentSegmentHasAnOpenBracketFlag)

    let currentSegmentHasACloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHASCLOSEBRACKET FLAG IS :' + currentSegmentHasACloseBracketFlag)
    
    let currentSegmentHasNoOpenOrCloseBracketFlag = ! /(\(|\))/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHAS NO OPEN OR CLOSE BRACKET FLAG IS :' + currentSegmentHasNoOpenOrCloseBracketFlag)
    
    let currentSegmentHasPriorArithOperator = /(\+|-|x|÷)/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT %OF INPUT, currentSegmentHasPriorArithOperator FLAG IS :' + currentSegmentHasPriorArithOperator)
    




    //first make sure that there has been no previous percentage related
    //operator in the whole calculatoion
    let collatedString = collateStringsIntoOneString(segmentsArray)
    let wholeCalculationHasAPercentOperatorFlag = /(of|add|deduct|to|is|then|deducted|added)/.test(collatedString)//returns a boolean

    if(wholeCalculationHasAPercentOperatorFlag) {
        //has prior percentage operator, so no action,
        //ignore input, return as is.

        //collate stirng from all segments, to return 
        let collatedString = collateStringsIntoOneString(segmentsArray)
        console.log('COLLATED STRING IS: ', collatedString)
        return objectToReturn = {
            screenMainTextLine1: collatedString,
            screenMainTextLine2: 'answer',
            screenMainTextLine3: ''
        }
    }



    
    //if gets to here then has no previous percent operator in the line
 
    //if current segment is not a number one, ignore user key input
    if( ! currentSegmentIsANumberFlag ){ //not a number segment
        //ignore
        //dont take snapshot
        allowToTakeSnapShotOfState = false
    }
    else {//is a number segment, so proceed
        if(currentSegmentHasNoOpenOrCloseBracketFlag) {
            if( ! currentSegmentHasPriorArithOperator) {//no prior arith operator.
                //25 x ((23 + 10% ... becomes 25 x ((23 + [10% of ...
                //or 25 becomes 25% of ...
                console.log('AT %OF, GOT TO NUMBER HAS NO OPEN OR CLOSE BRACKET, NO PRIOR ARITH OPERATOR')                
                //no priior arith operator, no closing or open bracket,
                // so we  just proceed to add '% of' portion
                
                //insert 'from ' before current number, and 'to' in the next segment
                segmentsArray[currentSegmentIndex].stringValue = 'is ' + segmentsArray[currentSegmentIndex].stringValue
                //add 'after added' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'after added'
                //add % sign in next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = '%'
            }
            else {//has prior arith operator.
                console.log('AT %OF, GOT TO NUMBER HAS NO BRACKETS, BUT HAS PRIOR ARITH OPERATOR')
                //e.g 5 x 20, so we put open brack in front of 20, 
                //becomes 5 x (20% of ...
    
                //put ( in front of current segment
                segmentsArray[currentSegmentIndex].stringValue = '[' + 'is ' + segmentsArray[currentSegmentIndex].stringValue
                //add the % sign at end of this segmnt and 'of' in the next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'after added'
                //add %sign at next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = '%'
            }
        }//no open or close bracket

        else
        if(currentSegmentHasAnOpenBracketFlag) {//has an open bracket. 
            console.log('AT %OF, GOT TO SEGMENT HAS OPEN BRACKT')
            //if has open bracket at start of segment, means user 
            //typed it in, e.g 5 x (20 , or ((20% of ...
            //if it is 5 x (20 , ie has prior arith operator, then we insert
            //a square bracket) 
            //. if it has no priior operator e.g ((20% of ... then we dont insert
            //the square bracket.
            
            // if(currentSegmentHasPriorArithOperator) {
                //has prior arth operator, so we insert a square bracket 
                //in front of the number

                //get index of first numeral in segment, note: no g flag
                let tempStr = segmentsArray[currentSegmentIndex].stringValue
                let indexOfFirstNumeral = tempStr.search(/[0-9]/)
                //need to slice and recombine, to insert the square bracket
                let portion1 = tempStr.slice(0, indexOfFirstNumeral)
                let portion2 = tempStr.slice(indexOfFirstNumeral)//defaults to eostring, ie lenght-1
                tempStr = portion1 + '[' + 'from ' + portion2//insert
                //copy back to real string
                segmentsArray[currentSegmentIndex].stringValue = tempStr
            // }
            // else {//has no prior operator
            //     //igonore, dont insert square bracket
            // }

            //add 'to' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'after added'
            //add %sign at next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = '%'
        }
        else 
        if(currentSegmentHasACloseBracketFlag) {//has a close bracket.
            console.log('AT %OF, GOT TO SEGMENT HAS CLOSE BRACKT')
            //if has a close bracket, means user just entered a bracketed caluculation,
            //e.g (5 x 20)% of ... or 25 x (30 + 20)% of ...
            //if it is (5 x 20)%, ie no prior arith outside of unit, 
            //then no need to insert square bracket, no action.
            //if there is prior arith operator outside of unit, e.g
            // 25 x (20 + 30)% ... the 25 x is outside of the unit.
            //so we put the square bracket at the begining of the unit,
            //beecomes 25 x [(20 + 30)% ... 
            //if it is 25 x ((20 + 30)%, becomes 25 x ([(20 + 30)%

 

            let indexOfSegmentWithFirstOpenBracket = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfSegment
            let indexOfOpenBracketWithinSegment = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfOpenBracketWithinSegmentString
            
            //if prior arith operator exists, then add '[' before the open
            //bracket of the unit
            if( currentSegmentHasPriorArithOperator) {
                //add the '[' before unit's open bracket e.g 25 x ((23 + 10) ... 
                //becomes 25 x ([(23 + 10) ...
                let tempStr = segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue
                let portion1 = tempStr.slice(0, indexOfOpenBracketWithinSegment)//exclusive of open bracket
                let portion2 = tempStr.slice(indexOfOpenBracketWithinSegment)//defualt end is length -1 
                tempStr = portion1 + '[' + 'is ' + portion2
                //copy back to real string
                segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue = tempStr


            }
            
            //add 'of' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'after added'
            //add %sign at next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = '%'
    

        }
    }//else is a number segment
    
      


    if(allowToTakeSnapShotOfState) {
        takeASnapShotOfCurrentCalculationState()
    }

    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)
    console.log('COLLATED STRING IS: ', collatedString)
    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
    
}








const processInputForAfterDeductedPercentKey = (newkeyinput) => {


    //to get valid '% of' input, current segment must be a
    //number, number with open bracket, or numbr with close bracket at end.
    //e.g   367% of,   or (5 x 63)% of .. , or (55% of ..
    //so 
    //1. must be a number with no open or close bracket, e.g 150 x 367% of .. , 
    //.In this case we put an open bracket in, segment becomes 150 x (367% of ...)
    //2. number  e.g 20 with open bracket, e.g 150 x (20% of .. ,means user already inserted 
    //open bracket in front of the 20, we dont need to put in another open bracket.
    //3. number e.g 20 with closing bracket e.g (150 x 20)% of ..., means
    //we go back to before (150 portion and add open bracket in, becomes
    //((150 x 20)% of ...

    //summary: so current segment must have a 0-9 number in it,
    //1. if current segment has no open or close bracket in it, 
    //and there is prior arith operator e.g 5 x 20%, we put
    //an open bracket in front of the 20, becomes 5 x (20% of ...
    //If there is no prior arith operator, e.g just 20 then we
    //dont put a bracket in frontn of 20, so becomes 20% of ...
    //2. if current segment has a closing bracket at end of it, e.g (5 x 20)%,
    //ie closeing bracket after 20, we go back to in front of the unit,
    //unit is the (5 x 20) portion, and insert an open bracket in front of it
    //, becomes ((5 x 20)% of ...
    //3. if current segmnt as an open bracket in front of it, e.g 5 x (20% of ...
    //open bracket in front of the 20, we dont put any brackets in, we just add
    //the '% of ' portion as per normal


    let allowToTakeSnapShotOfState = true 

    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTISANUMBER FLAG IS :' + currentSegmentIsANumberFlag)

    let currentSegmentHasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHAS OPENBRACKET FLAG IS :' + currentSegmentHasAnOpenBracketFlag)

    let currentSegmentHasACloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHASCLOSEBRACKET FLAG IS :' + currentSegmentHasACloseBracketFlag)
    
    let currentSegmentHasNoOpenOrCloseBracketFlag = ! /(\(|\))/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHAS NO OPEN OR CLOSE BRACKET FLAG IS :' + currentSegmentHasNoOpenOrCloseBracketFlag)
    
    let currentSegmentHasPriorArithOperator = /(\+|-|x|÷)/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT %OF INPUT, currentSegmentHasPriorArithOperator FLAG IS :' + currentSegmentHasPriorArithOperator)
    




    //first make sure that there has been no previous percentage related
    //operator in the whole calculatoion
    let collatedString = collateStringsIntoOneString(segmentsArray)
    let wholeCalculationHasAPercentOperatorFlag = /(of|add|deduct|to|is|then|deducted|added)/.test(collatedString)//returns a boolean

    if(wholeCalculationHasAPercentOperatorFlag) {
        //has prior percentage operator, so no action,
        //ignore input, return as is.

        //collate stirng from all segments, to return 
        let collatedString = collateStringsIntoOneString(segmentsArray)
        console.log('COLLATED STRING IS: ', collatedString)
        return objectToReturn = {
            screenMainTextLine1: collatedString,
            screenMainTextLine2: 'answer',
            screenMainTextLine3: ''
        }
    }



    
    //if gets to here then has no previous percent operator in the line
 
    //if current segment is not a number one, ignore user key input
    if( ! currentSegmentIsANumberFlag ){ //not a number segment
        //ignore
        //dont take snapshot
        allowToTakeSnapShotOfState = false
    }
    else {//is a number segment, so proceed
        if(currentSegmentHasNoOpenOrCloseBracketFlag) {
            if( ! currentSegmentHasPriorArithOperator) {//no prior arith operator.
                //25 x ((23 + 10% ... becomes 25 x ((23 + [10% of ...
                //or 25 becomes 25% of ...
                console.log('AT %OF, GOT TO NUMBER HAS NO OPEN OR CLOSE BRACKET, NO PRIOR ARITH OPERATOR')                
                //no priior arith operator, no closing or open bracket,
                // so we  just proceed to add '% of' portion
                
                //insert 'from ' before current number, and 'to' in the next segment
                segmentsArray[currentSegmentIndex].stringValue = 'is ' + segmentsArray[currentSegmentIndex].stringValue
                //add 'after added' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'after deducted'
                //add % sign in next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = '%'
            }
            else {//has prior arith operator.
                console.log('AT %OF, GOT TO NUMBER HAS NO BRACKETS, BUT HAS PRIOR ARITH OPERATOR')
                //e.g 5 x 20, so we put open brack in front of 20, 
                //becomes 5 x (20% of ...
    
                //put ( in front of current segment
                segmentsArray[currentSegmentIndex].stringValue = '[' + 'is ' + segmentsArray[currentSegmentIndex].stringValue
                //add the % sign at end of this segmnt and 'of' in the next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'after deducted'
                //add %sign at next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = '%'
            }
        }//no open or close bracket

        else
        if(currentSegmentHasAnOpenBracketFlag) {//has an open bracket. 
            console.log('AT %OF, GOT TO SEGMENT HAS OPEN BRACKT')
            //if has open bracket at start of segment, means user 
            //typed it in, e.g 5 x (20 , or ((20% of ...
            //if it is 5 x (20 , ie has prior arith operator, then we insert
            //a square bracket) 
            //. if it has no priior operator e.g ((20% of ... then we dont insert
            //the square bracket.
            
            // if(currentSegmentHasPriorArithOperator) {
                //has prior arth operator, so we insert a square bracket 
                //in front of the number

                //get index of first numeral in segment, note: no g flag
                let tempStr = segmentsArray[currentSegmentIndex].stringValue
                let indexOfFirstNumeral = tempStr.search(/[0-9]/)
                //need to slice and recombine, to insert the square bracket
                let portion1 = tempStr.slice(0, indexOfFirstNumeral)
                let portion2 = tempStr.slice(indexOfFirstNumeral)//defaults to eostring, ie lenght-1
                tempStr = portion1 + '[' + 'from ' + portion2//insert
                //copy back to real string
                segmentsArray[currentSegmentIndex].stringValue = tempStr
            // }
            // else {//has no prior operator
            //     //igonore, dont insert square bracket
            // }

            //add 'to' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'after deducted'
            //add %sign at next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = '%'
        }
        else 
        if(currentSegmentHasACloseBracketFlag) {//has a close bracket.
            console.log('AT %OF, GOT TO SEGMENT HAS CLOSE BRACKT')
            //if has a close bracket, means user just entered a bracketed caluculation,
            //e.g (5 x 20)% of ... or 25 x (30 + 20)% of ...
            //if it is (5 x 20)%, ie no prior arith outside of unit, 
            //then no need to insert square bracket, no action.
            //if there is prior arith operator outside of unit, e.g
            // 25 x (20 + 30)% ... the 25 x is outside of the unit.
            //so we put the square bracket at the begining of the unit,
            //beecomes 25 x [(20 + 30)% ... 
            //if it is 25 x ((20 + 30)%, becomes 25 x ([(20 + 30)%

 

            let indexOfSegmentWithFirstOpenBracket = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfSegment
            let indexOfOpenBracketWithinSegment = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfOpenBracketWithinSegmentString
            
            //if prior arith operator exists, then add '[' before the open
            //bracket of the unit
            if( currentSegmentHasPriorArithOperator) {
                //add the '[' before unit's open bracket e.g 25 x ((23 + 10) ... 
                //becomes 25 x ([(23 + 10) ...
                let tempStr = segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue
                let portion1 = tempStr.slice(0, indexOfOpenBracketWithinSegment)//exclusive of open bracket
                let portion2 = tempStr.slice(indexOfOpenBracketWithinSegment)//defualt end is length -1 
                tempStr = portion1 + '[' + 'is ' + portion2
                //copy back to real string
                segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue = tempStr


            }
            
            //add 'of' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'after deducted'
            //add %sign at next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = '%'
    

        }
    }//else is a number segment
    
      


    if(allowToTakeSnapShotOfState) {
        takeASnapShotOfCurrentCalculationState()
    }

    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)
    console.log('COLLATED STRING IS: ', collatedString)
    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
    
}








const processInputForIfPercentIsKey = (newkeyinput) => {


    //to get valid '% of' input, current segment must be a
    //number, number with open bracket, or numbr with close bracket at end.
    //e.g   367% of,   or (5 x 63)% of .. , or (55% of ..
    //so 
    //1. must be a number with no open or close bracket, e.g 150 x 367% of .. , 
    //.In this case we put an open bracket in, segment becomes 150 x (367% of ...)
    //2. number  e.g 20 with open bracket, e.g 150 x (20% of .. ,means user already inserted 
    //open bracket in front of the 20, we dont need to put in another open bracket.
    //3. number e.g 20 with closing bracket e.g (150 x 20)% of ..., means
    //we go back to before (150 portion and add open bracket in, becomes
    //((150 x 20)% of ...

    //summary: so current segment must have a 0-9 number in it,
    //1. if current segment has no open or close bracket in it, 
    //and there is prior arith operator e.g 5 x 20%, we put
    //an open bracket in front of the 20, becomes 5 x (20% of ...
    //If there is no prior arith operator, e.g just 20 then we
    //dont put a bracket in frontn of 20, so becomes 20% of ...
    //2. if current segment has a closing bracket at end of it, e.g (5 x 20)%,
    //ie closeing bracket after 20, we go back to in front of the unit,
    //unit is the (5 x 20) portion, and insert an open bracket in front of it
    //, becomes ((5 x 20)% of ...
    //3. if current segmnt as an open bracket in front of it, e.g 5 x (20% of ...
    //open bracket in front of the 20, we dont put any brackets in, we just add
    //the '% of ' portion as per normal



    let allowToTakeSnapShotOfState = true

    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTISANUMBER FLAG IS :' + currentSegmentIsANumberFlag)

    let currentSegmentHasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHAS OPENBRACKET FLAG IS :' + currentSegmentHasAnOpenBracketFlag)

    let currentSegmentHasACloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHASCLOSEBRACKET FLAG IS :' + currentSegmentHasACloseBracketFlag)
    
    let currentSegmentHasNoOpenOrCloseBracketFlag = ! /(\(|\))/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT %OF INPUT, CURRENTSEGMENTHAS NO OPEN OR CLOSE BRACKET FLAG IS :' + currentSegmentHasNoOpenOrCloseBracketFlag)
    
    let currentSegmentHasPriorArithOperator = /(\+|-|x|÷)/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT %OF INPUT, currentSegmentHasPriorArithOperator FLAG IS :' + currentSegmentHasPriorArithOperator)
    




    //first make sure that there has been no previous percentage related
    //operator in the whole calculatoion
    let collatedString = collateStringsIntoOneString(segmentsArray)
    let wholeCalculationHasAPercentOperatorFlag = /(of|add|deduct|to|is|then|deducted|added)/.test(collatedString)//returns a boolean

    if(wholeCalculationHasAPercentOperatorFlag) {
        //has prior percentage operator, so no action,
        //ignore input, return as is.

        //collate stirng from all segments, to return 
        let collatedString = collateStringsIntoOneString(segmentsArray)
        console.log('COLLATED STRING IS: ', collatedString)
        return objectToReturn = {
            screenMainTextLine1: collatedString,
            screenMainTextLine2: 'answer',
            screenMainTextLine3: ''
        }
    }



    
    //if gets to here then has no previous percent operator in the line
 
    //if current segment is not a number one, ignore user key input
    if( ! currentSegmentIsANumberFlag ){ //not a number segment
        //ignore
        //dont take snapshot
        allowToTakeSnapShotOfState = false
    }
    else {//is a number segment, so proceed
        if(currentSegmentHasNoOpenOrCloseBracketFlag) {
            if( ! currentSegmentHasPriorArithOperator) {//no prior arith operator.
                //25 x ((23 + 10% ... becomes 25 x ((23 + [10% of ...
                //or 25 becomes 25% of ...
                console.log('AT %OF, GOT TO NUMBER HAS NO OPEN OR CLOSE BRACKET, NO PRIOR ARITH OPERATOR')                
                //no priior arith operator, no closing or open bracket,
                // so we  just proceed to add '% of' portion
                
                //add the % sign at end of this segmnt and 'of' in the next segment
                segmentsArray[currentSegmentIndex].stringValue = 'if ' + segmentsArray[currentSegmentIndex].stringValue + '%'
                //add 'of' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'is'
            }
            else {//has prior arith operator.
                console.log('AT %OF, GOT TO NUMBER HAS NO BRACKETS, BUT HAS PRIOR ARITH OPERATOR')
                //e.g 5 x 20, so we put open brack in front of 20, 
                //becomes 5 x (20% of ...
    
                //put ( in front of current segment
                segmentsArray[currentSegmentIndex].stringValue = '[if ' + segmentsArray[currentSegmentIndex].stringValue
                //add the % sign at end of this segmnt and 'of' in the next segment
                segmentsArray[currentSegmentIndex].stringValue += '%'
                //add 'of' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'is'
            }
        }//if no open or close bracket

        else
        if(currentSegmentHasAnOpenBracketFlag) {//has an open bracket. 
            console.log('AT %OF, GOT TO SEGMENT HAS OPEN BRACKT')
            //if has open bracket at start of segment, means user 
            //typed it in, e.g 5 x (20 , or ((20% of ...
            //if it is 5 x (20 , ie has prior arith operator, then we insert
            //a square bracket) 
            //. if it has no priior operator e.g ((20% of ... then we dont insert
            //the square bracket.
            
            // if(currentSegmentHasPriorArithOperator) {
                //has prior arth operator, so we insert a square bracket 
                //in front of the number

                //get index of first numeral in segment, note: no g flag
                let tempStr = segmentsArray[currentSegmentIndex].stringValue
                let indexOfFirstNumeral = tempStr.search(/[0-9]/)
                //need to slice and recombine, to insert the square bracket
                let portion1 = tempStr.slice(0, indexOfFirstNumeral)
                let portion2 = tempStr.slice(indexOfFirstNumeral)//defaults to eostring, ie lenght-1
                tempStr = portion1 + '[if ' + portion2//insert
                //copy back to real string
                segmentsArray[currentSegmentIndex].stringValue = tempStr
            // }
            // else {//has no prior operator
            //     //igonore, dont insert square bracket
            // }

            //add the % sign at end of this segmnt and 'of' in the next segment
            segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue + '%'
            //add 'of' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'is'
        }
        else 
        if(currentSegmentHasACloseBracketFlag) {//has a close bracket.
            console.log('AT %OF, GOT TO SEGMENT HAS CLOSE BRACKT')
            //if has a close bracket, means user just entered a bracketed caluculation,
            //e.g (5 x 20)% of ... or 25 x (30 + 20)% of ...
            //if it is (5 x 20)%, ie no prior arith outside of unit, 
            //then no need to insert square bracket, no action.
            //if there is prior arith operator outside of unit, e.g
            // 25 x (20 + 30)% ... the 25 x is outside of the unit.
            //so we put the square bracket at the begining of the unit,
            //beecomes 25 x [(20 + 30)% ... 
            //if it is 25 x ((20 + 30)%, becomes 25 x ([(20 + 30)%

 

            let indexOfSegmentWithFirstOpenBracket = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfSegment
            let indexOfOpenBracketWithinSegment = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfOpenBracketWithinSegmentString
            
            //if prior arith operator exists, then add '[' before the open
            //bracket of the unit
            if( currentSegmentHasPriorArithOperator) {
                //add the '[' before unit's open bracket e.g 25 x ((23 + 10) ... 
                //becomes 25 x ([(23 + 10) ...
                let tempStr = segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue
                let portion1 = tempStr.slice(0, indexOfOpenBracketWithinSegment)//exclusive of open bracket
                let portion2 = tempStr.slice(indexOfOpenBracketWithinSegment)//defualt end is length -1 
                tempStr = portion1 + '[if ' + portion2
                //copy back to real string
                segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue = tempStr


            }
            
            //add the % sign at end of this segmnt and 'of' in the next segment
            segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue + '%'
            //add 'of' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'is'
    

        }
    }//else is a number segment
    
      


    if(allowToTakeSnapShotOfState) {
        takeASnapShotOfCurrentCalculationState()
    }

    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)
    console.log('COLLATED STRING IS: ', collatedString)
    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
    
    
}






const processInputForThenKey = (newkeyinput) => {


    //when this key is pressed, line is in format of:
    //if 25% is 258 
    //so move to next segment and add 'then', becomes
    //'if 25% iss 258 then'


    //move to next segment and insert 'then'
    currentSegmentIndex++
    segmentsArray[currentSegmentIndex] = {}//create 
    segmentsArray[currentSegmentIndex].stringValue = 'then'

    //move to next segment and add the "%" sign
    currentSegmentIndex++
    segmentsArray[currentSegmentIndex] = {}//create 
    segmentsArray[currentSegmentIndex].stringValue = '%'

    //move to next segment and add 'would be'
    // currentSegmentIndex++
    // segmentsArray[currentSegmentIndex] = {}//create 
    // segmentsArray[currentSegmentIndex].stringValue = 'would be'

    // //move pointer back to point to the '%' sign segment
    // currentSegmentIndex--

    

    takeASnapShotOfCurrentCalculationState()

    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)
    console.log('COLLATED STRING IS: ', collatedString)
    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }

}









const processInputForBackSpaceKey = (newKeyInput) => {

    let objectToReturn = {}
 
    //if there is only 1 snapshot left in the timemachine array, means at last char
    //so do a clearall and return, treat it as a clearall
    if(timeMachineArrayOfSegmentsArraySnapShots.length <=1) {
        return clearAllReadyForNextCalculation()
    }


    //if gets here, measns there are at least 2 snapshots


    //copy snapshot of previous state into segments array

    timeMachineArrayOfSegmentsArraySnapShots.pop()//remove current snapshot
    console.log('**AT BACKSPACE KEY: AFTER POPPING LAST SNAPSHOT, THE TIMEMACHINEARRAY IS ',timeMachineArrayOfSegmentsArraySnapShots)
    let indexOfLastSnapShot = timeMachineArrayOfSegmentsArraySnapShots.length -1
    console.log('**AT BACKSPACE KEY: INDEXOFLASTSNAPSHOT IS:',indexOfLastSnapShot)
    
    segmentsArray = JSON.parse(JSON.stringify(timeMachineArrayOfSegmentsArraySnapShots[indexOfLastSnapShot].segmentsArraySnapShot))
    console.log('**AT BACKSPACE KEY: AFTER COPYING FROM SNAPSHOT, THE SEGMENTS ARRAY IS ',segmentsArray)

    //set the index of current segmentsarray to the last segment in that array
    currentSegmentIndex = segmentsArray.length - 1

     //collate stirng from all segments, to return 
     collatedString = collateStringsIntoOneString(segmentsArray)
     console.log('COLLATED STRING IS: ', collatedString)
     return objectToReturn = {
         screenMainTextLine1: collatedString,
         screenMainTextLine2: 'answer',
         screenMainTextLine3: ''
     }
 

}//method backspace key









const collateStringsIntoOneString = (arr) => {//arr is array of objects

    //TO DLETE
    console.log('SEGMENTS ARRAY IS ', arr)
    //colate all the string values of all the segments together to send to 
    //calculate method
    let collatedString = "";

    arr.forEach((obj, index) => {
        collatedString = collatedString + obj.stringValue + ' '
    })

    return collatedString
}




 

const getParenthesesNetValueFromString = (passedInString) => {

    console.log('AT GETPARENTHESIS NETTVALUE, PASSED IN STRING IS '  + passedInString)

    let nettValue = 0
    for( let i = passedInString.length-1; i>=0; i--) {
        if(passedInString[i] === '(') {
            nettValue--
            console.log('INSIDE LOOP, NETVALUE IS ' + nettValue)
        }
        if(passedInString[i] === ')') {
            nettValue++
            console.log('INSIDE LOOP, NETVALUE IS ' + nettValue)
             
        }
        


    }

    return nettValue
}
 





const findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit = (arr) => {
    console.log(' GOT TO START OF FINDINDXOFSEGMENT')

    //passed in string must have close bracket at/near end of string.
    //, must be before open bracket, counting backwards from eostring.
    //passed in string is in form of ((2 x 50) + 77) ...
    //start from end of string and go backwards, if sees a
    // ), then it is +1, if sees a ( then it is -1, keep going
    //until nett is 0. Assumes that the last char is a )
    //e.g 77), last char is a ) else result will not be correct.

    let indexOfSegmentWithFirstOpenBracket = 0
    let nettBracketValue = 0
    for( i = arr.length -1; i>=0; i--) {
        //go thruough each segment from end to beginig of the array
        let tempStr = arr[i].stringValue
        
        for( let stringIndex = tempStr.length - 1; stringIndex >= 0; stringIndex--) {
            
            //go through each char of the string of each segment
           
            if(tempStr.charAt(stringIndex) === ')') {
                nettBracketValue++
                console.log('NETVALUE COUNT IS ' + nettBracketValue)
            }
            if(tempStr.charAt(stringIndex) === '(') {
                nettBracketValue--
                console.log('NETVALUE COUNT IS ' + nettBracketValue)
                //if found equal number ) and ( brackets, then
                //found the segment, save the index of the segment
                if(nettBracketValue === 0) {
                    indexOfSegmentWithFirstOpenBracket = i
                    let indexOfOpenBracketWithinSegmentString = stringIndex
                    //return immediately so wont continue and get next 0 nett value
                    return {
                        indexOfSegment: indexOfSegmentWithFirstOpenBracket,
                        indexOfOpenBracketWithinSegmentString: indexOfOpenBracketWithinSegmentString
                    }
                }
            }
        }
    }
        

    //if not found, 
    return {
        indexOfSegment: 0,
        indexOfOpenBracketWithinSegmentString: 0
    }

}//mthod findindexofsegment








const calculateResultOfWholeCalculation = (passedInString) => {

    console.log('******GOT TO CALCULALTRESULT OF WHOLE CALCULATION')

    // let wholeString = collateStringsIntoOneString(segmentsArray)
    let wholeString = passedInString

    let stringHasPercentCalculationFlag = /(of|add|deduct|to|added|deducted|if)/.test(wholeString)
    console.log('STRING HAS PERCENT CALCULAION FLAG IS : ' + stringHasPercentCalculationFlag)
    
    let stringHasOpenSquareBracketFlag = /\[/.test(wholeString)
    console.log('STRING HAS OPEN SQUARE BRACKET [ FLAG IS : ' + stringHasOpenSquareBracketFlag)
    
    let stringHasCloseSquareBracketFlag = /\]/.test(wholeString)
    console.log('STRING HAS CLOSE SQUARE BRACKET ] FLAG IS : ' + stringHasCloseSquareBracketFlag)
    

    //if parenthesis open and close dont equal, means calculation incomplete
    if(getParenthesesNetValueFromString(wholeString) !== 0) {
        console.log('AT CALCULATERESULT, BRACKETS INCOMPLETE')
        return "incomplete"
    }


    //if string has open square bracket [ but not close ssquare bracket ], means incomplete
    if(stringHasOpenSquareBracketFlag && (! stringHasCloseSquareBracketFlag)) {
        console.log('AT CALCULATERESULT, SQUARE BRACKETS INCOMPLETE')
        return "incomplete"
    }
    

    //if string has percent calculation, process thaat first

    //if has percent calculation in it, 
    if(stringHasPercentCalculationFlag) {

        let resultOfPercentCalculation = ""//default
        //if has ssquare brackets, remove the square brackekts and reduce any parenthesis
        //in it e.g [(22 x 5)% of ((20 + 5) x 5)] becomes 110% of 125, then pass to 
        //calculate percentage method
        if(stringHasOpenSquareBracketFlag && stringHasCloseSquareBracketFlag) {
            //get index of the open square bracket in the string
            let indexOfOpenSquareBracket = wholeString.search(/\[/)
            //get index of the close square bracket
            let indexOfCloseSquareBracket = wholeString.search(/\]/)

            //get content of square brackets, exclude the square brackets themselves
            let contentOfSquareBrackets = wholeString.slice(indexOfOpenSquareBracket+1, indexOfCloseSquareBracket)
            console.log('CONTENT OF SQUARE BRACKETS IS ' + contentOfSquareBrackets)
            //now reduce any parenthesis content to single values e.g ((23 + 5) x 2) becomes 56
            contentOfSquareBrackets = reduceBracketsPairContentsIntoSingleValues(contentOfSquareBrackets)
            console.log('****AFTER REDUCED PARENTHESIS, CONTENT OF SQUARE BRACKETS IS ' + contentOfSquareBrackets)
            //now calculate the percentage calculation and get a single number result
            contentOfSquareBrackets = calculateResultOfPercentCalculation(contentOfSquareBrackets)
            //now replace the pair of square brackets and its content with a singl value
            let portion1 = wholeString.slice(0, indexOfOpenSquareBracket)//excludes the [ bracket
            let portion2 = wholeString.slice(indexOfCloseSquareBracket+1)//excludes the ] bracket
            //copy backk to real string with new single value in place of square brackets
            wholeString = portion1 + contentOfSquareBrackets + portion2
            console.log('*** AFTER REDUCING PERCENT CALCULATION TO SINGLE VLUE, WHOLESTRING IS '+ wholeString)
        }
        else {//no square brackets, ie only percent calculation is on the string, no arith operators outside of square brackets
            //only percent calc exists, no operator outside of square breackets

            //there is no square brackets if gets here, but there may be round brackets,
            //e.g 20 add (2 x 5)%, so need to reduce the round brackets before passing in to
            //calculate percentage calculation, becomes 20 add 10% when passed into calculateresultofpercentcalcualtion
            wholeString = reduceBracketsPairContentsIntoSingleValues(wholeString)
            //calculate the percetn calculation
            wholeString =  calculateResultOfPercentCalculation(wholeString)
        }
    }//if has percent calc


    //when gets here, string still has alll the round brackets, except content of square brackets
    //ie percentage, is replace by a single value, so now stirng is eg 23 x ((2 + 3) x 7) x 777 
    ///777 is result of % calculation ie square bracket content
    //now calculate the value of the whole string by passing it to eval()

    //need to replace 'x' with '*' and '÷' with '/' for js to evaluate string
     //replace 'x' with '*', and '÷' with '/' for js to evaluate automatically
     wholeString = wholeString.replace(/x/g, '*')
     wholeString = wholeString.replace(/÷/g, '/')
     console.log('AT CALCULATE WHOLESTRING, AFTER OPERATOR REPLACEMTNS, WHOLESTIRNG IS ' + wholeString)
  
    let resultToReturn = eval(wholeString)

    console.log('*** RESULT OF WHOLE STRING, AFTER EVAL() IS ' + resultToReturn)

    return resultToReturn

}








const reduceBracketsPairContentsIntoSingleValues = (passedInString) => {

    //reduces pair bracket content into single value, 
    //e.g ((20+ 3) x 5) becomes (23 x 5) first pass, (115) second pass, 115 third pass
    //. so ((20 + 3) x 5)% of ((110 + 200) x 2) becomes 115% of 420
    //works for both arith and percetn expressions, no difference.


    let tempStr = passedInString


    while(/\(/.test(tempStr)) {

        //do while there is still '(' existing
        let nettValue = +1//so when finds first open paren, === 0
        // let charIndex = 0
        //get index of first ) close parenthesis
        let indexOfFirstCloseParen = tempStr.search(/\)/) //-1 if not exist
        let indexOfMatchingOpenParen = -1//default not found
        //now move back till meets first ( open paren, means it belong to the found close paren )
        for(let i=indexOfFirstCloseParen; i>=0; i--) {
            if(tempStr[i] === '(') {
                nettValue--
                if(nettValue === 0) {
                    indexOfMatchingOpenParen = i
                }
            }
        }

        //now slice the portion of found paren pair to send to evaluation
        let stringOfParenthesisPairContent = tempStr.slice(indexOfMatchingOpenParen, indexOfFirstCloseParen +1)
        console.log('*****FOUND FIRST PAIR OF PAREN, CONTENT IS ' + stringOfParenthesisPairContent)
         
        //replace 'x' with '*', and '÷' with '/' for js to evaluate automatically
        stringOfParenthesisPairContent = stringOfParenthesisPairContent.replace(/x/g, '*')
        stringOfParenthesisPairContent = stringOfParenthesisPairContent.replace(/÷/g, '/')
        console.log('AFTER OPERATOR REPLACEMTNS, STIRNG IS ' + stringOfParenthesisPairContent)
        //auto javascript evaluation via eval
        let resultOfParensContent = eval(stringOfParenthesisPairContent)
        console.log('***RESULT OF PAREN PAIR CONTENT IS' + stringOfParenthesisPairContent + '=' + resultOfParensContent)
        //get the string without the portion of the brackets pair
        let portion1 = tempStr.slice(0, indexOfMatchingOpenParen)//excludes the open bracket
        let portion2 = tempStr.slice(indexOfFirstCloseParen+1)//excludes the closig bracket
        //now put the string back, with the brackets pair portion replaced by a single result
        let updatedStr = portion1 + resultOfParensContent + portion2
        console.log('UPDATED STRING AFTER SUSTITUTE BRACKETS PAIR FOR ITS RESULT IS ' + updatedStr)
        
        //copy back to real string
        tempStr = updatedStr
        
        
    }//while


    //return updated string with pair brackets replace by single value
    return tempStr

}







const calculateResultOfPercentCalculation = (passedInString) => {

    //passed in string in syntax of eg. 23% of 50, there are on () brackets in the string,
    //they have been removed prior to callng this method

    console.log('STRING PASSED INTO CALCULATE PERCENTAGE IS ' + passedInString)


    let currentCalculationType;
    let result = ""

    //get the 2 operands, 3 operands if 'if%is' calculation type
    //passed in string in syntax of eg. 23% of 50, there are on () brackets in the string,
    //they have been removed prior to callng this method

    //find operand 1
    let startIndexOfOperand1 = passedInString.search(/[0-9]/)
    //now cut from start index to eostring
    let tempStr = passedInString.slice(startIndexOfOperand1)
    //end of operand1 is the first space, counting from the first numeral of operand1
    let endIndexOfOperand1 = tempStr.search(/ |\%/)
    let operand1ValueString = tempStr.slice(0, endIndexOfOperand1)
    console.log('*** ##OPERAND1 STRING EXTRACTED IS ' + operand1ValueString)
   
    //find operand 2
    tempStr = tempStr.slice(endIndexOfOperand1+1)//remove opeerand1 from string
    let startIndexOfOperand2 = tempStr.search(/[0-9]/) 
    tempStr = tempStr.slice(startIndexOfOperand2)
    console.log('AT EXTRACTION OF OPERAND2, TEMPSTR IS:' + tempStr)
    //if there is a space or % after opereand2, e.g if operand3 exists, then eooperand2 is 
    //0-indexofendoperand2
    let endIndexOfOperand2;

    //string is now eg either 175   no space after, or 175% nospaceafter, of 175 then ... if operand3 exists
    if(/ |\%/.test(tempStr)) {
        console.log('FOUND A SPACE OR % SIGN AFTER OPERAND2')
        endIndexOfOperand2 = tempStr.search(/( |\%)/)//$ means to the eoline
    }
    else {//no % or space, just endof line, so we add an extra char to cover the last char of opeand2
        console.log('NO SPACE OR % FOUND AFTER OPEREND2')
        endIndexOfOperand2 = tempStr.length
    }


    console.log('INDEX OF EOOPEAND2 IS '+endIndexOfOperand2)
    let operand2ValueString = tempStr.slice(0, endIndexOfOperand2)
    console.log('*** ##OPERAND2 STRING EXTRACTED IS ' + operand2ValueString)


    
    //find operand 3, only for if%is calculation type
    tempStr = tempStr.slice(endIndexOfOperand2+1)//remove opeerand1 from string
    let startIndexOfOperand3 = tempStr.search(/[0-9]/) 
    tempStr = tempStr.slice(startIndexOfOperand3)
    console.log('AT EXTRACTION OF OPERAND3, TEMPSTR IS:' + tempStr)
    //if there is a space or % after opereand3, 
    let endIndexOfOperand3;

    //string is now eg either 175   no space after, or 175% nospaceafter, 
    if(/ |\%/.test(tempStr)) {
        console.log('FOUND A SPACE OR % SIGN AFTER OPERAND3')
        endIndexOfOperand3 = tempStr.search(/( |\%)/)//$ means to the eoline
    }
    else {//no % or space, just endof line, so we add an extra char to cover the last char of opeand2
        console.log('NO SPACE OR % FOUND AFTER OPEREND3')
        endIndexOfOperand3 = tempStr.length
    }


    console.log('INDEX OF EOOPEAND3 IS '+endIndexOfOperand3)
    let operand3ValueString = tempStr.slice(0, endIndexOfOperand3)
    console.log('*** ##OPERAND3 STRING EXTRACTED IS ' + operand3ValueString)

      


    if(/%/.test(passedInString) && (/of/i.test(passedInString))) {
        console.log('AT PERCENTOF, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        //% of calculation type
        result = (Number(operand1ValueString)/100) * Number(operand2ValueString) 
    }
    else
    if(/out/i.test(passedInString) && (/of/i.test(passedInString))) {
        console.log('AT OUTOF, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        //out of , calculation type
        result = (Number(operand1ValueString)/Number(operand2ValueString)) * 100
    }
    else
    if(/ add /i.test(passedInString)) {//must have space around 'add' so regex wont confuse with 'after added'
        console.log('AT ADDPERCENT, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        //add % , calculation type
        result = Number(operand1ValueString) + ( (Number(operand2ValueString)/100) * Number(operand1ValueString) )
    }
    else
    if(/ deduct /i.test(passedInString)) {//must have space after deduct so regex wont confuse with deducted
        console.log('AT DEDUCTPERCENT, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        //add % , calculation type
        result = Number(operand1ValueString) - ( (Number(operand2ValueString)/100) * Number(operand1ValueString) )
    }
    else
    if(/to/i.test(passedInString)) {//% change
        console.log('AT PERCENTCHANGE, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        //% change, calculation type
        let difference = Number(operand2ValueString) - Number(operand1ValueString)
        result = (difference/Number(operand1ValueString)) * 100
    }
    else
    if(/after/i.test(passedInString) && /added/i.test(passedInString)) {
        console.log('AT AFTERADDEDPERCENT, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        //after added %, calculation type
        let factor = 1 + (Number(operand2ValueString)/100)
        result = Number(operand1ValueString)/factor
    }
    else
    if(/after/i.test(passedInString) && /deducted/i.test(passedInString)) {
        console.log('AT AFTERDEDUCTEDPERCENT, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        //after deducted %, calculation type
        let factor = 1 - (Number(operand2ValueString)/100)
        result = Number(operand1ValueString)/factor
    }
    if(/if/i.test(passedInString)) {
        console.log('AT IFPERCENTIS, OPERAND1 AND 2 AND 3 ARE:',operand1ValueString,operand2ValueString,operand3ValueString)
        //if % is, calculation type
        result = (Number(operand3ValueString)/Number(operand1ValueString)) * Number(operand2ValueString)
    }


    return JSON.stringify(result)
}






const cleanUpAllTrailingDeciPoints = () => {

    //cleans up trailling decipoints for whole array of segments



    segmentsArray.forEach( (segment, index) => {
        //find index of decipoint if it exists in the segment
        let indexOfDeciPoint = segment.stringValue.search(/\./)
        console.log('********** SEGMENT NUMBER:' + index + ' INDEXOFDECIPOINT IS:'+indexOfDeciPoint)
        
        if( indexOfDeciPoint >=0) {//it exists
            '*** AT DECIPOIINT DOES EXIST'
            //see if next char after decipoint is a numeral
            if( ! /[0-9]/.test(segment.stringValue[indexOfDeciPoint+1]) ) {//not a numeral
                //char after deci is not a numeral, so remove the decipoint
                let portion1 = segment.stringValue.slice(0, indexOfDeciPoint) || ""//exlude the decipoint
                let portion2 = segment.stringValue.slice(indexOfDeciPoint+1) || ""//exclude the decipoint
                console.log('***** THERE IS A TRAILING DECIPOINT')
                console.log('PORTION1 IS:' + portion1)
                console.log('PORTION2 IS:' + portion2)
                
                //copy back to real string
                segment.stringValue = portion1 + portion2//will change real array, since it is passed by reference
                //pass by reference, so is same as segmentsArray[index]= portion1 + portion2
            }
            else {
                console.log('***NO TRAILING DECIPOINT FOR THIS SEGMENT')
            }

        }
    })

}//mthod





const takeASnapShotOfCurrentCalculationState = () => {
    let currentIndex = timeMachineArrayOfSegmentsArraySnapShots.length - 1
    currentIndex++//advance to  next element
    timeMachineArrayOfSegmentsArraySnapShots[currentIndex] = {} //create
    timeMachineArrayOfSegmentsArraySnapShots[currentIndex].segmentsArraySnapShot = JSON.parse(JSON.stringify(segmentsArray))
    console.log('###### TIMEMACHINEARRAYOFSEGMENTSARRAY IS:',timeMachineArrayOfSegmentsArraySnapShots)
}




const clearAllReadyForNextCalculation  = () => {
    currentSegmentIndex = 0 //reset
    segmentsArray = []//clear the array
    timeMachineArrayOfSegmentsArraySnapShots = [] //clear the timemachine ready for next calculation
        return objectToReturn = {
            screenMainTextLine1: "",
            screenMainTextLine2: "",
            screenMainTextLine3: "Ready"
        }
}





const checkNumberLengthOfUserInput = (passedInString) => {

    //checks if numeral count before or after decipoint is over the limit


    /////limit length of number being entered//////
    //if no decipoints, max lenght is 14
    //if has decipoint, max deciplaces is 4

    let overLimit = false

    //if no decipoints in string
    if( ! /\./.test(segmentsArray[currentSegmentIndex].stringValue)) {//if no decipoint
        //no decipoint , so max is 14 numerals, default is [] coz match will return null if not found
        if( (segmentsArray[currentSegmentIndex].stringValue.match(/[0-9]/g) || []).length >13 ) {//number of numerals in segment is >13, means allow 14 numerals
            overLimit = true 
        }
    }
    else {//has a decipoint
        //max number of deciplaces is 4
        //get index of decipoint
        let indexOfDeciPoint = segmentsArray[currentSegmentIndex].stringValue.search(/\./)//this returns first find

        //if portion after decipoint has more than 4 decipoints, ignore input and return as is
        if( (segmentsArray[currentSegmentIndex].stringValue.slice(indexOfDeciPoint+1).match(/[0-9]/g) || []).length > 3) {//ie >3 means allow 4 deciplaces
            overLimit = true 
        }
    }


    //if gets here, then string len is less than limit
    return overLimit

}