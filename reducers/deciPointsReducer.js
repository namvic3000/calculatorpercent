import {UPDATE_NUMBER_OF_DECIPOINTS} from '../actions/deciPointsActions'


let initialState = {
    currentNumberOfDeciPoints: 'auto'//default
}


export const deciPointsReducer = (state = initialState, action) => {

    console.log('GOT TO DECIPOINTS REDUCER, ACTION OBJCT IS: ', action)
    switch (action.type) {
        case UPDATE_NUMBER_OF_DECIPOINTS: 
            return {
                ...state,
                currentNumberOfDeciPoints: action.payload.numberOfDeciPoints 
            }
            break

        default: return state 
    }
}


