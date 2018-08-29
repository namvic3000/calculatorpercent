import { UPDATE_SHOW_ABOUT_PAGE_STATUS } from "../actions/aboutPageActions";


let initialState = {
    showAboutPageStatus: false
}


const aboutPageReducer = (state = initialState, action) => {

    switch(action.type) {

        case UPDATE_SHOW_ABOUT_PAGE_STATUS: 
            return {
                ...state,
                showAboutPageStatus: action.payload.status 
            }
            break
        default: return state 
    }
}


export default aboutPageReducer