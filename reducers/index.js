import {combineReducers} from 'redux'
import calculatorDataReducer from './calculatorDataReducer';
import tapeReducer from './tapeReducer';
import memoryDataReducer from "./memoryDataReducer";


const rootReducer = combineReducers({
        calculatorStateData: calculatorDataReducer,
        tape: tapeReducer,
        memory: memoryDataReducer
})




export default rootReducer