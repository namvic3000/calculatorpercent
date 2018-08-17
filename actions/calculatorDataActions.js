export const UPDATE_CALCULATOR_DATA = "UPDATE_CALCULATOR_DATA"




export const updateCalculatorData = (screenMainTextLine1, screenLiveAnswerLine, screenMidScreenMessage,
     segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots) => ({
    
    type: UPDATE_CALCULATOR_DATA,
    payload: {
        screenMainTextLine1,
        screenLiveAnswerLine,
        screenMidScreenMessage,
        segmentsArray,
        currentSegmentIndex,
        timeMachineArrayOfSegmentsArraySnapShots
    }
})