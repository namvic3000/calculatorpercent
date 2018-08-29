export const UPDATE_NUMBER_OF_DECIPOINTS = 'UPDATE_NUMBER_OF_DECIPOINTS'



export const updateNumberOfDeciPoints = (numberOfDeciPoints) => ({
    type: UPDATE_NUMBER_OF_DECIPOINTS,
    payload: {
        numberOfDeciPoints
    }
})