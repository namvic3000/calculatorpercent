import {UPDATE_SKIN_DATA} from '../actions/skinDataActions'
import { AsyncStorage} from "react-native";

let initialState = {
    showColorPickerStatus: false,
    skinSelectionModeActiveStatus: false,
    currentComponentSkinToBeChanged: "",
    memoryBoxesColor: '#000000',
    memoryButtonsColor: '#000000',
    percentButtonsColor: '#000000',
    keysSet1Color: '#000000',
    keysSet2Color: '#000000',
    buttonSmallsColor: '#000000',
} 



const skinDataReducer = (state = initialState, action) => {

    switch( action.type ) {

        case UPDATE_SKIN_DATA: 

            saveSkinDataToLocalStorage(action.payload)

            return {
            showColorPickerStatus: action.payload.showColorPickerStatus,
            skinSelectionModeActiveStatus: action.payload.skinSelectionModeActiveStatus,
            currentComponentSkinToBeChanged: action.payload.currentComponentSkinToBeChanged,
            memoryBoxesColor: action.payload.memoryBoxesColor,
            memoryButtonsColor: action.payload.memoryButtonsColor,
            percentButtonsColor: action.payload.percentButtonsColor,
            keysSet1Color: action.payload.keysSet1Color,
            keysSet2Color: action.payload.keysSet2Color,
            buttonSmallsColor: action.payload.buttonSmallsColor
            }


        default: return state 
    }

}



const saveSkinDataToLocalStorage = async (passedInObject) => {

    //remove existing key , if exists
    try {
        await AsyncStorage.removeItem('skinData')
    }
    catch(error) {
        console.log(error)
    }


    try {
        await AsyncStorage.setItem('skinData', JSON.stringify(passedInObject))
    }
    catch(error) {
        console.log(error)
    }
}




export default skinDataReducer