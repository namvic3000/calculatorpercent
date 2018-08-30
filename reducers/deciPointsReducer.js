import {UPDATE_NUMBER_OF_DECIPOINTS} from '../actions/deciPointsActions'
import { AsyncStorage } from 'react-native';


let initialState = {
    currentNumberOfDeciPoints: 'auto'//default
}


export const deciPointsReducer = (state = initialState, action) => {

    console.log('GOT TO DECIPOINTS REDUCER, ACTION OBJCT IS: ', action)
    switch (action.type) {
        case UPDATE_NUMBER_OF_DECIPOINTS: 

            saveDeciPointsToLocalStorage(action.payload.numberOfDeciPoints)

            return {
                ...state,
                currentNumberOfDeciPoints: action.payload.numberOfDeciPoints 
            }
            break

        default: return state 
    }
}






const saveDeciPointsToLocalStorage = async (passedInDeciPointsStatus) => {

    try{
        await AsyncStorage.setItem('deciPointsStatus', JSON.stringify(passedInDeciPointsStatus))
    }
    catch(error) {
        console.log(error)
    }

}

