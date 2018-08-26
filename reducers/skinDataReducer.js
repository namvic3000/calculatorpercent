import {UPDATE_SKIN_DATA} from '../actions/skinDataActions'


let initialState = {
    showColorPickerStatus: false,
    skinSelectionModeActiveStatus: false,
    currentComponentSkinToBeChanged: "",
    memoryBoxesColor: '#ffffff',
    percentButtonsColor: '#ffffff',
    keysSet1Color: '#ffffff',
    keysSet2Color: '#ffffff',
    buttonSmallsColor: '#ffffff',
} 



const skinDataReducer = (state = initialState, action) => {

    switch( action.type ) {

        case UPDATE_SKIN_DATA: 
            return {
            showColorPickerStatus: action.payload.showColorPickerStatus,
            skinSelectionModeActiveStatus: action.payload.skinSelectionModeActiveStatus,
            currentComponentSkinToBeChanged: action.payload.currentComponentSkinToBeChanged,
            memoryBoxesColor: action.payload.memoryBoxesColor,
            percentButtonsColor: action.payload.percentButtonsColor,
            keysSet1Color: action.payload.keysSet1Color,
            keysSet2Color: action.payload.keysSet2Color,
            buttonSmallsColor: action.payload.buttonSmallsColor
            }


        default: return state 
    }

}


export default skinDataReducer