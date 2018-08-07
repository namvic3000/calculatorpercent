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
    let currentSegmentIsANumberFlag = /([0-9]|\)|\()/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
    console.log('AT PROCESS 0-9, CURENTSEGENT IS A NUMBER FLAG IS ' + currentSegmentIsANumberFlag)
    
    let isEmptySegmentFlag = segmentsArray[currentSegmentIndex].stringValue.length <= 0
    console.log('AT PROCESS 0-9, ISEMPTYSEGMENT FLAG IS ' + isEmptySegmentFlag)
    
    let hasOpenBracketFlag = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT PROCESS 0-9, HAS OPENBRACKET FLAG IS ' + hasOpenBracketFlag)
    
    let hasCloseBracketFlag = /\)/.test(segmentsArray[currentSegmentIndex].stringValue)
    console.log('AT PROCESS 0-9, HAS CLOSE BRACKET FLAG IS ' + hasCloseBracketFlag)
    
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
            //get the string, minus the last char whichis the ) bracket
            let tempStr = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)
            //append key value and reinsert the )
            tempStr = tempStr + newKeyInput + ')'
            //copy back to real string
            segmentsArray[currentSegmentIndex].stringValue = tempStr
        }
        //if has open bracket, or no brackets, append the key value string
        else {
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
    let currentSegmentIsAnArithOrPercentOperatorFlag = /(\+|-|x|÷|of|add|deduct|to|is|deducted|added|\()/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
    console.log('AT PROCESS BRACKET OPEN, CURENTSEGENT IS A OPERATOR FLAG IS ' + currentSegmentIsAnArithOrPercentOperatorFlag)
    
    //let segmentAlreadyHasOpenBracket = /\(/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
    
    let isEmptySegmentFlag = segmentsArray[currentSegmentIndex].stringValue.length <= 0
    console.log('AT PROCESS BRACKET OPEN, ISEMPTYSEGMENT FLAG IS ' + isEmptySegmentFlag)
     
     
    if(isEmptySegmentFlag) {
        //never gets here, pointer always points to current segment which 
        //jumps from last on char input, so is never empty
        segmentsArray[currentSegmentIndex].stringValue = newKeyInput
    }


    if(currentSegmentIsAnArithOrPercentOperatorFlag) {
        //ok, move to next segment then add open bracket
        //NOTE: an open bracket is included in operator search,
        //so if already has a open bracket or more, ok to add on.
        currentSegmentIndex++
        segmentsArray[currentSegmentIndex] = {}//create new element
        segmentsArray[currentSegmentIndex].stringValue = '('
    }
 
    //collate stirng from all segments, to return 
    let collatedString = collateStringsIntoOneString(segmentsArray)

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
    //so 1. must be a number e.g 367% or (367% of ..
    //2. number with )  e.g (5 x 6)% of ..
    //so current segment must have a 0-9 number in it, we dont
    //need to check if there is a closing bracket in it, becuase
    //it makes no differncce
    //If segment is a 'x' or a '+' or a 'of' or a 'to' etc.. means it
    //is not a number segment, and %of key wont work for the segment.


    let currentSegmentIsANumberFlag = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)
    
    
    if(currentSegmentIsANumberFlag) {
        //ok to proceed
         //add the % sign at end of this segmnt and 'of' in the next segment
         segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue + '%'
         //add 'of' into next segment
         currentSegmentIndex++
         segmentsArray[currentSegmentIndex] = {} //create
         segmentsArray[currentSegmentIndex].stringValue = 'of'
    }
    else {//not a number segment,
        //ignore key input
    }
    
      
    //collate stirng from all segments, to return 
    let collatedString = collateStringsIntoOneString(segmentsArray)

    return objectToReturn = {
        screenMainTextLine1: collatedString,
        screenMainTextLine2: 'answer',
        screenMainTextLine3: ''
    }
    
}





















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
}//methiod





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
