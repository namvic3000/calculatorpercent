import {combineReducers} from 'redux'
import keyboardReducer from './keyboardReducer';



const rootReducer = combineReducers({
        keyBoardStatus: keyboardReducer
})

console.log('STORE STATE IS:', rootReducer)

export default rootReducer