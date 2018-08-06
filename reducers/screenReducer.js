import { UPDATE_CONTENT_OF_SCREEN_MAIN_TEXTLINE1 } from "../actions/screenActions";
import * as Logic from '../src/PercentAndStandardCalculator/logic/inputAndScreenLogic'

let initialState = {
    screenMainTextLine1Content: ""
}



const screenReducer = (state = initialState, action) => {

    switch(action.type) {
        case UPDATE_CONTENT_OF_SCREEN_MAIN_TEXTLINE1: 
            console.log('GOT TO SCREEN REDUCER, PAYLOAD IS ',action.payload)
           
            //call logic method, add keyinput to string to display
            let resultObject = Logic.updateScreenWithNewInput(action.payload.newKeyInput)
            console.log('AT REDUCER, GOT RESULT OBJCT IS :' , resultObject)


            // let prevContent = state.screenMainTextLine1Content

            updatedContent = resultObject.screenMainTextLine1
             
             
            
            return {
                ...state,
                screenMainTextLine1Content: updatedContent
            }
            break
        default: return state
    }
}

export default screenReducer