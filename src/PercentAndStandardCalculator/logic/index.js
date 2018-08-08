let currentSegmentIndex = 0//initially points to 1st segment

let segmentsArray = []///stores each segment of the mainscreenline1 string



//e.g 88.2 x 55% of 250 + 100
//segmentsArray element[0] is 88.2
//segment element[1] is x
//segment element[2] is 55
//segment element[3] is % of
//segment element[4] is 250
//segment element[5] is +
//segment element[6] is 100

// //each element is an object {
    //stringValue:
    //numericalValue:
// }




export const updateScreenWithNewInput = (newKeyInput) => {
    
    console.log('***AT START OF LOGIC, UPDATE WITH NEW INPUT, INDEXPOINTER IS ' + currentSegmentIndex)
    console.log('***AT START OF LOGIC, UPDATE WITH NEW INPUT, KEY PASSED IN IS  ' + newKeyInput)

        
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
        currentSegmentIndex = 0 //reset
        segmentsArray = []//clear the array
        return objectToReturn = {
            screenMainTextLine1: "",
            screenMainTextLine2: "",
            screenMainTextLine3: "Ready"
        }
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




    console.log('GOT TO POINT1000')
    return {
        screenMainTextLine1: '1000 point',
        screenMainTextLine2: 'to to test 100 point',
        screenMainTextLine3: 'to to test 100 point'
    }




    //if button is backspace
    if(newKeyInput === '<-') {//backspace button
        objectToReturn = processInputForBackSpaceKey(newKeyInput)
        return objectToReturn
    }//if <-
    
 

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
       



}//method











const processInputWhenEmptyScreenMainTextLines = (newKeyInput) => {
    console.log('**GOT TO INSIDE EMPTY SEGMENTSARRAY')


    
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
    }

    return objectToReturn

}//method, empty screen











