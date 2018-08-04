import {UPDATE_CURRENT_OPERAND_NUMBER} from '../actions/keyboardActions'



let initialState = {
    currentOperandNumber: 1
}




const keyboardReducer = (state = initialState, action) => {
    console.log('got to KEYBOARDREDUCER, action.type is ', action.type)
    console.log('got to KEYBOARDREDUCER, action.payload is ', action.payload)
    
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