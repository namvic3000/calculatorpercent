import {UPDATE_CURRENT_OPERAND_NUMBER} from '../actions/keyboardActions'



let initialState = {
    currentOperandNumber: 0
}


const keyboardReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_CURRENT_OPERAND_NUMBER: 
            return {
                ...state,
                currentOperandNumber: action.payload.operandNumber

            }
            break
        
            
        default: return state
    }
}


export default keyboardReducer