const processInputFor0To9Keys = (newKeyInput) => {

    console.log('GOT TO PROCESS 0-9 KEYS')

    let objectToReturn = {}

    //first detect if current segment is a number or not
    //include % and ) as a number for this key input
    let currentSegmentIsANumberFlag = /([0-9]|%|\)|\()/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
    console.log('AT PROCESS 0-9, CURENTSEGENT IS A NUMBER FLAG IS ' + currentSegmentIsANumberFlag)
    
    let isEmptySegmentFlag = segmentsArray[currentSegmentIndex].stringValue.length <= 0
    console.log('AT PROCESS 0-9, ISEMPTYSEGMENT FLAG IS ' + isEmptySegmentFlag)
    
    let hasOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT PROCESS 0-9, HAS OPENBRACKET FLAG IS ' + hasOpenBracketFlag)
    
    let hasCloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT PROCESS 0-9, HAS CLOSE BRACKET FLAG IS ' + hasCloseBracketFlag)
    
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

        //if has closing bracket, insert number before that closing bracket
        if(hasCloseBracketFlag) {
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
        }
        else
            if(hasPercentSignFlag) {
                //if has percent sign, add input before the percent sign
                 // //get the string, minus the last char whichis the ) bracket
                 
                let tempStr = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)//everything except the last char
                //append key value and reinsert the )
                tempStr = tempStr + newKeyInput + '%'
                //copy back to real string
                segmentsArray[currentSegmentIndex].stringValue = tempStr
            
            }
            else {//either has open bracket, or no brackets, append the key value string
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

    //first detect if current segment is a number or not
    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
    console.log('AT PROCESS4ARITHKEYS, CURENTSEGENT IS A NUMBER FLAG IS ' + currentSegmentIsANumberFlag)
    

    //if current segment is a number, then move to next segment
    //and put the + there and move pointer on again to next segment
    if(currentSegmentIsANumberFlag) {
        console.log('AT PROCESS4ARITHS, CURENTSEGMENT IS A NUMBER, MOVING TO NEXT ELEMTN TO PUT VALUE THERE')
        currentSegmentIndex++
        segmentsArray[currentSegmentIndex] = {} //create new element
        //put the operator in the new element
        segmentsArray[currentSegmentIndex].stringValue = newKeyInput
        // //move pointer to next element, ready for number input, create it also
        // currentSegmentIndex++
        // segmentsArray[currentSegmentIndex] = {}//create new array element for next number
        // segmentsArray[currentSegmentIndex].stringValue = ""//to remove 'undefined' as stirng value
    }
    else {//current seg is not a number, is an operator
        //ignore
        console.log('AT PROCESS4ARITHS, ANOTHER OPERATOR PRESSED, IGINORED')
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

    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
        
    //if segment is a number, ok, can toggle sign,
    //if is ooperator, then ignore key input
    
    
    //toggle the - sign
    if(currentSegmentIsANumberFlag) {
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

    else {
        //is ann operator, ignore
    }

    //collate stirng from all segments, to return 
    let collatedString = collateStringsIntoOneString(segmentsArray)

    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }

}






const processInputForDeciPointKey = (newKeyInput) => {

    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    
    //note: current segment is never empty, except when whole array
    //is empty at start or after CA, so no need to check that condition

    //if currentsegment is a number then add . if not existed alreay
    if(currentSegmentIsANumberFlag) {
        if(segmentsArray[currentSegmentIndex].stringValue)
        //add only if not already exists
        if( ! /[.]/.test(segmentsArray[currentSegmentIndex].stringValue)) { //if not already on this number
            //decipoint not yet exist, add it
            segmentsArray[currentSegmentIndex].stringValue += '.'                    
        }
        else {
            //decipoint already exists, igonore decipoint key input
        }
    }
    else {//curr segment is an operator
        //move to next segment and add 0.
        currentSegmentIndex++
        segmentsArray[currentSegmentIndex] = {}//create
        segmentsArray[currentSegmentIndex].stringValue = '0.'
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

    ///can only enter a open bracket if current segment is 
    //empty then ok to add openbracket, or is arithmetic of percent operator,
    // e.g 'of' 'to' '+' 'x' 'add' etc...
    //then jump to next segment then add the open bracket
    
    //first detect if current segment is either arith or percent operator or not
    let currentSegmentIsAnArithOrPercentOperatorFlag = /(\+|-|x|÷|of|add|deduct|to|is|deducted|added)/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
    console.log('AT PROCESS BRACKET OPEN, CURENTSEGENT IS A OPERATOR FLAG IS ' + currentSegmentIsAnArithOrPercentOperatorFlag)
    
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


    //if it already has an ( then it is ok to add more ) to same segmnt
    if(currentSegmentAlreadyHasOpenBracket) {
        //just add another bracket, dont add at next segment but
        //add at this current segment, so this segment may have many
        //open brackets

        //if less than 10 open brackets then allow to add
        if(numberOfTotalOpenBracketsOutstandingInWholeArray > -10) {
            segmentsArray[currentSegmentIndex].stringValue += '('
        }
    }
    else// only add ( to next segment if currentn segment is an operator
        if(currentSegmentIsAnArithOrPercentOperatorFlag) {
            //ok, move to next segment then add open bracket
            //NOTE: an open bracket is included in operator search,
            //so if already has a open bracket or more, ok to add on.
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {}//create new element
            segmentsArray[currentSegmentIndex].stringValue = '('
        }
        else { // is not an operator, is a number
            //if is ignored, cant put bracket if already number inn segmnt
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

    //first scan array and determine nett value of brackets
    let collatedString = collateStringsIntoOneString(segmentsArray)
    let tempArr = collatedString.match(/\(/g) || []//if not found
    let numberOfOpenBrackets = tempArr.length
    // let numberOfOpenBrackets = (collatedString.match(/\(/g))
    
    
    // let numberOfCloseBrackets = collatedString.match(/\)/g).length
    tempArr = collatedString.match(/\)/g) || []  
    numberOfCloseBrackets = tempArr.length
    
    let nettValue = numberOfCloseBrackets - numberOfOpenBrackets

    console.log('AT PROCESS BRACKET CLOSE, NETTVALUE OF BRACKETS IS  ' + nettValue)
     

    //if segment has a number, no open brackets, and -1 or less nett bracket,
    //then ok to proceed and add close bracket
    if(currentSegmentIsANumberFlag && (! hasAnOpenBracketFlag) && (nettValue <= -1)) {
        segmentsArray[currentSegmentIndex].stringValue += ')'
    }


    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)

    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }

}//mthod



// const processInputForPercentOfKey = (newKeyInput) => {

//     //1.current segment must be a number for this key to respond
//     //2. previous operator must be arithmetic, cant be any percent operator
//     //so cant have e.g '27% of 30% of 555' , or '27 out of 30% of 55'
//     //so preceding must either be no operator, or arithmetic operator,
//     //can not be percent operators

//     let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
//     let hasPrecedingPercentOperators = /(of|add|deduct|from|if|after|is)/.test(collateStringsIntoOneString(segmentsArray))
//     console.log('PREVIOUS OPERATOR IS PERCENTRELATED FLAG IS '+hasPrecedingPercentOperators)
//     let hasPrecedingArithmeticOperators = /(\+|-|x|÷)/.test(collateStringsIntoOneString(segmentsArray))
//     console.log('PREVIOUS OPERATOR IS ARITHMETIC FLAG IS '+hasPrecedingArithmeticOperators)

//     //if previious operators are not percent related, ok to proceed
//     if( ! hasPrecedingPercentOperators) {//no previous percent operators
//         if(currentSegmentIsANumberFlag) {//is a number, ok
//             //if there is no preceding arith operator, then dont put
//             //brackets in front of this segment
//             // e.g 55% of (77 X 88) , there is no arith operator prededing 55,
//             //so there is no brackets inserted in front of 55, we just add the '% of ' text
            
//             if( ! hasPrecedingArithmeticOperators) {//no preceding arith operators
//                 //no brackets required before 55% e.g 55% of 888 or (...x..) 
//                 //add the % sign at end of this segmnt
//                 segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue + '%'
//                 //add 'of' into next segment
//                 currentSegmentIndex++
//                 segmentsArray[currentSegmentIndex] = {} //create
//                 segmentsArray[currentSegmentIndex].stringValue = 'of'
//             }
//             else { //does have preceding arith operators
//                 // eg. 35 + 68 x (55% of (77 x 88) ) so we put a opening bracket before 55%
//                 //and closing brackt ) in segment after the 'of', ie hereit is the last closing bracket
//                 segmentsArray[currentSegmentIndex].stringValue = '(' + segmentsArray[currentSegmentIndex].stringValue
//                 //add the % sign at end of this segmnt
//                 segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue + '%'
//                 //add 'of' into next segment
//                 currentSegmentIndex++
//                 segmentsArray[currentSegmentIndex] = {} //create
//                 segmentsArray[currentSegmentIndex].stringValue = 'of'
//                 //add ) in the next segmnt, so we get: 35 + 3 x (55% of )
//                 currentSegmentIndex++
//                 segmentsArray[currentSegmentIndex] = {} //create
//                 segmentsArray[currentSegmentIndex].stringValue = ')'
//             }

//         }
//         else {//current segment is not a number, is an operator, ignore key
//             //ignore key input
//         }
//     }
//     else { //is a percent related operator in previous inputs
        
//         //ignore key input
        
//     }

//     //collate stirng from all segments, to return 
//     let collatedString = collateStringsIntoOneString(segmentsArray)

//     return objectToReturn = {
//         screenMainTextLine1: collatedString,
//         screenMainTextLine2: 'answer',
//         screenMainTextLine3: ''
//     }
    
// }









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
    let wholeCalculationHasAPercentOperatorFlag = /(of|add|deduct|to|is|deducted|added)/.test(collatedString)//returns a boolean

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
    }
    else {//is a number segment, so proceed
        if(currentSegmentHasNoOpenOrCloseBracketFlag) {
            if( ! currentSegmentHasPriorArithOperator) {//no prior arith operator.
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
                segmentsArray[currentSegmentIndex].stringValue = '(' + segmentsArray[currentSegmentIndex].stringValue
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
            //typed it in, e.g 5 x (20 , we dont put any brackets in,
            //just proceed with the % of portion, becomes 5 x (20% of ...
            
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
            //e.g (5 x 20)  so we look for the start of the unit, ie the
            //start of the (5 x 20) portion, and add a open bracket to it,
            //becomes ((5 x 20)% of ...

            let indexOfSegmentWithFirstOpenBracket = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfSegment
            //insert a ( at the start of the found segment with first open bracket
            segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue = '(' + segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue
            //add the % sign at end of this segmnt and 'of' in the next segment
            segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue + '%'
            //add 'of' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'of'
    

        }
    }//else is a number segment
    
      
    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)
    console.log('COLLATED STRING IS: ', collatedString)
    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
    
}














