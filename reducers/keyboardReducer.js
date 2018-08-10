import {UPDATE_IF_PERCENT_IS_BUTTON_STATUS} from '../actions/keyboardActions'



let initialState = {
    ifPercentIsButtonIsPressed: false
}




const keyboardReducer = (state = initialState, action) => {
    console.log('got to KEYBOARDREDUCER, action.type is ', action.type)
    console.log('got to KEYBOARDREDUCER, action.payload is ', action.payload)
    
    switch(action.type) {
        case UPDATE_IF_PERCENT_IS_BUTTON_STATUS: 
            return {
                ...state,
                ifPercentIsButtonIsPressed: action.payload.status
            }
            break
        
            
        default: return state
    }
}


export default keyboardReducer