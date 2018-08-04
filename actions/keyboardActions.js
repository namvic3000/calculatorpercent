export const UPDATE_CURRENT_OPERAND_NUMBER = "UPDATE_CURRENT_OPERAND_NUMBER"



export const updateCurrentOperandNumber = (operand) => ({
    type: UPDATE_CURRENT_OPERAND_NUMBER,
    payload: {
        operand
    }
})