const processInputForOutOfKey = (newKeyInput) => {
 
    //logic is similar to %of key.
    //1. number by it self, no  prior arith operators, e.g
    // 35 out ouf 37, no need for inserting open bracket
    //2. number has priior arith operator, need to  insert bracket
    //so 35 x 37 becomes 35 x (37 out of...
    //3. has an open bracket e.g (35 , no need for inserting
    //bracket
    //4. has close bracket e.g (35 x37) becomes ((35 x 37) out of ..



    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT OUTOF INPUT, CURRENTSEGMENTISANUMBER FLAG IS :' + currentSegmentIsANumberFlag)

    let currentSegmentHasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT OUTOF INPUT, CURRENTSEGMENTHAS OPENBRACKET FLAG IS :' + currentSegmentHasAnOpenBracketFlag)

    let currentSegmentHasACloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT OUTOF INPUT, CURRENTSEGMENTHASCLOSEBRACKET FLAG IS :' + currentSegmentHasACloseBracketFlag)
    
    let currentSegmentHasNoOpenOrCloseBracketFlag = ! /(\(|\))/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT OUTOF INPUT, CURRENTSEGMENTHAS NO OPEN OR CLOSE BRACKET FLAG IS :' + currentSegmentHasNoOpenOrCloseBracketFlag)
    
    let currentSegmentHasPriorArithOperator = /(\+|-|x|÷)/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT OUTOF INPUT, currentSegmentHasPriorArithOperator FLAG IS :' + currentSegmentHasPriorArithOperator)
    






    //first make sure that there has been no previous percentage related
    //operator in the whole calculatoion
    let collatedString = collateStringsIntoOneString(segmentsArray)
    let wholeCalculationHasAPercentOperatorFlag = /(of|add|deduct|to|is|deducted|added)/.test(collatedString)//returns a boolean

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
    }
    else {//is a number segment, so proceed
        if(currentSegmentHasNoOpenOrCloseBracketFlag) {
            if( ! currentSegmentHasPriorArithOperator) {//no prior arith operator.
                console.log('AT OUTOF, GOT TO NUMBER HAS NO OPEN OR CLOSE BRACKET, NO PRIOR ARITH OPERATOR')                
                //no priior arith operator, no closing or open bracket,
                // so we  just proceed to add 'out of' portion. e.g 37 out of 38
                
                //add 'out of' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'out of'
            }
            else {//has prior arith operator.
                console.log('AT OUTOF, GOT TO NUMBER HAS NO BRACKETS, BUT HAS PRIOR ARITH OPERATOR')
                //e.g 5 x 20, so we put open brack in front of 20, 
                //becomes 5 x (20 out of ...
    
                //put ( in front of current segment
                segmentsArray[currentSegmentIndex].stringValue = '(' + segmentsArray[currentSegmentIndex].stringValue
                //add 'out of' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'out of'
            }
        }//if no open or close bracket
        else
        if(currentSegmentHasAnOpenBracketFlag) {//has an open bracket. 
            console.log('AT OUTOF, GOT TO SEGMENT HAS OPEN BRACKT')
            //if has open bracket at start of segment, means user 
            //typed it in, e.g 5 x (20 , we dont put any brackets in,
            //just proceed with the out of portion, becomes 5 x (20 out of ...
            
            //add 'out of' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'out of'
        }
        else 
        if(currentSegmentHasACloseBracketFlag) {//has a close bracket.
            console.log('AT OUTOF, GOT TO SEGMENT HAS CLOSE BRACKT')
            //if has a close bracket, means user just entered a bracketed caluculation,
            //e.g (5 x 20)  so we look for the start of the unit, ie the
            //start of the (5 x 20) portion, and add a open bracket to it,
            //becomes ((5 x 20) out of ...

            let indexOfSegmentWithFirstOpenBracket = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfSegment
            //insert a ( at the start of the found segment with first open bracket
            segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue = '(' + segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue
            
            //add 'out of' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'out of'
        }
    }//else is a number segment
    
      
    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)
    console.log('COLLATED STRING IS: ', collatedString)
    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
    
}










