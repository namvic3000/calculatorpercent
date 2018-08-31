import { UPDATE_CURRENT_CURRENCY } from "../actions/currencyActions";
import { AsyncStorage } from "react-native";



let initialState = {
    currentCurrency: '$'
}

const  currencyReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_CURRENT_CURRENCY:

            saveCurrencyTypeToLocalStorage(action.payload.currency)

            return {
                currentCurrency: action.payload.currency
            }
            break
    
        default: return state
    }

}


export default currencyReducer





const saveCurrencyTypeToLocalStorage = async (passedInCurrency) => {

    //passed in currency is a 1 char string e.g '$' or '¥'
    try {
        await AsyncStorage.setItem('currency', passedInCurrency)
    }
    catch(error) {
     //console.log(error)
    }

}