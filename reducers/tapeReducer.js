import { AsyncStorage } from "react-native";
import { ADD_RECORD_TO_TAPE, REMOVE_RECORD_FROM_TAPE,
            UPDATE_SHOW_TAPE_STATUS, 
            REPLACE_WHOLE_TAPE_DATA } from "../actions/tapeActions";


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

            //get a copy of the state array
            let updatedArrayOfRecords = JSON.parse(JSON.stringify(state.arrayOfRecords))
            

            let newRecord = action.payload.oneWholeCalculationString
            
            //push new record onto state array, push at start
            //so use  unshift
            updatedArrayOfRecords.unshift(newRecord)

            //if over 100 records, remove the last
            if(updatedArrayOfRecords.length > 100) {
                updatedArrayOfRecords.pop()//remove last on list end
            }

            
            saveTapeToLocalStorage(updatedArrayOfRecords)

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

            
            saveTapeToLocalStorage(updatedArrayOfRecords)

            return {
                ...state,
                arrayOfRecords: updatedArrayOfRecords
            }


            

        case UPDATE_SHOW_TAPE_STATUS: 
            
            return {
                ...state,
                showTapeStatus: action.payload.status
            }
            
            

        case REPLACE_WHOLE_TAPE_DATA: 
            return {
                ...state,
                arrayOfRecords: action.payload.newTapeArray  
            }



        default: return state

    }
}






saveTapeToLocalStorage = async (tapeArray) => {
        
    //input is array of strings

    //first remove the existing so we can replac it
    try {
        console.log('ABOUT TO REMOVE LOCALSTORAGE ITEM')
        await AsyncStorage.removeItem('storedTapeObject')
    }
    catch(error) {
        console.log(error)
    }

    // //if anything other than simple stirng, must convert it to 
    // //json format to be able to be stored


    //if data is an array or object, must stringify it
     
    try {
        await AsyncStorage.setItem('storedTapeObject', JSON.stringify(tapeArray))
    }
    catch(error) {
        console.log(error)
    }


}

export default tapeReducer