const processInputForAddPercentKey = (newKeyInput) => {
 
    //logic is similar to %of and outof keys.
    //1. number by it self, no  prior arith operators, e.g
    // 35 , no need for inserting open bracket, becomes 35 add %
    //2. number has priior arith operator, need to  insert bracket
    //so 35 x 37 becomes 35 x (37 add %
    //3. has an open bracket e.g (35 , no need for inserting
    //bracket
    //4. has close bracket e.g (35 x37), we insert ( at start 
    //of unit, becomes ((35 x 37) out of ..



    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT ADD% INPUT, CURRENTSEGMENTISANUMBER FLAG IS :' + currentSegmentIsANumberFlag)

    let currentSegmentHasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT ADD% INPUT, CURRENTSEGMENTHAS OPENBRACKET FLAG IS :' + currentSegmentHasAnOpenBracketFlag)

    let currentSegmentHasACloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT ADD% INPUT, CURRENTSEGMENTHASCLOSEBRACKET FLAG IS :' + currentSegmentHasACloseBracketFlag)
    
    let currentSegmentHasNoOpenOrCloseBracketFlag = ! /(\(|\))/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT ADD% INPUT, CURRENTSEGMENTHAS NO OPEN OR CLOSE BRACKET FLAG IS :' + currentSegmentHasNoOpenOrCloseBracketFlag)
    
    let currentSegmentHasPriorArithOperator = /(\+|-|x|÷)/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT ADD% INPUT, currentSegmentHasPriorArithOperator FLAG IS :' + currentSegmentHasPriorArithOperator)
    





    //first make sure that there has been no previous percentage related
    //operator in the whole calculatoion
    let collatedString = collateStringsIntoOneString(segmentsArray)
    let wholeCalculationHasAPercentOperatorFlag = /(of|add|deduct|to|is|deducted|added)/.test(collatedString)//returns a boolean

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
    }
    else {//is a number segment, so proceed
        if(currentSegmentHasNoOpenOrCloseBracketFlag) {
            if( ! currentSegmentHasPriorArithOperator) {//no prior arith operator.
                console.log('AT ADD%, GOT TO NUMBER HAS NO OPEN OR CLOSE BRACKET, NO PRIOR ARITH OPERATOR')                
                //no priior arith operator, no closing or open bracket,
                // so we  just proceed to add 'add %' portion. e.g 37 add 38%
                
                //add 'add' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'add'
            
                //add '%' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = '%'
            }
            else {//has prior arith operator.
                console.log('AT ADD%, GOT TO NUMBER HAS NO BRACKETS, BUT HAS PRIOR ARITH OPERATOR')
                //e.g 5 x 20, so we put open brack in front of 20, 
                //becomes 5 x (20 add % ...
    
                //put ( in front of current segment
                segmentsArray[currentSegmentIndex].stringValue = '(' + segmentsArray[currentSegmentIndex].stringValue
            
                //add 'add' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'add'
            
                //add '%' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = '%'
            }
        }//if no open or close bracket
        else
        if(currentSegmentHasAnOpenBracketFlag) {//has an open bracket. 
            console.log('AT ADD%, GOT TO SEGMENT HAS OPEN BRACKT')
            //if has open bracket at start of segment, means user 
            //typed it in, e.g 5 x (20 , we dont put any brackets in,
            //just proceed with the add % portion, becomes 5 x (20 add % ...
            
            //add 'add' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'add'
        
            //add '%' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = '%'
        }
        else 
        if(currentSegmentHasACloseBracketFlag) {//has a close bracket.
            console.log('AT ADD%, GOT TO SEGMENT HAS CLOSE BRACKT')
            //if has a close bracket, means user just entered a bracketed caluculation,
            //e.g (5 x 20)  so we look for the start of the unit, ie the
            //start of the (5 x 20) portion, and add a open bracket to it,
            //becomes ((5 x 20) add % ...

            let indexOfSegmentWithFirstOpenBracket = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfSegment
            //insert a ( at the start of the found segment with first open bracket
            segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue = '(' + segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue
        
            //add 'add' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'add'
        
            //add '%' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = '%'
    
        }
    }//else is a number segment
    
      
    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)
    console.log('COLLATED STRING IS: ', collatedString)
    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
    
}//method add %














