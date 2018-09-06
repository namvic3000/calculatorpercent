import { MAX_NUMBER_LIMIT, MIN_NUMBER_LIMIT } from "./config";
import currencyReducer from "../../reducers/currencyReducer";


export const collateStringsIntoOneString = (arr) => {//arr is array of objects

    //TO DLETE
 //console.log('AT COLLATEINTOSTRING: SEGMENTS ARRAY IS ', arr)
    //colate all the string values of all the segments together to send to 
    //calculate method
    let collatedString = "";

    arr.forEach((obj, index) => {
        collatedString = collatedString + obj.stringValue + ' '
    })

 //console.log('AT COLLATEINTOSTRING: STRING TO RETURN IS'+collatedString)

    return collatedString
}




 





export const getParenthesesNetValueFromString = (passedInString) => {

 //console.log('AT GETPARENTHESIS NETTVALUE, PASSED IN STRING IS '  + passedInString)

    let nettValue = 0
    for( let i = passedInString.length-1; i>=0; i--) {
        if(passedInString[i] === '(') {
            nettValue--
         //console.log('INSIDE LOOP, NETVALUE IS ' + nettValue)
        }
        if(passedInString[i] === ')') {
            nettValue++
         //console.log('INSIDE LOOP, NETVALUE IS ' + nettValue)
             
        }
        


    }

    return nettValue
}
 










