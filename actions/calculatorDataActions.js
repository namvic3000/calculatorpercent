export const UPDATE_CALCULATOR_DATA = "UPDATE_CALCULATOR_DATA"




export const updateCalculatorData = (segmentsArray, currentSegmentIndex, timeMachineArrayOfSegmentsArraySnapShots) => ({
    type: UPDATE_CALCULATOR_DATA,
    payload: {
        segmentsArray,
        currentSegmentIndex,
        timeMachineArrayOfSegmentsArraySnapShots
    }
})