const processInputForDeductPercentKey = (newKeyInput) => {
 
    //logic is same as add % key
    //1. number by it self, no  prior arith operators, e.g
    // 35 , no need for inserting open bracket, becomes 35 deduct %
    //2. number has priior arith operator, need to  insert bracket
    //so 35 x 37 becomes 35 x (37 deduct %
    //3. has an open bracket e.g (35 , no need for inserting
    //bracket
    //4. has close bracket e.g (35 x37), we insert ( at start 
    //of unit, becomes ((35 x 37) deduct % ...



    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT DEDUCT% INPUT, CURRENTSEGMENTISANUMBER FLAG IS :' + currentSegmentIsANumberFlag)

    let currentSegmentHasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT DEDUCT% INPUT, CURRENTSEGMENTHAS OPENBRACKET FLAG IS :' + currentSegmentHasAnOpenBracketFlag)

    let currentSegmentHasACloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT DEDUCT% INPUT, CURRENTSEGMENTHASCLOSEBRACKET FLAG IS :' + currentSegmentHasACloseBracketFlag)
    
    let currentSegmentHasNoOpenOrCloseBracketFlag = ! /(\(|\))/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT DEDUCT% INPUT, CURRENTSEGMENTHAS NO OPEN OR CLOSE BRACKET FLAG IS :' + currentSegmentHasNoOpenOrCloseBracketFlag)
    
    let currentSegmentHasPriorArithOperator = /(\+|-|x|÷)/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT DEDUCT% INPUT, currentSegmentHasPriorArithOperator FLAG IS :' + currentSegmentHasPriorArithOperator)
    





    //first make sure that there has been no previous percentage related
    //operator in the whole calculatoion
    let collatedString = collateStringsIntoOneString(segmentsArray)
    let wholeCalculationHasAPercentOperatorFlag = /(of|add|deduct|to|is|deducted|added)/.test(collatedString)//returns a boolean

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
    }
    else {//is a number segment, so proceed
        if(currentSegmentHasNoOpenOrCloseBracketFlag) {
            if( ! currentSegmentHasPriorArithOperator) {//no prior arith operator.
                console.log('AT DEDUCT%, GOT TO NUMBER HAS NO OPEN OR CLOSE BRACKET, NO PRIOR ARITH OPERATOR')                
                //no priior arith operator, no closing or open bracket,
                // so we  just proceed to add 'deduct %' portion. e.g 37 add 38%
                
                //add 'deduct' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'deduct'
            
                //add '%' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = '%'
            }
            else {//has prior arith operator.
                console.log('AT DEDUCT%, GOT TO NUMBER HAS NO BRACKETS, BUT HAS PRIOR ARITH OPERATOR')
                //e.g 5 x 20, so we put open brack in front of 20, 
                //becomes 5 x (20 deduct % ...
    
                //put ( in front of current segment
                segmentsArray[currentSegmentIndex].stringValue = '(' + segmentsArray[currentSegmentIndex].stringValue
            
                //add 'deduct' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = 'deduct'
            
                //add '%' into next segment
                currentSegmentIndex++
                segmentsArray[currentSegmentIndex] = {} //create
                segmentsArray[currentSegmentIndex].stringValue = '%'
            }
        }//if 
        else
        if(currentSegmentHasAnOpenBracketFlag) {//has an open bracket. 
            console.log('AT DEDUCT%, GOT TO SEGMENT HAS OPEN BRACKT')
            //if has open bracket at start of segment, means user 
            //typed it in, e.g 5 x (20 , we dont put any brackets in,
            //just proceed with the add % portion, becomes 5 x (20 add % ...
            
            //add 'deduct' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'deduct'
        
            //add '%' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = '%'
        }
        else 
        if(currentSegmentHasACloseBracketFlag) {//has a close bracket.
            console.log('AT DEDUCT%, GOT TO SEGMENT HAS CLOSE BRACKT')
            //if has a close bracket, means user just entered a bracketed caluculation,
            //e.g (5 x 20)  so we look for the start of the unit, ie the
            //start of the (5 x 20) portion, and add a open bracket to it,
            //becomes ((5 x 20) deduct % ...

            let indexOfSegmentWithFirstOpenBracket = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfSegment
            //insert a ( at the start of the found segment with first open bracket
            segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue = '(' + segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue
        
            //add 'deduct' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'deduct'
        
            //add '%' into next segment
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = '%'
    
        }
    }//else is a number segment
    
      
    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)
    console.log('COLLATED STRING IS: ', collatedString)
    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
    
}//method deduct %
















