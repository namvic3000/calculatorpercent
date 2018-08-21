import {combineReducers} from 'redux'
import calculatorDataReducer from './calculatorDataReducer';
import { tapeReducer } from './tapeReducer';



const rootReducer = combineReducers({
        calculatorStateData: calculatorDataReducer,
        tape: tapeReducer
})


export default rootReducer