export const findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit = (arr) => {
 //console.log(' GOT TO START OF FINDINDXOFSEGMENT')

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
             //console.log('NETVALUE COUNT IS ' + nettBracketValue)
            }
            if(tempStr.charAt(stringIndex) === '(') {
                nettBracketValue--
             //console.log('NETVALUE COUNT IS ' + nettBracketValue)
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









export const calculateResultOfWholeCalculation = (passedInString) => {

 //console.log('******GOT TO CALCULALTRESULT OF WHOLE CALCULATION')


    //if empty string, return, no action
    if( ! passedInString ) {
        return ''
    }


     ////REMOVE CURRENCY SIGNS
  //console.log('CALCULATEWHOLERESULT: PASSEDINSTRING STRING BEFORE REPLACE CURRENCY SYMBOL IS ' + passedInString)
     passedInString = passedInString.replace(/[\$|£|¥|€]/g, '')
  //console.log('CALCULATEWHOLERESULT: PASSEDIN STRING AFTER REPLACE CURRENCY SYMBOL IS ' + passedInString)

     
   
    


    // let wholeString = collateStringsIntoOneString(segmentsArray)
    let wholeString = JSON.parse(JSON.stringify(passedInString))

    let stringHasPercentCalculationFlag = /(of|add|deduct|to|added|deducted|if)/.test(wholeString)
 //console.log('STRING HAS PERCENT CALCULAION FLAG IS : ' + stringHasPercentCalculationFlag)
    
    let stringHasOpenSquareBracketFlag = /\[/.test(wholeString)
 //console.log('STRING HAS OPEN SQUARE BRACKET [ FLAG IS : ' + stringHasOpenSquareBracketFlag)
    
    let stringHasCloseSquareBracketFlag = /\]/.test(wholeString)
 //console.log('STRING HAS CLOSE SQUARE BRACKET ] FLAG IS : ' + stringHasCloseSquareBracketFlag)
    

    //if parenthesis open and close dont equal, means calculation incomplete
    if(getParenthesesNetValueFromString(wholeString) !== 0) {
     //console.log('AT CALCULATERESULT, BRACKETS INCOMPLETE')
        return "incomplete"
    }


    //if string has open square bracket [ but not close ssquare bracket ], means incomplete
    if(stringHasOpenSquareBracketFlag && (! stringHasCloseSquareBracketFlag)) {
     //console.log('AT CALCULATERESULT, SQUARE BRACKETS INCOMPLETE')
        return "incomplete"
    }
    

    // //if there are no round or square brackets, number of operators must be
    // //fewer than number of numbers (ie operands), eg 5 x 5 x 5 is ok, 5 x  is not ok, incomplete
    // let numberOfOperands = (wholeString.match(/([0-9]+)/g) || []).length
    // let numberOfArithOperators = (wholeString.match(/\+|-|x|÷/g) || []).length
    // console.log('** CALULATEWHOLESTRING: NUMBEROF OPERANDS AND ARITH ARE: ', numberOfOperands, numberOfArithOperators)
    // //if string has percent calculation, process thaat first

    // if(numberOfArithOperators >= numberOfOperands) {
    //     return 'incomplete'
    // }




    //if has percent calculation in it, 
    if(stringHasPercentCalculationFlag) {


        let errorMsg = ""

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
         //console.log('CONTENT OF SQUARE BRACKETS IS ' + contentOfSquareBrackets)
            //now reduce any parenthesis content to single values e.g ((23 + 5) x 2) becomes 56
            contentOfSquareBrackets = reduceBracketsPairContentsIntoSingleValues(contentOfSquareBrackets)
         //console.log('****AFTER REDUCED PARENTHESIS, CONTENT OF SQUARE BRACKETS IS ' + contentOfSquareBrackets)
            
            //now calculate the percentage calculation and get a single number result
            contentOfSquareBrackets = calculateResultOfPercentCalculation(contentOfSquareBrackets)
            

            //error check, if percent calculation returns a error message,
            //just return, no more processing
            //leave out x so wont confuse with multiply x
            if(/[a-w]/i.test(contentOfSquareBrackets)) {//if has text a-z, is a msg
                return contentOfSquareBrackets// return message
            }

            //error check the result of the percent calculation
            if((Number(contentOfSquareBrackets) > MAX_NUMBER_LIMIT) ||
                (Number(contentOfSquareBrackets)< MIN_NUMBER_LIMIT)){//-100tr TO 1000 trillion
                return 'result outside range'
            }
            else 
                if((Number(contentOfSquareBrackets) > 0) && (Number(contentOfSquareBrackets) < 0.0001) ) {
                    return '0 (rounded)'
                }
                else 
                    if((Number(contentOfSquareBrackets) < 0) && (Number(contentOfSquareBrackets) > -0.0001) ) {
                        return '0 (rounded)'
                    }
            
            //only gets to here if not returned due to error checking above

            //now replace the pair of square brackets and its content with a singl value
            let portion1 = wholeString.slice(0, indexOfOpenSquareBracket)//excludes the [ bracket
            let portion2 = wholeString.slice(indexOfCloseSquareBracket+1)//excludes the ] bracket
            //copy backk to real string with new single value in place of square brackets
            wholeString = portion1 + contentOfSquareBrackets + portion2
        }
        else {//no square brackets, ie only percent calculation is on the string, no arith operators outside of square brackets
            //only percent calc exists, no operator outside of square breackets


            //NOTE: IF GETS HERE, WHOLE STRING ONLY HAS RESULT OF PERCENT CALCULATIO
            //. THERE IS NO ARITH CALCLATION
            
            
            //there is no square brackets if gets here, but there may be round brackets,
            //e.g 20 add (2 x 5)%, so need to reduce the round brackets before passing in to
            //calculate percentage calculation, becomes 20 add 10% when passed into calculateresultofpercentcalcualtion
            wholeString = reduceBracketsPairContentsIntoSingleValues(wholeString)
             
            //calculate the percetn calculation
            //percent calculation is on its own, no arith operators
            //so save result to string to pass to eval() 
            wholeString =  calculateResultOfPercentCalculation(wholeString)


            //NOTE: IF GETS HERE, WHOLE STRING ONLY HAS RESULT OF PERCENT CALCULATIO
            //. THERE IS NO ARITH CALCLATION

            //error check, if percent calculation returns a error message,
            //just return, no more processing
            //leave out x so wont confuse with multiply x
            if(/[a-w]/i.test(wholeString)) {//if has text a-z, is a msg
                return wholeString// return message
            }


            //error check the result of the percent calculation
            if((Number(wholeString) > MAX_NUMBER_LIMIT) ||
                (Number(wholeString)< MIN_NUMBER_LIMIT)){//-100tr TO 1000 trillion
                return 'result outside range'
            }
            else 
                if((Number(wholeString) > 0) && (Number(wholeString) < 0.0001) ) {
                    return '0 (rounded)'
                }
                else 
                    if((Number(wholeString) < 0) && (Number(wholeString) > -0.0001) ) {
                        return '0 (rounded)'
                    }
            
        }
    }//if has percent calc







    let arrayOfOperands = (wholeString.match(/(\-[0-9|.]+)|([0-9|.]+)/g) || []) 
    let numberOfOperands = arrayOfOperands.length
 //console.log('** CALULATEWHOLESTRING: ARRAY OF OPERANDS IS: ', arrayOfOperands)
    
    //dont include the -NEGSIGN as a arith operator, so -5 is not
    ///an arith ooperator, use the ^ special character
    // let numberOfArithOperators = (wholeString.match(/(\+|x|÷)|(-[^0-9])/g) || []).length
    let numberOfArithOperators = (wholeString.match(/(\+|x|÷)|(-\s)/g) || []).length
 //console.log('** CALULATEWHOLESTRING: NUMBEROF OPERANDS ARE: ', numberOfOperands)
 //console.log('** CALULATEWHOLESTRING: NUMBEROF ARITH OPERATORS ARE: ', numberOfArithOperators)
    //if string has percent calculation, process thaat first

    if(numberOfArithOperators === numberOfOperands) {
        //eg. 25 x 5 +   incomplete calculation
        //remove the last arith operator, so can pass string to eval() to calculate
        //if we leave as 25 x 5 +    eval() willl throw error


        // /////DETECTING OPERATORS AND DELEETNG LAST OPERATOR NOT WORKING, REGEX
        // //CAN NNOT DIFFERENTIATE BETWEEN A - SUBRACT, AND A -3 NEG SIGN
        //get array of all numbers ie opeands
        //e.g 35 x 55 x 77 x 22 x    want to find the text for the last number, ie 22
        let arrayOfArithOperators = wholeString.match(/(\+|x|÷)|(-[^0-9])/g || [])
        let textOfLastArithOperator = arrayOfArithOperators[arrayOfArithOperators.length-1]
        //get index of last operator, there may be many same operators e.g many x's
        let indexOfLastArithOperator = wholeString.lastIndexOf(textOfLastArithOperator)
     //console.log('TEXT OF LAST OPERATOR IS, AND ITS INDEX IS: ', textOfLastArithOperator, indexOfLastArithOperator)
        //remove the operator, so 5 x 2 x 15 x   becomes 5 x 2 x 15 so valid for 
        //passing into eval() js method
        wholeString = wholeString.slice(0,indexOfLastArithOperator)//remove last operator
     //console.log('AFTER REMOVING LAST OPERATOR STRING IS: ', wholeString)

    }



    if(numberOfArithOperators > numberOfOperands) {

        //impossible to get here, since above removed the last arith operarotor
        //here for unforseen error prevention only, will never get here
        return 'Incomplete'
    }
    ////////////////////////////////////



    //####if gets to here, percent portion, if exists, is valid, (if invalid would
    //###have returned already without gettig here


    //when gets here, string still has alll the round brackets, except content of square brackets
    //ie percentage, is replace by a single value, so now stirng is eg 23 x ((2 + 3) x 7) x 777 
    ///777 is result of % calculation ie square bracket content
    //now calculate the value of the whole string by passing it to eval()

    //need to replace 'x' with '*' and '÷' with '/' for js to evaluate string
     //replace 'x' with '*', and '÷' with '/' for js to evaluate automatically
     wholeString = wholeString.replace(/x/g, '*')
     wholeString = wholeString.replace(/÷/g, '/')
  console.log('AT CALCULATE WHOLESTRING, AFTER OPERATOR REPLACEMTNS, WHOLESTIRNG IS ' + wholeString)
  

    // //if whole string has text in it, dont evaluate, just return the text
    // //text is eithr error mesg, or a message like 'any number'
    // let resultToReturn;
    // if(/[a-z]/i.test(wholeString)) {//if has text a-z, is a msg
    //     resultToReturn = wholeString//return as is
    // }
    
    
    //evaluate, when gets here, value of percent calculation is a single
    //number , so whole expression is e.g 25 x (27 + 5) x 17   , no percent
    //calculations, it has been turned into a number e.g 17. so pass expession
    //to eval to evaluate
    resultToReturn = eval(wholeString)

    //error check the result of the percent calculation
    if((Number(resultToReturn) > MAX_NUMBER_LIMIT) ||
            (Number(resultToReturn)< MIN_NUMBER_LIMIT)){//-100tr TO 1000 trillion
        return 'result outside range'
    }
    else 
        if((Number(resultToReturn) > 0) && (Number(resultToReturn) < 0.0001) ) {
            return '0 (rounded)'
        }
        else 
            if((Number(resultToReturn) < 0) && (Number(resultToReturn) > -0.0001) ) {
                return '0 (rounded)'
            }

 //console.log('*** RESULT OF WHOLE STRING TO RETURN, GOT FROM EVAL() IS ' + resultToReturn)


    return resultToReturn

}//method, calcresultofwholecalculation










 