const processInputForPercentChangeKey = (newKeyInput) => {
 
    //logic is same as add % key, but insert the 'from' before
    //the start of the current unit, 
    //eg if unit is 37 becomes 'from 37 to ...'
    //if is  (32 x 57) becomes '(from (32 x 57) to ...
    //if is  (57  becomes '(from 57 to ...
    

    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT CHANGE% INPUT, CURRENTSEGMENTISANUMBER FLAG IS :' + currentSegmentIsANumberFlag)

    let currentSegmentHasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT CHANGE% INPUT, CURRENTSEGMENTHAS OPENBRACKET FLAG IS :' + currentSegmentHasAnOpenBracketFlag)

    let currentSegmentHasACloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT CHANGE% INPUT, CURRENTSEGMENTHASCLOSEBRACKET FLAG IS :' + currentSegmentHasACloseBracketFlag)
    
    let currentSegmentHasNoOpenOrCloseBracketFlag = ! /(\(|\))/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT CHANGE% INPUT, CURRENTSEGMENTHAS NO OPEN OR CLOSE BRACKET FLAG IS :' + currentSegmentHasNoOpenOrCloseBracketFlag)
    
    let currentSegmentHasPriorArithOperator = /(\+|-|x|÷)/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT CHANGE% INPUT, currentSegmentHasPriorArithOperator FLAG IS :' + currentSegmentHasPriorArithOperator)
    





    //first make sure that there has been no previous percentage related
    //operator in the whole calculatoion
    let collatedString = collateStringsIntoOneString(segmentsArray)
    let wholeCalculationHasAPercentOperatorFlag = /(of|add|deduct|to|is|deducted|added)/.test(collatedString)//returns a boolean

    if(wholeCalculationHasAPercentOperatorFlag) {
        //has prior percentage operator, so no action,
        //ignore input, return as is.

        //collate stirng from all segments, to return as is
        let collatedString = collateStringsIntoOneString(segmentsArray)
        console.log('COLLATED STRING IS: ', collatedString)
        return objectToReturn = {
            screenMainTextLine1: collatedString,
            screenMainTextLine2: 'answer',
            screenMainTextLine3: ''
        }
    }


    //if gets to here then has no previous percent operator in the line
 



    //if current segment is NOT a number , ignore user key input
    if( ! currentSegmentIsANumberFlag ){ //not a number segment
        //ignore
    }
    else {//is a number segment, so proceed
        if(currentSegmentHasNoOpenOrCloseBracketFlag) {
            if( ! currentSegmentHasPriorArithOperator) {//no prior arith operator.
                console.log('AT %CHANGE, GOT TO NUMBER HAS NO OPEN OR CLOSE BRACKET, NO PRIOR ARITH OPERATOR')                
                //no priior arith operator, no closing or open bracket, 
                //e.g 37 on its own, becomes 'from 37 to ...'
                // so we  just proceed to insert 'from' infront of this segment
                //and 'to' at the next segment, leaving current segment alone
                

                //first create an empty object and add to front of current segment element
                segmentsArray.splice(currentSegmentIndex,0,{}) //insert empty object
                console.log('AFTER SPLICE NEW OBJJECT INFRONT OF CURRENT OBJ, SEGMENTSARRAY IS ', segmentsArray)
                //at insert new object, it moves current segment 1 space up
                //so now, currnt segment is actually pointing at empty new object
                segmentsArray[currentSegmentIndex].stringValue = 'from'

                //move pointer to next segment, create new object and insert 'to', 
                //need to skip 2 times, because when insert new object, it moves current segment 1 space up
                //so now, currnt segment is actually pointing at empty new object
                currentSegmentIndex++//move to original segment eg 37
                currentSegmentIndex++ //moves to next segment
                segmentsArray[currentSegmentIndex] = {}//new object
                segmentsArray[currentSegmentIndex].stringValue = 'to'
            }
            else {//has prior arith operator.
                console.log('AT %CHANGE, GOT TO NUMBER HAS NO BRACKETS, BUT HAS PRIOR ARITH OPERATOR')
                //e.g 5 x 20, so we put open bracket and 'from' in front of 20, 
                //becomes 5 x (from 20 to ...

                //first create an empty object and add to front of current segment element
                segmentsArray.splice(currentSegmentIndex,0,{}) //insert empty object
                console.log('AFTER SPLICE NEW OBJJECT INFRONT OF CURRENT OBJ, SEGMENTSARRAY IS ', segmentsArray)
                //at insert new object, it moves current segment 1 space up
                //so now, currnt segment is actually pointing at empty new object
                segmentsArray[currentSegmentIndex].stringValue = '(from'//insert 'from' with open bracket in front

                //move pointer to next segment, create new object and insert 'to', 
                //need to skip 2 times, because when insert new object, it moves current segment 1 space up
                //so now, currnt segment is actually pointing at empty new object
                currentSegmentIndex++//move to original segment eg 37
                currentSegmentIndex++ //moves to next segment
                segmentsArray[currentSegmentIndex] = {}//new object
                segmentsArray[currentSegmentIndex].stringValue = 'to'
            }
        }// 
        else
        if(currentSegmentHasAnOpenBracketFlag) {//has an open bracket. 
            console.log('AT %CHANGE, GOT TO SEGMENT HAS OPEN BRACKT')
            //if has open bracket at start of segment, means user 
            //typed it in, e.g 5 x (20 ,  we respect the ( bracket and add 'from'
            //at after the bracket. we move the 20 to next segment and add 'from' to 
            //current segment, so 5 x (20 becomes  5 x (from 20 to ..., ie we add the 'from' to
            //current segment andn move number forward one segment. this way, no matter how many
            //open brackets there are in current segment, they are preserved as is.
            //. e.g 5 x (((20 , we create a 
            //new segment after current segment, move the 20 to it, and then append
            //'from' to current segment, preservng how many open brackets there are as is
            //so e.g 2 x (((20 becomes    2 x (((from 20 to ...
            

            //firt need to extract number from the current segment, which may have
            //e.g (((20
             
            let tempStr = segmentsArray[currentSegmentIndex].stringValue
            //find index of first numeral then slice it from there to eostring
            let indexOfFirstNumeral = tempStr.search(/[0-9]/)
            console.log('AT %CHANGE, INDEX OF FIRSTNUMERAL IS ' + indexOfFirstNumeral)

            //now slice from index to eostring
            let numberToMove = tempStr.slice(indexOfFirstNumeral)
            let portionToKeep = tempStr.slice(0,indexOfFirstNumeral)//exclusive of last char

            //update current segment with open brackets but without the numerals
            segmentsArray[currentSegmentIndex].stringValue = portionToKeep
            //then add 'from' to current segmnt
            segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue + 'from'

            //now create new segment and move sliced numeral to there
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = numberToMove

            //create new segment and insert 'to'
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'to'
            
        }
        else 
        if(currentSegmentHasACloseBracketFlag) {//has a close bracket.
            console.log('AT %CHANGE, GOT TO SEGMENT HAS CLOSE BRACKT')
            //if has a close bracket, means user just entered a bracketed caluculation,
            //e.g (5 x 20)  so we look for the start of the unit, ie the
            //start of the (5 x 20) portion, and add a '(from' to it,
            //becomes (from(5 x 20) to ...

            //find the segment with the open bracket for the unit
            //e.g 23 x 35 x (((35 x 7) + 25)  means segmennt 8, if counting from l to r
            let indexOfSegmentWithFirstOpenBracket = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfSegment
            //find the char index of the opening bracket within the segment 8 
            //which has 3 open brackets
            let indexOfOpenBracketWithinSegment = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfOpenBracketWithinSegmentString
            
            //need to insert the word 'from' after the open bracket found
            //need the segment index and open bracket index of that segment
            let tempStr = segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue
            let strPortion1 = tempStr.slice(0,indexOfOpenBracketWithinSegment)//exclusive of end index char
            let strPortion2 = tempStr.slice(indexOfOpenBracketWithinSegment)//defaults to eostring
            //put the 2 portions back together, with '(from' in the middle
            tempStr = strPortion1 + '(from' + strPortion2
            //copy back to real segement string value
            segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue = tempStr
            
            //now create object at next segment and add 'to' to it
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {}//create
            segmentsArray[currentSegmentIndex].stringValue = 'to'
        }
    }//else is a number segment
    
      
    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)
    console.log('COLLATED STRING IS: ', collatedString)
    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
    
}//method  % change













