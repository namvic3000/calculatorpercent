import {UPDATE_MEMORY_DATA} from '../actions/memoryActions'



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

            return {
                ...state,
                memoryData: {...obj}
            }

        
        default: return state 
    }
}



export default memoryDataReducer