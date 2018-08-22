export const UPDATE_MEMORY_DATA = "UPDATE_MEMORY_DATA"





export const updateMemoryData = (memory1Value, memory2Value, currentActiveMemory) => ({

    type: UPDATE_MEMORY_DATA,
    payload: {
        memory1Value,
        memory2Value,
        currentActiveMemory
    }
})
 