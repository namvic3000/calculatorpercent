import {combineReducers} from 'redux'
import keyboardReducer from './keyboardReducer';
import screenReducer from './screenReducer';



const rootReducer = combineReducers({
        keyBoardStatus: keyboardReducer,
        screenStatus: screenReducer
})


export default rootReducer