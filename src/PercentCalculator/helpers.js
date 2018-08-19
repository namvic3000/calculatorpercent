

export const collateStringsIntoOneString = (arr) => {//arr is array of objects

    //TO DLETE
    console.log('AT COLLATEINTOSTRING: SEGMENTS ARRAY IS ', arr)
    //colate all the string values of all the segments together to send to 
    //calculate method
    let collatedString = "";

    arr.forEach((obj, index) => {
        collatedString = collatedString + obj.stringValue + ' '
    })

    console.log('AT COLLATEINTOSTRING: STRING TO RETURN IS'+collatedString)

    return collatedString
}




 

export const getParenthesesNetValueFromString = (passedInString) => {

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
 





export const findIndexOfSegmentAndCharWhichHasFirstOpenBracketOfCurrentUnit = (arr) => {
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





export const calculateResultOfWholeCalculation = (passedInString) => {

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
            //percent calculation is on its own, no arith operators
            //so save result to string to pass to eval() 
            wholeString =  calculateResultOfPercentCalculation(wholeString)

            //error check
            if(/[a-z]/i.test(wholeString)) {//if has text a-z, is a msg
                return wholeString// return message
            }


            //error check, make sure result of percent calc is within range,
            //to not get the  the e.g 33556e+17 or 3355e-17  
            if((Number(wholeString) > 100000000000000) ||
                (Number(wholeString)<0.000000001)){//100 trillion
                console.log('RESULT OF PERCENT CALUCLATION IS: '+wholeString)
                return 'Number Outside Range'
            }
            
        }
    }//if has percent calc






    let arrayOfOperands = (wholeString.match(/([0-9|.]+)/g) || [])
    let numberOfOperands = arrayOfOperands.length
    console.log('** CALULATEWHOLESTRING: ARRAY OF OPERANDS IS: ', arrayOfOperands)
    
    //dont include the -NEGSIGN as a arith operator, so -5 is not
    ///an arith ooperator, use the ^ special character
    // let numberOfArithOperators = (wholeString.match(/(\+|x|÷)|(-[^0-9])/g) || []).length
    let numberOfArithOperators = (wholeString.match(/(\+|x|÷)|(-\s)/g) || []).length
    console.log('** CALULATEWHOLESTRING: NUMBEROF OPERANDS ARE: ', numberOfOperands)
    console.log('** CALULATEWHOLESTRING: NUMBEROF ARITH OPERATORS ARE: ', numberOfArithOperators)
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
        console.log('TEXT OF LAST OPERATOR IS, AND ITS INDEX IS: ', textOfLastArithOperator, indexOfLastArithOperator)
        //remove the operator, so 5 x 2 x 15 x   becomes 5 x 2 x 15 so valid for 
        //passing into eval() js method
        wholeString = wholeString.slice(0,indexOfLastArithOperator)//remove last operator
        console.log('AFTER REMOVING LAST OPERATOR STRING IS: ', wholeString)

    }



    if(numberOfArithOperators > numberOfOperands) {

        //impossible to get here, since above removed the last arith operarotor
        //here for unforseen error prevention only, will never get here
        return 'incomplete'
    }
    ////////////////////////////////////




    //when gets here, string still has alll the round brackets, except content of square brackets
    //ie percentage, is replace by a single value, so now stirng is eg 23 x ((2 + 3) x 7) x 777 
    ///777 is result of % calculation ie square bracket content
    //now calculate the value of the whole string by passing it to eval()

    //need to replace 'x' with '*' and '÷' with '/' for js to evaluate string
     //replace 'x' with '*', and '÷' with '/' for js to evaluate automatically
     wholeString = wholeString.replace(/x/g, '*')
     wholeString = wholeString.replace(/÷/g, '/')
     console.log('AT CALCULATE WHOLESTRING, AFTER OPERATOR REPLACEMTNS, WHOLESTIRNG IS ' + wholeString)
  

    //if whole string has text in it, dont evaluate, just return the text
    //text is eithr error mesg, or a message like 'any number'
    let resultToReturn;
    if(/[a-z]/i.test(wholeString)) {//if has text a-z, is a msg
        resultToReturn = wholeString//return as is
    }
    else {
        //no message, just numbers, so evaluate
        resultToReturn = eval(wholeString)
    }

    console.log('*** RESULT OF WHOLE STRING, AFTER EVAL() IS ' + resultToReturn)

    return resultToReturn

}











