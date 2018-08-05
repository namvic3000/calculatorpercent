import { UPDATE_CONTENT_OF_SCREEN_MAIN_TEXTLINE1 } from "../actions/screenActions";

let initialState = {
    screenMainTextLine1Content: ""
}


let segmentIndexPointer = 0//initially points to 1st segment

const screenReducer = (state = initialState, action) => {

    switch(action.type) {
        case UPDATE_CONTENT_OF_SCREEN_MAIN_TEXTLINE1: 
            console.log('GOT TO SCREEN REDUCER, PAYLOAD IS ',action.payload)
            
            segmentIndexPointer++
            console.log('****SEGMENT POINETER IS ' + segmentIndexPointer)
            
            let prevContent = state.screenMainTextLine1Content

            let updatedContent = prevContent + action.payload.newInput
            
            //if 'ca' key, then clear all
            if(action.payload.newInput === ' ca ') {
                updatedContent = ""
            }
            
            // if(action.payload.newInput === ' <- ') {
            //     updatedContent = ""//prevContent
            // }
            
            return {
                ...state,
                screenMainTextLine1Content: updatedContent
            }
            break
        default: return state
    }
}

export default screenReducer