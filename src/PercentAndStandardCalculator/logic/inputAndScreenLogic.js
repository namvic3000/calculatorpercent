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
    
    console.log('***AT LOGIC, UPDATE WITH NEW INPUT, INDEXPOINTER IS ' + currentSegmentIndex)
    console.log('***AT LOGIC, UPDATE WITH NEW INPUT, KEY PASSED IN IS  ' + newKeyInput)

        
    let objectToReturn = {}

    // detect if newkeyinput is a number
    let newKeyInputIsANumber = /[0-9]/.test(newKeyInput)//returns a boolean
    
    //if array is empty, screen main text line is empty, segments array is empty
    if(segmentsArray.length <=0) {//empty array, first key input
        console.log('**GOT TO INSIDE EMPTY SEGMENTSARRAY')
        currentSegmentIndex = 0 //reset if not already, redundant
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
            else {//operator, including +- sign, ignore key input
                objectToReturn = {
                    screenMainTextLine1: "operatorpressed",
                    screenMainTextLine2: "",
                    screenMainTextLine3: "Ready"//ready msg when both lines empty
                }
        }

        return objectToReturn
    }
    
 
    console.log('AT POINT 100, SEGMNTARRAY IS ',segmentsArray)
    console.log('AT POINT 100, CURRENTSEGMNTINDEX IS ',currentSegmentIndex)
    
    
    
    //if gets here, segments array is not empty


    //since segments array is not empty, there is something in the
    //screen textline. check if ca button is pressed, if so clearall
    if(newKeyInput === 'ca') {//clearall button
        currentSegmentIndex = 0 //reset
        segmentsArray = []//clear the array
        return objectToReturn = {
            screenMainTextLine1: "",
            screenMainTextLine2: "",
            screenMainTextLine3: "Ready"
        }
    }


    if(newKeyInput === '<-') {//backspace button
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
                let collatedString = collateString(segmentsArray)
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
                let collatedString = collateString(segmentsArray)
                return objectToReturn = {
                    screenMainTextLine1: collatedString,
                    screenMainTextLine2: "anser",
                    screenMainTextLine3: ""
                }
            }
            else {//not last char of segment
                //take the last char off
                segmentsArray[currentSegmentIndex].stringValue = segmentsArray[currentSegmentIndex].stringValue.slice(0,-1)
                let collatedString = collateString(segmentsArray)
                return objectToReturn = {
                    screenMainTextLine1: collatedString,
                    screenMainTextLine2: "anser",
                    screenMainTextLine3: ""
                }
            }
        }
    }//if <-
    
 

    //first detect if current segment is a number or not
    let currentSegmentIsANumber = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
     
    //if current segment is a number
    if(currentSegmentIsANumber) {
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
    
    
    if( ! currentSegmentIsANumber) {//if currentsegment is an operator
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







const collateString = (arr) => {

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