export const reduceBracketsPairContentsIntoSingleValues = (passedInString) => {

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
     //console.log('*****FOUND FIRST PAIR OF PAREN, CONTENT IS ' + stringOfParenthesisPairContent)
         
        //replace 'x' with '*', and '÷' with '/' for js to evaluate automatically
        stringOfParenthesisPairContent = stringOfParenthesisPairContent.replace(/x/g, '*')
        stringOfParenthesisPairContent = stringOfParenthesisPairContent.replace(/÷/g, '/')
     //console.log('AFTER OPERATOR REPLACEMTNS, STIRNG IS ' + stringOfParenthesisPairContent)
        //auto javascript evaluation via eval
        let resultOfParensContent = eval(stringOfParenthesisPairContent)
     //console.log('***RESULT OF PAREN PAIR CONTENT IS' + stringOfParenthesisPairContent + '=' + resultOfParensContent)
        //get the string without the portion of the brackets pair
        let portion1 = tempStr.slice(0, indexOfMatchingOpenParen)//excludes the open bracket
        let portion2 = tempStr.slice(indexOfFirstCloseParen+1)//excludes the closig bracket
        //now put the string back, with the brackets pair portion replaced by a single result
        let updatedStr = portion1 + resultOfParensContent + portion2
     //console.log('UPDATED STRING AFTER SUSTITUTE BRACKETS PAIR FOR ITS RESULT IS ' + updatedStr)
        
        //copy back to real string
        tempStr = updatedStr
        
        
    }//while


    //return updated string with pair brackets replace by single value
    return tempStr

}















