import { ADD_RECORD_TO_TAPE, REMOVE_RECORD_FROM_TAPE,
            UPDATE_SHOW_TAPE_STATUS } from "../actions/tapeActions";


//  data structure of this reducer's state is  = [
//     {
//         segmentsArrayForThisRecord: []
//     }
// ] //array of objects with an array


let initialState = {
    arrayOfRecords: [], //array of whhole calclation strings
    showTapeStatus: false 
}


const tapeReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_RECORD_TO_TAPE: 
            console.log('###################AT TAPEREDUCER, ADDRECORD, PAYLOAD RECEIVED IS: ',action.payload)

            //get a copy of the state array
            let updatedArrayOfRecords = JSON.parse(JSON.stringify(state.arrayOfRecords))
            

            let newRecord = action.payload.oneWholeCalculationString
            
            //push new record onto state array
            updatedArrayOfRecords.push(newRecord)

            console.log('AT TAPEREDUCER, UPDATED ARRAY OF RECORDS IS: ',updatedArrayOfRecords)
            
            return {
                ...state,
                arrayOfRecords: updatedArrayOfRecords
            }




        case REMOVE_RECORD_FROM_TAPE: 
            //get a copy of the array
            updatedArrayOfRecords = JSON.parse(JSON.stringify(state.arrayOfRecords))
            
            let indexOfRecordToRemove = action.payload.indexOfRecord
            
            //remove via splice
            updatedArrayOfRecords.splice(indexOfRecordToRemove,1)//delete 1 element, no replacements

            return {
                ...state,
                arrayOfRecords: updatedArrayOfRecords
            }


            

        case UPDATE_SHOW_TAPE_STATUS: 
            
            return {
                ...state,
                showTapeStatus: action.payload.status
            }
            
            

        default: return state

    }
}


export default tapeReducer