const processInputForAfterAddedPercentKey = (newKeyInput) => {
 
    //logic is same as add % key, but insert the '(is' before
    //the start of the current unit, 
    //eg if unit is 37 becomes 'is 37 after added ...'
    //if is  (32 x 57) becomes '(is (32 x 57) after added ...
    //if is  (57  becomes '(is 57 after added ...
    

    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT CHANGE% INPUT, CURRENTSEGMENTISANUMBER FLAG IS :' + currentSegmentIsANumberFlag)

    let currentSegmentHasAnOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT CHANGE% INPUT, CURRENTSEGMENTHAS OPENBRACKET FLAG IS :' + currentSegmentHasAnOpenBracketFlag)

    let currentSegmentHasACloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT CHANGE% INPUT, CURRENTSEGMENTHASCLOSEBRACKET FLAG IS :' + currentSegmentHasACloseBracketFlag)
    
    let currentSegmentHasNoOpenOrCloseBracketFlag = ! /(\(|\))/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT CHANGE% INPUT, CURRENTSEGMENTHAS NO OPEN OR CLOSE BRACKET FLAG IS :' + currentSegmentHasNoOpenOrCloseBracketFlag)
    
    let currentSegmentHasPriorArithOperator = /(\+|-|x|÷)/.test(collateStringsIntoOneString(segmentsArray))
    console.log('AT CHANGE% INPUT, currentSegmentHasPriorArithOperator FLAG IS :' + currentSegmentHasPriorArithOperator)
    





    //first make sure that there has been no previous percentage related
    //operator in the whole calculatoion
    let collatedString = collateStringsIntoOneString(segmentsArray)
    let wholeCalculationHasAPercentOperatorFlag = /(of|add|deduct|to|is|deducted|added)/.test(collatedString)//returns a boolean

    if(wholeCalculationHasAPercentOperatorFlag) {
        //has prior percentage operator, so no action,
        //ignore input, return as is.

        //collate stirng from all segments, to return as is
        let collatedString = collateStringsIntoOneString(segmentsArray)
        console.log('COLLATED STRING IS: ', collatedString)
        return objectToReturn = {
            screenMainTextLine1: collatedString,
            screenMainTextLine2: 'answer',
            screenMainTextLine3: ''
        }
    }


    //if gets to here then has no previous percent operator in the line
 



    //if current segment is NOT a number , ignore user key input
    if( ! currentSegmentIsANumberFlag ){ //not a number segment
        //ignore
    }
    else {//is a number segment, so proceed
        if(currentSegmentHasNoOpenOrCloseBracketFlag) {
            if( ! currentSegmentHasPriorArithOperator) {//no prior arith operator.
                console.log('AT %CHANGE, GOT TO NUMBER HAS NO OPEN OR CLOSE BRACKET, NO PRIOR ARITH OPERATOR')                
                //no priior arith operator, no closing or open bracket, 
                //e.g 37 on its own, becomes 'from 37 to ...'
                // so we  just proceed to insert 'from' infront of this segment
                //and 'to' at the next segment, leaving current segment alone
                

                //first create an empty object and add to front of current segment element
                segmentsArray.splice(currentSegmentIndex,0,{}) //insert empty object
                console.log('AFTER SPLICE NEW OBJJECT INFRONT OF CURRENT OBJ, SEGMENTSARRAY IS ', segmentsArray)
                //at insert new object, it moves current segment 1 space up
                //so now, currnt segment is actually pointing at empty new object
                segmentsArray[currentSegmentIndex].stringValue = 'from'

                //move pointer to next segment, create new object and insert 'to', 
                //need to skip 2 times, because when insert new object, it moves current segment 1 space up
                //so now, currnt segment is actually pointing at empty new object
                currentSegmentIndex++//move to original segment eg 37
                currentSegmentIndex++ //moves to next segment
                segmentsArray[currentSegmentIndex] = {}//new object
                segmentsArray[currentSegmentIndex].stringValue = 'to'
            }
            else {//has prior arith operator.
                console.log('AT %CHANGE, GOT TO NUMBER HAS NO BRACKETS, BUT HAS PRIOR ARITH OPERATOR')
                //e.g 5 x 20, so we put open bracket and 'from' in front of 20, 
                //becomes 5 x (from 20 to ...

                //first create an empty object and add to front of current segment element
                segmentsArray.splice(currentSegmentIndex,0,{}) //insert empty object
                console.log('AFTER SPLICE NEW OBJJECT INFRONT OF CURRENT OBJ, SEGMENTSARRAY IS ', segmentsArray)
                //at insert new object, it moves current segment 1 space up
                //so now, currnt segment is actually pointing at empty new object
                segmentsArray[currentSegmentIndex].stringValue = '(from'//insert 'from' with open bracket in front

                //move pointer to next segment, create new object and insert 'to', 
                //need to skip 2 times, because when insert new object, it moves current segment 1 space up
                //so now, currnt segment is actually pointing at empty new object
                currentSegmentIndex++//move to original segment eg 37
                currentSegmentIndex++ //moves to next segment
                segmentsArray[currentSegmentIndex] = {}//new object
                segmentsArray[currentSegmentIndex].stringValue = 'to'
            }
        }// 
        else
        if(currentSegmentHasAnOpenBracketFlag) {//has an open bracket. 
            console.log('AT %CHANGE, GOT TO SEGMENT HAS OPEN BRACKT')
            //if has open bracket at start of segment, means user 
            //typed it in, e.g 5 x (20 ,  we respect the ( bracket and add 'from'
            //at after the bracket. we move the 20 to next segment and add 'from' to 
            //current segment, so 5 x (20 becomes  5 x (from 20 to ..., ie we add the 'from' to
            //current segment andn move number forward one segment. this way, no matter how many
            //open brackets there are in current segment, they are preserved as is.
            //. e.g 5 x (((20 , we create a 
            //new segment after current segment, move the 20 to it, and then append
            //'from' to current segment, preservng how many open brackets there are as is
            //so e.g 2 x (((20 becomes    2 x (((from 20 to ...
            

            //firt need to extract number from the current segment, which may have
            //e.g (((20
             
            let tempStr = segmentsArray[currentSegmentIndex].stringValue
            //find index of first numeral then slice it from there to eostring
            let indexOfFirstNumeral = tempStr.search(/[0-9]/)
            console.log('AT %CHANGE, INDEX OF FIRSTNUMERAL IS ' + indexOfFirstNumeral)

            //now slice from index to eostring
            let numberToMove = tempStr.slice(indexOfFirstNumeral)
            let portionToKeep = tempStr.slice(0,indexOfFirstNumeral)//exclusive of last char

            //update current segment with open brackets but without the numerals
            segmentsArray[currentSegmentIndex].stringValue = portionToKeep
            //then add 'from' to current segmnt
            segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue + 'from'

            //now create new segment and move sliced numeral to there
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = numberToMove

            //create new segment and insert 'to'
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {} //create
            segmentsArray[currentSegmentIndex].stringValue = 'to'
            
        }
        else 
        if(currentSegmentHasACloseBracketFlag) {//has a close bracket.
            console.log('AT %CHANGE, GOT TO SEGMENT HAS CLOSE BRACKT')
            //if has a close bracket, means user just entered a bracketed caluculation,
            //e.g (5 x 20)  so we look for the start of the unit, ie the
            //start of the (5 x 20) portion, and add a '(from' to it,
            //becomes (from(5 x 20) to ...

            //find the segment with the open bracket for the unit
            //e.g 23 x 35 x (((35 x 7) + 25)  means segmennt 8, if counting from l to r
            let indexOfSegmentWithFirstOpenBracket = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfSegment
            //find the char index of the opening bracket within the segment 8 
            //which has 3 open brackets
            let indexOfOpenBracketWithinSegment = findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit(segmentsArray).indexOfOpenBracketWithinSegmentString
            
            //need to insert the word 'from' after the open bracket found
            //need the segment index and open bracket index of that segment
            let tempStr = segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue
            let strPortion1 = tempStr.slice(0,indexOfOpenBracketWithinSegment)//exclusive of end index char
            let strPortion2 = tempStr.slice(indexOfOpenBracketWithinSegment)//defaults to eostring
            //put the 2 portions back together, with '(from' in the middle
            tempStr = strPortion1 + '(from' + strPortion2
            //copy back to real segement string value
            segmentsArray[indexOfSegmentWithFirstOpenBracket].stringValue = tempStr
            
            //now create object at next segment and add 'to' to it
            currentSegmentIndex++
            segmentsArray[currentSegmentIndex] = {}//create
            segmentsArray[currentSegmentIndex].stringValue = 'to'
        }
    }//else is a number segment
    
      
    //collate stirng from all segments, to return 
    collatedString = collateStringsIntoOneString(segmentsArray)
    console.log('COLLATED STRING IS: ', collatedString)
    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
    
}//method  after added %














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
        

   console.log('AT FINDSTART OF UNIT, SEGENT INDEX TO RETURN IS '+indexOfSegmentWithFirstOpenBracket)
   return indexOfSegmentWithFirstOpenBracket

}//mthod findindexofsegment















