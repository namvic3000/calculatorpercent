import {combineReducers} from 'redux'
import keyboardReducer from './keyboardReducer';



const rootReducer = () => {

    combineReducers({
        keyBoardStatus: keyboardReducer
    })
}


export default rootReducer