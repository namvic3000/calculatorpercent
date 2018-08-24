import {UPDATE_SHOW_BUTTON_SMALLS_PANEL_STATUS} from '../actions/buttonSmallsPanelActions'


let initialState = {
    showButtonSmallsPanelStatus: false
}


const buttonSmallsPanelReducer = (state = initialState, action) => {


    switch(action.type) {
        case UPDATE_SHOW_BUTTON_SMALLS_PANEL_STATUS: 

            return {
                showButtonSmallsPanelStatus: action.payload.status
            }


        default: return state 

    }
}


export default buttonSmallsPanelReducer