export const calculateResultOfPercentCalculation = (passedInString) => {

    //passed in string in syntax of eg. 23% of 50, there are on () brackets in the string,
    //they have been removed prior to callng this method

 //console.log('STRING PASSED INTO CALCULATE PERCENTAGE IS ' + passedInString)


    let currentCalculationType;
    let result = ""
    let errorMsg = ""

    //get the 2 operands, 3 operands if 'if%is' calculation type
    //passed in string in syntax of eg. 23% of 50, there are on () brackets in the string,
    //they have been removed prior to callng this method

    //find operand 1
    let startIndexOfOperand1 = passedInString.search(/([0-9]|\-[0-9])/)
    //now cut from start index to eostring
    let tempStr = passedInString.slice(startIndexOfOperand1)
    //end of operand1 is the first space, counting from the first numeral of operand1
    let endIndexOfOperand1 = tempStr.search(/ |\%/)
    let operand1ValueString = tempStr.slice(0, endIndexOfOperand1)
 //console.log('*** ##OPERAND1 STRING EXTRACTED IS ' + operand1ValueString)
   
    //find operand 2
    tempStr = tempStr.slice(endIndexOfOperand1+1)//remove opeerand1 from string
    let startIndexOfOperand2 = tempStr.search(/([0-9]|\-[0-9])/) 
    tempStr = tempStr.slice(startIndexOfOperand2)
 //console.log('AT EXTRACTION OF OPERAND2, TEMPSTR IS:' + tempStr)
    //if there is a space or % after opereand2, e.g if operand3 exists, then eooperand2 is 
    //0-indexofendoperand2
    let endIndexOfOperand2;

    //string is now eg either 175   no space after, or 175% nospaceafter, of 175 then ... if operand3 exists
    if(/ |\%/.test(tempStr)) {
     //console.log('FOUND A SPACE OR % SIGN AFTER OPERAND2')
        endIndexOfOperand2 = tempStr.search(/( |\%)/)//$ means to the eoline
    }
    else {//no % or space, just endof line, so we add an extra char to cover the last char of opeand2
     //console.log('NO SPACE OR % FOUND AFTER OPEREND2')
        endIndexOfOperand2 = tempStr.length
    }


 //console.log('INDEX OF EOOPEAND2 IS '+endIndexOfOperand2)
    let operand2ValueString = tempStr.slice(0, endIndexOfOperand2)
 //console.log('*** ##OPERAND2 STRING EXTRACTED IS ' + operand2ValueString)


    //if no operand2 entered yet, return as is, so to avoid incorrect result
    //in live answer line
    if(operand2ValueString === "") {
        return 'incomplete'
    }



    //if if%is, get 3rd operand

    //find operand 3, only for if%is calculation type
    tempStr = tempStr.slice(endIndexOfOperand2+1)//remove opeerand1 from string
    let startIndexOfOperand3 = tempStr.search(/([0-9]|\-[0-9])/) 
    tempStr = tempStr.slice(startIndexOfOperand3)
 //console.log('AT EXTRACTION OF OPERAND3, TEMPSTR IS:' + tempStr)
    //if there is a space or % after opereand3, 
    let endIndexOfOperand3;

    //string is now eg either 175   no space after, or 175% nospaceafter, 
    if(/ |\%/.test(tempStr)) {
     //console.log('FOUND A SPACE OR % SIGN AFTER OPERAND3')
        endIndexOfOperand3 = tempStr.search(/( |\%)/)//$ means to the eoline
    }
    else {//no % or space, just endof line, so we add an extra char to cover the last char of opeand2
     //console.log('NO SPACE OR % FOUND AFTER OPEREND3')
        endIndexOfOperand3 = tempStr.length
    }


 //console.log('INDEX OF EOOPEAND3 IS '+endIndexOfOperand3)
    let operand3ValueString = tempStr.slice(0, endIndexOfOperand3) || ""
 //console.log('*** ##OPERAND3 STRING EXTRACTED IS ' + operand3ValueString)


    
    //if if%is calculation, and no operand3 entered yet, return as is,
    // so to avoid incorrect result in live answer line
    if(/if/.test(passedInString)) {
        if(operand3ValueString === "") {
            return 'incomplete'
        }
    }
    



    //% of calculation type
    if(/\%/.test(passedInString) && (/of/i.test(passedInString))) {
     //console.log('AT PERCENTOF, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        result = (Number(operand1ValueString)/100) * Number(operand2ValueString) 
    }
    else
    //out of , calculation type
    if(/out/i.test(passedInString) && (/of/i.test(passedInString))) {
     //console.log('AT OUTOF, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        result = (Number(operand1ValueString)/Number(operand2ValueString)) * 100
    }
    else
    //add % , calculation type
    if(/ add /i.test(passedInString)) {//must have space around 'add' so regex wont confuse with 'after added'
     //console.log('AT ADDPERCENT, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        result = Number(operand1ValueString) + ( (Number(operand2ValueString)/100) * Number(operand1ValueString) )
    }
    else
    //add % , calculation type
    if(/ deduct /i.test(passedInString)) {//must have space after deduct so regex wont confuse with deducted
     //console.log('AT DEDUCTPERCENT, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        result = Number(operand1ValueString) - ( (Number(operand2ValueString)/100) * Number(operand1ValueString) )
    }
    else
    //% change, calculation type
    if(/to/i.test(passedInString)) {//% change
     //console.log('AT PERCENTCHANGE, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        let difference = Number(operand2ValueString) - Number(operand1ValueString)
        result = (difference/Number(operand1ValueString)) * 100
    }
    else
    //after added %, calculation type
    if(/after/i.test(passedInString) && /added /i.test(passedInString)) {
     //console.log('AT AFTERADDEDPERCENT, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        let factor = 1 + (Number(operand2ValueString)/100)
        result = Number(operand1ValueString)/factor
    }
    else
    //after deducted %, calculation type
    if(/after/i.test(passedInString) && /deducted /i.test(passedInString)) {
     //console.log('AT AFTERDEDUCTEDPERCENT, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        //if after deducted 100% or more, error
        if( (Number(operand1ValueString) == 0) && (Number(operand2ValueString) == 100)) {
            return 'Any >= 0 Value'
        }
        else 
        if( (Number(operand1ValueString) == 0)) {
            return 'invalid expression'
        }
        else 
            if( (Number(operand1ValueString) > 0) && (Number(operand2ValueString) >=100)) {
                //if operand2 is 100 or more %, invalid
                return 'error: Must Be Less Than 100%'
            }
            else {
                let factor = 1 - (Number(operand2ValueString)/100)
                result = Number(operand1ValueString)/factor
            }
    }
    else 
    //if % is, calculation type
    if(/if/i.test(passedInString)) {

     //console.log('AT IFPERCENTIS, OPERAND1 AND 2 AND 3 ARE:',operand1ValueString,operand2ValueString,operand3ValueString)
        result = (Number(operand3ValueString)/Number(operand1ValueString)) * Number(operand2ValueString)
        if(operand3ValueString == "") {
            return 'incomplete'
        }
    }



 //console.log('PERCENT CALCUATION: RESULT TO RETURN IS: ' + result)
    return result.toString()  //return type is string, not number
}













