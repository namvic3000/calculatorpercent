export const UPDATE_CURRENT_CURRENCY = 'UPDATE_CURRENT_CURRENCY'



export const updateCurrentCurrency = (currency) => ({
    type: UPDATE_CURRENT_CURRENCY,
    payload: {
        currency
    }
})