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
    
    console.log('***AT LOGIC, UPDATE WITH NEW INPUT, INDEXPOINTER IS ' + currentSegmentIndex++)
    console.log('***AT LOGIC, UPDATE WITH NEW INPUT, KEY PASSED IN IS  ' + newKeyInput)

        
    let objectToReturn = {}

    // detect if newkeyinput is a number
    let newKeyInputIsANumber = /[0-9]/.test(newKeyInput)//returns a boolean
    
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
        else {//operator input on empty line, ignore key input
            objectToReturn = {
                screenMainTextLine1: "operatorpressed",
                screenMainTextLine2: "",
                screenMainTextLine3: "Ready"//ready msg when both lines empty
            }
        }

        return objectToReturn
    }
    

          
    return  segmentsArray
    //  objectToReturn = {
    //     screenMainTextLine1: "",
    //     screenMainTextLine2: "",
    //     screenMainTextLine3: "segmentsarrynotempty"//ready msg when both lines empty
    // }

    // //if gets here, element 0 has at least 1 number unit
    // if(currentSegmentIndex === 0) { //array at first nonempty element,
    //     if( newKeyInputIsANumber) { //if is a number
    //         //append to existing string
    //         segmentsArray[currentSegmentIndex].stringValue += newKeyInput
    //     }
    //     else {//is an operator
    //         // console.log('NEWINPUT IS AN OPERATOR AT FIRST ELEMENT, RETURNNIG BLANK')
    //         //move to next element and store the operator
    //         currentSegmentIndex++
    //         segmentsArray[currentSegmentIndex].stringValue = newKeyInput
    //     }
    // }


    //if gets here, segments array is not empty

    //first detect if current segment is a number or not
    let currentSegmentIsANumber = /[0-9]/.test(segmentsArray[currentSegmentIndex].stringValue)//returns a boolean
     







    // 1. if currentSegment is the first segment, can only have number, ignore
    //        operators
    //2. if currentsegment is a number:
            // - if newkeyinput is a number, append to string
            // - if newkeyinput is not a number but an operator, put in new next segment of array 
    //3. if currentsegment is an operator
            // - if newKeyInput is a number, put number in next segment of Array
            // - if newKeyInput is an operator, ignore, because cannot have 2 consecutive ooperators,
            //     cann only have 1 operator between 2 numbers
       







}


export const f = () => {

}