export const cleanUpAllTrailingDeciPoints = (segmentsArray) => {

    //cleans up trailling decipoints for whole array of segments



    segmentsArray.forEach( (segment, index) => {
        //find index of decipoint if it exists in the segment
        let indexOfDeciPoint = segment.stringValue.search(/\./)
     //console.log('********** SEGMENT NUMBER:' + index + ' INDEXOFDECIPOINT IS:'+indexOfDeciPoint)
        
        if( indexOfDeciPoint >=0) {//it exists
            '*** AT DECIPOIINT DOES EXIST'
            //see if next char after decipoint is a numeral
            if( ! /[0-9]/.test(segment.stringValue[indexOfDeciPoint+1]) ) {//not a numeral
                //char after deci is not a numeral, so remove the decipoint
                let portion1 = segment.stringValue.slice(0, indexOfDeciPoint) || ""//exlude the decipoint
                let portion2 = segment.stringValue.slice(indexOfDeciPoint+1) || ""//exclude the decipoint
             //console.log('***** THERE IS A TRAILING DECIPOINT')
             //console.log('PORTION1 IS:' + portion1)
             //console.log('PORTION2 IS:' + portion2)
                
                //copy back to real string
                segment.stringValue = portion1 + portion2//will change real array, since it is passed by reference
                //pass by reference, so is same as segmentsArray[index]= portion1 + portion2
            }
            else {
             //console.log('***NO TRAILING DECIPOINT FOR THIS SEGMENT')
            }

        }
    })


    return segmentsArray

}//mthod








export const takeASnapShotOfCurrentCalculationState = (segmentsArray, timeMachineArrayOfSegmentsArraySnapShots) => {
    let currentIndex = timeMachineArrayOfSegmentsArraySnapShots.length - 1
    currentIndex++//advance to  next element
    timeMachineArrayOfSegmentsArraySnapShots[currentIndex] = {} //create
    //copy
    timeMachineArrayOfSegmentsArraySnapShots[currentIndex].segmentsArraySnapShot = JSON.parse(JSON.stringify(segmentsArray))
 //console.log('###### TIMEMACHINEARRAYOFSEGMENTSARRAY IS:',timeMachineArrayOfSegmentsArraySnapShots)

    return timeMachineArrayOfSegmentsArraySnapShots
}








export const clearAllSoReadyForNextCalculation  = (segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots) => {
    obj = {}//create
    obj.currentSegmentIndex = 0 //reset
    obj.segmentsArray = []//clear the array
    obj.timeMachineArrayOfSegmentsArraySnapShots = [] //clear the timemachine ready for next calculation
    obj.screenMidScreenMessage = 'Ready'
    return obj
}





export const checkNumberLengthOfUserInput = (passedInString) => {

    //checks if numeral count before or after decipoint is over the limit


    /////limit length of number being entered//////
    //if no decipoints, max lenght is 14
    //if has decipoint, max deciplaces is 4

    let overLimit = false

    //if no decipoints in string
    if( ! /\./.test(passedInString)) {//if no decipoint
        //no decipoint , so max is 14 numerals, default is [] coz match will return null if not found
        if( (passedInString.match(/[0-9]/g) || []).length >13 ) {//number of numerals in segment is >13, means allow 14 numerals
            overLimit = true 
        }
    }
    else {//has a decipoint
        //max number of deciplaces is 4
        //get index of decipoint
        let indexOfDeciPoint = passedInString.search(/\./)//this returns first find

        //if portion after decipoint has more than 4 decipoints, ignore input and return as is
        if( (passedInString.slice(indexOfDeciPoint+1).match(/[0-9]/g) || []).length > 3) {//ie >3 means allow 4 deciplaces
            overLimit = true 
        }
    }


    //if gets here, then string len is less than limit
    return overLimit

}




export const insertThousandsSeparatorsForWholeCalculation = (passedInArray = []) => {

    //make a local copy, so no longer pointing to original passed in array
    //so wont change passed in array by reference
    
    // let localArrayOfSegments = []
    let localArrayOfSegments = JSON.parse(JSON.stringify(passedInArray))
 //console.log('AT INSERT THOSAND SEPARATORS, AFTER STRINGIFY, PASSED IN ARRAY IS: ', passedInArray)
 

    localArrayOfSegments.forEach( segment => {
     //console.log('THOUSANDS SEPARATOR, ONE SEGMENT IS: '+segment.stringValue)
        segment.stringValue = insertThousandsSeparatorsForOneSingleNumberString(segment.stringValue)
    })

    let collatedString = collateStringsIntoOneString(localArrayOfSegments)
 //console.log('STRING TO RETURN FROM INSERTTHOUSAND SEPARATORS IS: '+collatedString)
 //console.log('LOCAL COPIED ARRAY IS: ',localArrayOfSegments)
 //console.log('ORIGINAL ARRAY PASSED IN IS: ',passedInArray)
    return collatedString
}