export const NEWcalculateResultOfWholeCalculation = (passedInString) => {
    console.log('******GOT TO CALCULALTRESULT OF WHOLE CALCULATION, STIRNG PASSED IN IS: ', passedInString)
    // let wholeString = collateStringsIntoOneString(segmentsArray)
    
    let wholeString = passedInString

    let stringHasPercentCalculationFlag = /(of|add|deduct|to|added|deducted|if)/.test(wholeString)
    console.log('STRING HAS PERCENT CALCULAION FLAG IS : ' + stringHasPercentCalculationFlag)
    
    let stringHasOpenSquareBracketFlag = /\[/.test(wholeString)
    console.log('STRING HAS OPEN SQUARE BRACKET [ FLAG IS : ' + stringHasOpenSquareBracketFlag)
    
    let stringHasCloseSquareBracketFlag = /\]/.test(wholeString)
    console.log('STRING HAS CLOSE SQUARE BRACKET ] FLAG IS : ' + stringHasCloseSquareBracketFlag)
    

    //if parenthesis open and close dont equal, means calculation incomplete
    if(getParenthesesNetValueFromString(wholeString) <= -1) {
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

        let percentCalculationString = ""//default
        let resultOfPercentCalculation = ""//default
        //if has ssquare brackets, remove the square brackekts and reduce any parenthesis
        //in it e.g [(22 x 5)% of ((20 + 5) x 5)] becomes 110% of 125, then pass to 
        //calculate percentage method


        //if gets here, string has a percent calculation, either mixed with
        //arith or on its own.
        //e.g 12% of ...  incomplete  , on its own,  has only 1 operand
        //e.g 12% of 350   complete, on its own coz no square bracket, has 2 operands
        //or   10 x [12% of 360]  mixed coz has square bracket, complete
        //or 10 x [12% of    mixed has '[', percent calculaion is incomplete







        //if it has NO open square bracket, it is a percent calculation on its own
        //e.g 12% of 200   or  12% of ...   incomplete
        if( ! stringHasOpenSquareBracketFlag) {//NO square bracket
            //no square bracket, percent calcualtion is on its own

            //if if%is, get string from if to operand2 only, exlude 'then' which is
            //opernd3
            if(/if/.test(wholeString) && ( ! /then/.test(wholeString))) {
                //*******#######TO DO, SLICE UPTO OPERAND 2, BEFORE 'THEN'
            }
            //string only has percent calculation on its own
            else {//all other percent calculation types
                percentCalculationString = wholeString
            }
            //string is e.g 12% of 200 no open brackets, complete
            //or (12 x 5)% of ((200 x  incomplete , has open bracket or brackets

            //when gets here, it is at operand2 since operand 1 is just a number without operators

            //get nett value of brackets and fill them in internally so can pass string
            //to reducebrackets method
            let nettValue = getParenthesesNetValueFromString(percentCalculationString)
            console.log('**** CALCULATERESULT, PERCENTAGE PORTION, NETTVALUE OF ROUNDBRAKCETS IS: ', nettValue)
            for (let i = 0; i>nettValue; i--) {//add same number of closing brackets
                //netvalue is a -number, eg -2 means 2 open brackets
                percentCalculationString += ')' //auto add closing brackt, for internal use onlly
            }
            console.log('CALCULATERESULTS, PERCENT PORTION, AFTER AUTO ADD BRACKETS, PERCENT STRING IS: ' ,  percentCalculationString)
            


            percentCalculationString = reduceBracketsPairContentsIntoSingleValues(percentCalculationString)
            console.log('CALCULATERESULTS, PERCENT PORTION, AFTER REDUCED BRACKETS, PERCENT STRING IS: ' ,  percentCalculationString)
            
            
            //make sure it has 2 operands, or 3 if it is if%is type
            //before sending string to calculatepercent calculation

            let returnedArray = (percentCalculationString.match(/([0-9]+)/g) || [])
            let numberOfOperands = (percentCalculationString.match(/([0-9]+)/g) || []).length

            console.log('**** CALCULATERESULT, PERCENTAGE PORTION, RTURNED ARRAY FROM MATCH IS: ', returnedArray)
            console.log('**** CALCULATERESULT, PERCENTAGE PORTION, NUMBER OF OPERANDS IS: ' + numberOfOperands)


        }





        return "not yet"






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






    return "not yet"





    //when gets here, string still has alll the round brackets, except content of square brackets
    //ie percentage, is replace by a single value, so now stirng is eg 23 x ((2 + 3) x 7) x 777 
    ///777 is result of % calculation ie square bracket content
    //now calculate the value of the whole string by passing it to eval()

    //need to replace 'x' with '*' and '÷' with '/' for js to evaluate string
     //replace 'x' with '*', and '÷' with '/' for js to evaluate automatically
     wholeString = wholeString.replace(/x/g, '*')
     wholeString = wholeString.replace(/÷/g, '/')
     console.log('****#### AT CALCULATE WHOLESTRING, AFTER OPERATOR REPLACEMTNS, WHOLESTIRNG TO CALCULATE IS ' + wholeString)
  
    let resultToReturn = eval(wholeString)

    console.log('*** RESULT OF WHOLE STRING, AFTER EVAL() IS ' + resultToReturn)

    return resultToReturn

}








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







export const calculateResultOfPercentCalculation = (passedInString) => {

    //passed in string in syntax of eg. 23% of 50, there are on () brackets in the string,
    //they have been removed prior to callng this method

    console.log('STRING PASSED INTO CALCULATE PERCENTAGE IS ' + passedInString)


    let currentCalculationType;
    let result = ""
    let errorMsg = ""

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

      


    //% of calculation type
    if(/%/.test(passedInString) && (/of/i.test(passedInString))) {
        console.log('AT PERCENTOF, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        result = (Number(operand1ValueString)/100) * Number(operand2ValueString) 
    }
    else
    //out of , calculation type
    if(/out/i.test(passedInString) && (/of/i.test(passedInString))) {
        console.log('AT OUTOF, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        result = (Number(operand1ValueString)/Number(operand2ValueString)) * 100
    }
    else
    //add % , calculation type
    if(/ add /i.test(passedInString)) {//must have space around 'add' so regex wont confuse with 'after added'
        console.log('AT ADDPERCENT, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        result = Number(operand1ValueString) + ( (Number(operand2ValueString)/100) * Number(operand1ValueString) )
    }
    else
    //add % , calculation type
    if(/ deduct /i.test(passedInString)) {//must have space after deduct so regex wont confuse with deducted
        console.log('AT DEDUCTPERCENT, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        result = Number(operand1ValueString) - ( (Number(operand2ValueString)/100) * Number(operand1ValueString) )
    }
    else
    //% change, calculation type
    if(/to/i.test(passedInString)) {//% change
        console.log('AT PERCENTCHANGE, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        let difference = Number(operand2ValueString) - Number(operand1ValueString)
        result = (difference/Number(operand1ValueString)) * 100
    }
    else
    //after added %, calculation type
    if(/after/i.test(passedInString) && /added/i.test(passedInString)) {
        console.log('AT AFTERADDEDPERCENT, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        let factor = 1 + (Number(operand2ValueString)/100)
        result = Number(operand1ValueString)/factor
    }
    else
    //after deducted %, calculation type
    if(/after/i.test(passedInString) && /deducted/i.test(passedInString)) {
        console.log('AT AFTERDEDUCTEDPERCENT, OPERAND1 AND 2 ARE:',operand1ValueString,operand2ValueString)
        //if after deducted 100% or more, error
        if( (Number(operand1ValueString) == 0) && (Number(operand2ValueString) == 100)) {
            return 'Any Value'
        }
        else 
        if( (Number(operand1ValueString) == 0)) {
            return 'Invalid Expression'
        }
        else 
            if( (Number(operand1ValueString) > 0) && (Number(operand2ValueString) >=100)) {
                //if operand2 is 100 or more %, invalid
                return 'Error: Must Be Less Than 100%'
            }
            else {
                let factor = 1 - (Number(operand2ValueString)/100)
                result = Number(operand1ValueString)/factor
            }
    }
    else 
    //if % is, calculation type
    if(/if/i.test(passedInString)) {
        console.log('AT IFPERCENTIS, OPERAND1 AND 2 AND 3 ARE:',operand1ValueString,operand2ValueString,operand3ValueString)
        result = (Number(operand3ValueString)/Number(operand1ValueString)) * Number(operand2ValueString)
    }



    return JSON.stringify(result)
}






export const cleanUpAllTrailingDeciPoints = (segmentsArray) => {

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


    return segmentsArray

}//mthod





export const takeASnapShotOfCurrentCalculationState = (segmentsArray, timeMachineArrayOfSegmentsArraySnapShots) => {
    let currentIndex = timeMachineArrayOfSegmentsArraySnapShots.length - 1
    currentIndex++//advance to  next element
    timeMachineArrayOfSegmentsArraySnapShots[currentIndex] = {} //create
    timeMachineArrayOfSegmentsArraySnapShots[currentIndex].segmentsArraySnapShot = JSON.parse(JSON.stringify(segmentsArray))
    console.log('###### TIMEMACHINEARRAYOFSEGMENTSARRAY IS:',timeMachineArrayOfSegmentsArraySnapShots)

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