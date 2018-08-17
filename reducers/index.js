import {combineReducers} from 'redux'
import calculatorDataReducer from './calculatorDataReducer';



const rootReducer = combineReducers({
        calculatorStateData: calculatorDataReducer
})


export default rootReducer