export const ADD_RECORD_TO_TAPE = 'ADD_RECORD_TO_TAPE'
export const REMOVE_RECORD_FROM_TAPE = 'REMOVE_RECORD_FROM_TAPE'
export const UPDATE_SHOW_TAPE_STATUS = 'UPDATE_SHOW_TAPE_STATUS'
export const REPLACE_WHOLE_TAPE_DATA = 'REPLACE_WHOLE_TAPE_DATA'
export const DELETE_WHOLE_TAPE = 'DELETE_WHOLE_TAPE'



export const addRecordToTape = (segmentsArray) => ({

    type: ADD_RECORD_TO_TAPE,
    payload: {
        segmentsArray
    }
})




export const removeRecordFromTape = (indexOfRecord) => ({

    type: REMOVE_RECORD_FROM_TAPE,
    payload: {
        indexOfRecord
    }
})






export const updateShowTapeStatus = (status) => ({
    type: UPDATE_SHOW_TAPE_STATUS,
    payload: {
        status
    }
})




export const replaceWholeTapeData = (newTapeArray) => ({
    type: REPLACE_WHOLE_TAPE_DATA,
    payload: {
        newTapeArray
    }
})





export const deleteWholeTape = () => ({
    type: DELETE_WHOLE_TAPE
})