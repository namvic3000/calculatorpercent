import {UPDATE_SHOW_SWITCH_OPERANDS_STATUS} from '../actions/switchOperandsActions'

let initialState = {
    showSwitchOperandsIconStatus: false
}


const switchOperandsReducer = (state = initialState, action) => {

    switch(action.type) {
        case UPDATE_SHOW_SWITCH_OPERANDS_STATUS : 
            return{
                ...state,
                showSwitchOperandsIconStatus: action.payload.status
            }


        default: return state
    }
}


export default switchOperandsReducer