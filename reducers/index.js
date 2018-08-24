import {combineReducers} from 'redux'
import calculatorDataReducer from './calculatorDataReducer';
import tapeReducer from './tapeReducer';
import memoryDataReducer from "./memoryDataReducer";
import buttonSmallsPanelReducer   from '../reducers/buttonSmallsPanelReducer'

const rootReducer = combineReducers({
        calculatorStateData: calculatorDataReducer,
        tape: tapeReducer,
        memory: memoryDataReducer,
        buttonSmallsPanel: buttonSmallsPanelReducer
})




export default rootReducer