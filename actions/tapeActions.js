export const ADD_RECORD_TO_TAPE = 'ADD_RECORD_TO_TAPE'
export const REMOVE_RECORD_FROM_TAPE = 'REMOVE_RECORD_FROM_TAPE'




export const addRecordToTape = (oneSegmentsArray) => ({

    type: ADD_RECORD_TO_TAPE,
    payload: {
        oneSegmentsArray
    }
})




export const removeRecordFromTape = (indexOfRecord) => ({

    type: REMOVE_RECORD_FROM_TAPE,
    payload: {
        indexOfRecord
    }
})