export const insertThousandsSeparatorsForOneSingleNumberString = (passedInString = "") => {

    // console.log('THOUSANDS SEPARATOR SUBMTHOD: PASSEDINSTRING IS: ' + passedInString)
    
    //if empty stirng return it, coz if process below, toFix would insert 
    //0.000000 into an empty string, ie "".toFix(6) would give 0.000000
    ////instead of ""
    if( ! passedInString) return ''

    if((passedInString == "") || (passedInString == 'null')) return passedInString

    // //also if passed in string is an error messsge, return as is
    // //exlude test for alpha x because the multiply sign x will get interpreted as an alpha
    // //dont know how to exclude it using regex yet
    // if(/[a-w]/i.test(passedInString)) {
    //  //console.log('AT INSRT SEPARATOR, PASSED IN STRING HAS ALPHA, SO RETURN AS IS')
    //     return passedInString
    // }


    //make sure string is a string, even if passed in a number
    //so we can use string search functions
    
    passedInString = passedInString.toString()

    // console.log('THOUSANDS SEPARATOR SUBMETHOD: PASSEDINSTRING IS: ', passedInString)
    let stringToReturn = passedInString //default

    //first find index of decipoint if exists, if not, it is assumed
    //to be at eoline
    let indexOfDeciPoint = passedInString.search(/\./)
    //if not found, then assume it is at eoline
    if(indexOfDeciPoint == -1) {
        indexOfDeciPoint = passedInString.length
        // console.log('AT SEPARATOR SUBMETHOD: SEARCH DEDIPOINT, NOT FOUND, ASSIGN TO EOL')
    }


    let numeralCount = 0
    for(let i = indexOfDeciPoint -1; i >=0 ; i--) {
        if(/[0-9]/.test(passedInString.charAt(i))) {//if is a numeral
            numeralCount++
            // console.log('INSERT THOUSANDS SEPARATOR SUBMETHOD: NUMERAL FOUND, IT IS: ',passedInString.charAt(i))
            // console.log('INSERT THOUSANDS SEPARATOR SUBMETHOD: NUMERAL FOUND, COUINT IS NOW: ',numeralCount)
        }
        else {//non-numeral
            //reset if encounters a non-numeral eg a space or letter to start over
            numeralCount = 0
        }

        if(numeralCount ===3) {
            // console.log('3 NUMERALS FOUND')
            //if preceding char is a numeral, then
            //insert a separator at this index, which will push the rest of the
            //string up a spot
            if(i>0 && (/[0-9]/.test(passedInString.charAt(i-1)))) {
                // console.log('OK TO INSERT SEPARATOR, NOT START OF LINE, HAS PRIOR NUMERAL')
                //if not at start of line, and preceding char is a numeral
                //then insert a separator
                let thousandsSeparatorChar = "'"//e.g 12'000'234.50
                let tempStr = passedInString.slice(0, i) + thousandsSeparatorChar + passedInString.slice(i)
                passedInString = tempStr
                stringToReturn = passedInString

                // console.log('AFTER INSERTING A THOUSAND SEPARATOR, LINE IS: ', tempStr)
            }

            numeralCount = 0

        }//if count is 3
    }//for

    // console.log('THOUSANDS SEPARATOR SUBMETHOD, STIRNG TO RETURN IS: ' + stringToReturn)

    return stringToReturn

}





export const truncateDecimalPlacesOfString = (passedInString, numberOfDeciPlacesString) => {
    
 //console.log('AT TRUNCATE DECPOINTS: PASSEDINSTRING IS: ' + passedInString)

    //if empty stirng return it, coz if process below, toFix would insert 
    //0.000000 into an empty string, ie "".toFix(6) would give 0.000000
    ////instead of ""
    if(passedInString == "") return passedInString

    //also if passed in string is an error messsge, return as is
    //exlude alpha x because  the multiply sign x will get interpreted as an alpha
    //dont know how to exclude it using regex yet
    if(/[a-w]/i.test(passedInString)) {
        // console.log('AT TRUNCATE, PASSED IN STRING HAS ALPHA, SO RETURN AS IS')
        return passedInString
    }


    //passed in string is in format of  2355777.882858788   eithr number ofr string
    // console.log('AT TRUNCATEDECIMALPLACES, PASSEDINSTRING IS: ',passedInString)



    //make sure it is a string even if number is passed in
    passedInString = passedInString//.toString()
    // console.log('AT TRUNCATEDECIMALPLACES, AFTER CONVERT TO STRING IS: ',passedInString)



    // let floatValue = Number(passedInString)
    // console.log('AFTER TOFIXED(), PASSED IN STRING IS: ',stringToReturn)
    // return stringToReturn



    let floatValue = Number(passedInString)
    // console.log('FLOAT VLUE OF PASSE')
    // console.log('AT TRUNCATEDECIMALPLACES, FLOATVALUE OF  IS: ',passedInString)

    //if on auto, then do as follows:
    
    switch(numberOfDeciPlacesString) {
        case 'auto': 
         //console.log('AT TRUNCATEDECIMALPLACES, DECIPLACES  IS AUTO')

            if(floatValue <= 0.05 && floatValue >= -0.05) {
                stringToReturn = floatValue.toFixed(5)
            }
            else 
            if(floatValue <= 1000000) {//1m
                stringToReturn = floatValue.toFixed(3)
            }
            else
                if(floatValue <= 10000000000000) {//10tr
                    stringToReturn = floatValue.toFixed(2)
                }
                else {//>10tr
                    stringToReturn = floatValue.toFixed(0)
                }

            break 

        case '0': 
         //console.log('AT TRUNCATEDECIMALPLACES, DECIPLACES  IS 0')
            stringToReturn = floatValue.toFixed(0)
            break 
        case '1': 
         //console.log('AT TRUNCATEDECIMALPLACES, DECIPLACES  IS 1')
            stringToReturn = floatValue.toFixed(1)
            break
        case '2': 
         //console.log('AT TRUNCATEDECIMALPLACES, DECIPLACES  IS 2')
            stringToReturn = floatValue.toFixed(2)
            break
        case '3': 
         //console.log('AT TRUNCATEDECIMALPLACES, DECIPLACES  IS 3')
            stringToReturn = floatValue.toFixed(3)
            break
        case '4': 
         //console.log('AT TRUNCATEDECIMALPLACES, DECIPLACES  IS 4')
            stringToReturn = floatValue.toFixed(4)
            break

        default: stringToReturn = floatValue.toFixed(2)//never gets here
            
    }//switch
     



    //if greater than 10tr, forceably do 0 decipoints
    if(floatValue >= 10000000000000) {//10tr
        stringToReturn = floatValue.toFixed(0)
    }

 //console.log('TRUNCATE DECIOINTS: STRINGTO RETURN IS: ' + stringToReturn)


    return stringToReturn

}













