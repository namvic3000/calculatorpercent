import {combineReducers} from 'redux'
import keyboardReducer from './keyboardReducer';
import calculatorDataReducer from './calculatorDataReducer';



const rootReducer = combineReducers({
        keyBoardStatus: keyboardReducer,
        calculatorStateData: calculatorDataReducer
})


export default rootReducer