import { UPDATE_CALCULATOR_DATA } from "../actions/calculatorDataActions";
import * as Logic from '../src/PercentAndStandardCalculator/logic'

let initialState = {
    // screenMainTextLine1: "",
    // screenLiveAnswerLine: "",
    // screenMidScreenMessage: "",
    segmentsArray: [],
    currentSegmentIndex: 0,
    timeMachineArrayOfSegmentsArrays: []
}



const calculatorDataReducer = (state = initialState, action) => {

    switch(action.type) {
        case UPDATE_CALCULATOR_DATA: 
            console.log('GOT TO SCREEN REDUCER, ACTIOIN AND PAYLOAD IS:, PAYLOAD IS ',action.type, action.payload)
           
            
            return {
                ...state,
                segmentsArray,
                currentSegmentIndex,
                timeMachineArrayOfSegmentsArraySnapShots
            }
            break
        default: return state
    }
}

export default calculatorDataReducer