export const addExtraDetailsTextToAnswer = (passedInAnswerString, wholeCalculationString) => {

    //this method adds the extra text details to the result, e.g form 25 to 77 
    // , result is e.g 255 , we add %sign and 'increase' in, becomes 255% (increase)
    //or 25 x [from 10 to 100] = 25000  
    //becomes 25 x [from 10 to 100] = 25000% (increase)
    
    // console.log('#########**************************** GOT TO ADD EXTRA DETAILS, PASSED IN STRING IS '+ passedInAnswerString)

    //if answer string is empty, e.g incomplete calculation, dont add
    //extra details to empty answer, would get e.g  '% (unchanged)' added
    //to empty answer, incorrect
    if(passedInAnswerString === "") {
        return passedInAnswerString
    }


    //if there is text in the passedinanswer, dont add extra details
    if( /[a-w]+/i.test(passedInAnswerString)) {
        return passedInAnswerString
    }






    let stringToReturn = passedInAnswerString

    //% of
    if((/of/.test(wholeCalculationString) && (! /out/.test(wholeCalculationString)))) {
        //e.g 25% 0f 1000,000 = 250,000 no need to add any extra text to answer
    }
    else
    //out of
    if((/out /.test(wholeCalculationString))) {
        //e.g 25 out of 27 = 95%,  need to add % to answer
        stringToReturn = passedInAnswerString + '%'
     //console.log('ADD EXTRA DETAILS: GOT TO OUTOF PORTION, AFTER ADDED %, STRING TO RETURN IS: ',stringToReturn)
    }
    else
    //add %
    if(/add /.test(wholeCalculationString)) {//need the space to differentiate from 'added' which also matches
        //25 add 15% = 32  //no need to add extra text to answer
    }
    else
    //deduct %
    if(/deduct /.test(wholeCalculationString)) {//need the space to diff from 'deducted' which also matches
        //25 deduct 15% = 32  //no need to add extra text to answer
    }
    else           
    //%change
    if(/from/.test(wholeCalculationString)) {
    //eg from25 to 35 = 70  need to add extra text to answer
    //, becomes from 25 to 35 = 70% (increase)
        if(Number(passedInAnswerString) == 0) {
            stringToReturn =  passedInAnswerString + ("% (no change)")
        }
        else
            if(Number(passedInAnswerString) > 0) {
                stringToReturn =  passedInAnswerString + "% (increase)"
            }
            else
                if(Number(passedInAnswerString) < 0) {
                    stringToReturn =  passedInAnswerString +  "% (decrease)"
                }
    }
    else                   
    //after added %
    if(/added /.test(wholeCalculationString)) {
        //e.g is 20 after added 20% = 17
        //becomes is 20 after added 20% = originally was 17
        stringToReturn = 'originally was '+ passedInAnswerString
    }
    else
    //after deducted %
    if(/deducted /.test(wholeCalculationString)) {
        //e.g is 20 after deducted 20% = 22
        //becomes is 20 after deducted 20% = originally was 22
        stringToReturn = 'originally was '+ passedInAnswerString
    }    
    else
    //if%is
    if(/then/.test(wholeCalculationString)) {
        //e.g if 20% is 150 then 35% = 250
        //no need to add any extra text
    }
    

                        

    //return the modified passedinstring
    // console.log('AT ADDEXTRADETAILS TO ANSER; STRING TO RETURN IS: ', stringToReturn)
    return stringToReturn
                 
}








