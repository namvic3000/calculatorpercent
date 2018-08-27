import {combineReducers} from 'redux'
import calculatorDataReducer from './calculatorDataReducer';
import tapeReducer from './tapeReducer';
import memoryDataReducer from "./memoryDataReducer";
import buttonSmallsPanelReducer   from '../reducers/buttonSmallsPanelReducer'
import skinDataReducer   from '../reducers/skinDataReducer'
import aboutPageReducer from './aboutPageReducer';
import currencyReducer from './currencyReducer';

const rootReducer = combineReducers({
        calculatorStateData: calculatorDataReducer,
        tape: tapeReducer,
        memory: memoryDataReducer,
        buttonSmallsPanel: buttonSmallsPanelReducer,
        skinData: skinDataReducer,
        aboutPage: aboutPageReducer,
        currency: currencyReducer,
})




export default rootReducer