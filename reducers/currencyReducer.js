import { UPDATE_CURRENT_CURRENCY } from "../actions/currencyActions";

let initialState = {
    currentCurrency: '$'
}

const  currencyReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_CURRENT_CURRENCY:
            return {
                currentCurrency: action.payload.currency
            }
    
        default: return state
    }

}


export default currencyReducer