export const addCurrencySymbolToAnswerIfAppropriate = (passedInAnswerString, passedInWholeString, currentCurrency) => {
    
    //add currency symbol if it is a quantity amount, not a percentage
    //only add currency to answer if calculation has at least one currcy
    //symbol in it


    //if not defined or null, return
    if( ! passedInAnswerString) {
        return ''
    }
    //if empty string, dont add currency symbol
    if(passedInAnswerString.length<=0) {
        //return as is
        return passedInAnswerString
    }

    let wholeStringHasPercentCalculation = /(of|add|deduct|to|added|deducted|if)/.test(passedInWholeString)
    let wholeStringHasCurrencySign = /\$|£|¥|€/.test(passedInWholeString)


    if(wholeStringHasCurrencySign) {//only add currency if calclation has
    //at leat a currency symbol
            
        if(wholeStringHasPercentCalculation) {
            if(/out|from/.test(passedInWholeString)) {//if outof and 'from to' then leave as is, dont add currency
                //%change and outof, leave answer as is, no adding currncy
     //console.log('¢¢¢¢¢¢¢¢¢¢¢¢  IINSERT CURENCY TO ANSWER: AT POINT 2')
                return passedInAnswerString
            }
            else { //all other percent calculations, add currnecy
                let indexOfFirstNumeral = passedInAnswerString.search(/[0-9]/)
                let str = passedInAnswerString.slice(0, indexOfFirstNumeral) + 
                                currentCurrency + passedInAnswerString.slice(indexOfFirstNumeral)
                return str //no need to process code below
            
            }
        }
        else {//has no percent calculation, 
            let indexOfFirstNumeral = passedInAnswerString.search(/[0-9]/)
            let str = passedInAnswerString.slice(0, indexOfFirstNumeral) + 
                            currentCurrency + passedInAnswerString.slice(indexOfFirstNumeral)
            return str //no need to process code below
        }

    }
    else {//no currency sign in whole calcullation stirng, no dont add currency
        //return as is
        return passedInAnswerString
    }

}









export const splitScreenMainTextLine1IntoConstituents = (segmentsArray = []) => {
    //portion1 is portion beore the [ bracket
    //portion2 is portion from [ to ] brackets
    //portion3 is portion after the ] bracket
    //portionAnswer is portion with segment that has '=' sign. the answer
    //is contained within this 1 segment
    //portionNoten is the segment after the = segment is the note segment, which may or
    //may not exist.

    //returns ann object with 5 portion keys


    //passed in string format is:
    //eg 25 x [12% of 135] + (22 x $3) = $222,222.22
    //or eg 25% of 150 = 38  //lone percentcalc, no square brackets
    //portion1: 25 x
    //portion2: [12% of 135]
    //poriton3: + (22 x $3)
    //portionAnswer: = $222,222.22
    //portionNote: segment after segment with = sign


    let objToReturn = {}


    let portion1 = '' //before the square bracket
    let portion2 = '' //content of square bracket inclusive of brackets
    let portion3 = '' //after ] close square bracket
    let portionAnswer = '' ///= segment
    let portionNote = '' //segment after = segment


    let wholeString = collateStringsIntoOneString(segmentsArray) || ''
    
    let hasOpenSquareBracket = /\[/.test(wholeString)
    let hasEqualsSign = /\=/.test(wholeString)

    let indexOfOpenSquareBracket = wholeString.search(/\[/) 
    let indexOfCloseSquareBracket = wholeString.search(/\]/)  
    let indexOfEqualsSign = wholeString.search(/\=/)  

    let indexOfSegmentNumberWithEqualsSign = -100//not exist

    segmentsArray.forEach( (segment, index) => {
        if(segment.stringValue.search(/\=/) > -1 ) {//found
            indexOfSegmentNumberWithEqualsSign = index
        }
    })



    //if has open squre bracket but not close square bracket, 
    ///treat it as it is at eostring
    if((indexOfOpenSquareBracket >= 0) && (indexOfCloseSquareBracket < 0)) {
        indexOfCloseSquareBracket = wholeString.length
    }

    //if no = sign present, treat it asif it is aat eostirng
    if(indexOfEqualsSign < 0) {//not exist
        indexOfEqualsSign = wholeString.length
    }


    //if no open squre brackt, means only 1 portion exists
    //eg 12% of 25 = 3.2
    if( ! hasOpenSquareBracket) {//no open [ braket
        portion1 = wholeString.slice(0, indexOfEqualsSign -1 )//exclude space before =sign
        portion2 = ''
        portion3 = ''
        if(segmentsArray[indexOfSegmentNumberWithEqualsSign]) {//if exists
            portionAnswer = segmentsArray[indexOfSegmentNumberWithEqualsSign].stringValue || ''
        }
        if(segmentsArray[indexOfSegmentNumberWithEqualsSign + 1]) {//exists
            portionNote = segmentsArray[indexOfSegmentNumberWithEqualsSign + 1].stringValue || ''
        }
         
        return {
            portion1,
            portion2,
            portion3,
            portionAnswer,
            portionNote
        }
    }//no open square bracket, simple calculation
    


    //mixed calculation, completed or incomplete pecentage calculation
    //eg 12 x [15% of 25] + 150  or 12 x [15% of 25  ... incomplete
    if(hasOpenSquareBracket) {//has open square bracket, may or may not have close squre bracket
        portion1 = wholeString.slice(0, indexOfOpenSquareBracket)//exclude open square bracket
        portion2 = wholeString.slice(indexOfOpenSquareBracket, indexOfCloseSquareBracket + 1) || ''//include close square bracket
        portion3 = wholeString.slice(indexOfCloseSquareBracket+1, indexOfEqualsSign - 1)//exclude equals sign and space before it
        if(segmentsArray[indexOfSegmentNumberWithEqualsSign]) {//exists
            portionAnswer = segmentsArray[indexOfSegmentNumberWithEqualsSign].stringValue || ''
        }

        if(segmentsArray[indexOfSegmentNumberWithEqualsSign + 1]) {//exists
            portionNote = segmentsArray[indexOfSegmentNumberWithEqualsSign + 1].stringValue || ''
        }
         
        return {
            portion1,
            portion2,
            portion3,
            portionAnswer,
            portionNote
        }
    }

}
