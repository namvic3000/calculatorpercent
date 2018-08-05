import { UPDATE_CONTENT_OF_SCREEN_MAIN_TEXTLINE1 } from "../actions/screenActions";

let initialState = {
    screenMainTextLine1Content: ""
}



const screenReducer = (state = initialState, action) => {

    switch(action.type) {
        case UPDATE_CONTENT_OF_SCREEN_MAIN_TEXTLINE1: 
            return {
                ...state,
                screenMainTextLine1Content: action.payload.newContent
            }
    }
}