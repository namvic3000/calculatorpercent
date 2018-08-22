import { UPDATE_CALCULATOR_DATA } from "../actions/calculatorDataActions";

let initialState = {
    screenMainTextLine1: "",
    screenLiveAnswerLine: "",
    screenMidScreenMessage: "Ready",
    segmentsArray: [],
    currentSegmentIndex: 0,
    timeMachineArrayOfSegmentsArraySnapShots: []
}



const calculatorDataReducer = (state = initialState, action) => {

    switch(action.type) {
        case UPDATE_CALCULATOR_DATA: 
            console.log('GOT TO CALC DATA REDUCER, ACTIOIN AND PAYLOAD IS: ',action.type, action.payload)
           

            
            return {
                ...state,
                screenMainTextLine1: action.payload.screenMainTextLine1,
                screenLiveAnswerLine: action.payload.screenLiveAnswerLine,
                screenMidScreenMessage: action.payload.screenMidScreenMessage,
                segmentsArray: action.payload.segmentsArray,
                currentSegmentIndex: action.payload.currentSegmentIndex,
                timeMachineArrayOfSegmentsArraySnapShots: action.payload.timeMachineArrayOfSegmentsArraySnapShots
            }
            break
        default: return state
    }
}
 


export default calculatorDataReducer