const processInputForBackSpaceKey = (newKeyInput) => {

    let objectToReturn = {}

    //if 1st segment and last char in segment, do a CA
    if(currentSegmentIndex === 0) {
        if(segmentsArray[currentSegmentIndex].stringValue.length<=1) {
            //treats as if its a CA
            currentSegmentIndex = 0 //reset
            segmentsArray = []//clear the array
            return objectToReturn = {
                screenMainTextLine1: "",
                screenMainTextLine2: "",
                screenMainTextLine3: "Ready"
            }
        }
        else {//llength is more than 1
            //remove last char
            //slice(startindex, endindex): (0,-1)means substring from 0 to lastchar-1
            segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)
            let collatedString = collateStringsIntoOneString(segmentsArray)
            return objectToReturn = {
                screenMainTextLine1: collatedString,
                screenMainTextLine2: "anser",
                screenMainTextLine3: ""
            }
        }
    }
    else {//currnt segment is not the first segment, element
        //if is last char in segment, pop the segment off the array
        if(segmentsArray[currentSegmentIndex].stringValue.length<=1) {//last char
            segmentsArray.pop()//remove from array
            currentSegmentIndex--//move index back
            let collatedString = collateStringsIntoOneString(segmentsArray)
            return objectToReturn = {
                screenMainTextLine1: collatedString,
                screenMainTextLine2: "anser",
                screenMainTextLine3: ""
            }
        }
        else {//not last char of segment
            //take the last char off
            segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)
            let collatedString = collateStringsIntoOneString(segmentsArray)
            return objectToReturn = {
                screenMainTextLine1: collatedString,
                screenMainTextLine2: "anser",
                screenMainTextLine3: ""
            }
        }
    }
}//methiod backspace key












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







export const f = () => {

}
