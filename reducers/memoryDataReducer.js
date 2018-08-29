import {UPDATE_MEMORY_DATA} from '../actions/memoryActions'
import { AsyncStorage } from "react-native";


let initialState = {
    memoryData: {
        memory1Value: 'empty',
        memory2Value: 'empty',
        currentActiveMemory: 1//1 or 2
    }
}


const memoryDataReducer = (state = initialState, action) => {
    console.log('GOT TO START OF  MEMORY REDUCER, ACTION OBJECT GOT IS: ', action)


    switch(action.type) {

        case UPDATE_MEMORY_DATA: 

            console.log('AT MEMORY REDUCER, ACTION OBJECT GOT IS: ', action)
            let obj = {
                memory1Value: action.payload.memory1Value,
                memory2Value: action.payload.memory2Value,
                currentActiveMemory: action.payload.currentActiveMemory
            }

            console.log('AT MEMORY REDUCER, UPDATE OBJECT ASSIGNED IS: ', obj)

            saveMemoryDataToLocalStorage(obj)


            return {
                ...state,
                memoryData: {...obj}
            }
            break

        
        default: return state 
    }
}




saveMemoryDataToLocalStorage = async (dataObj) => {

    //havt to convert to json before saving
    let jsonObj = JSON.stringify(dataObj)


    try {
        await AsyncStorage.setItem('memoryData', jsonObj)
    }
    catch(error) {
        console.log(error)
    }

}
export default memoryDataReducer