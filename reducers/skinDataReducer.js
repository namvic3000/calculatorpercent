import {UPDATE_SKIN_DATA, INIT_WHOLE_SKIN_DATA_SET_WITH_LOCAL_STORAGE_DATA} from '../actions/skinDataActions'
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
    buttonSmallsColor: '#0d47a5',
} 



const skinDataReducer = (state = initialState, action) => {

    switch( action.type ) {

        case UPDATE_SKIN_DATA: 

            saveSkinDataToLocalStorage(action.payload)
 
             
            return {
                ...action.payload

                //OR THIS:
                // showColorPickerStatus: action.payload.showColorPickerStatus,
                // skinSelectionModeActiveStatus: action.payload.skinSelectionModeActiveStatus,
                // currentComponentSkinToBeChanged: action.payload.currentComponentSkinToBeChanged,
                // memoryBoxesColor: action.payload.memoryBoxesColor,
                // memoryButtonsColor: action.payload.memoryButtonsColor,
                // percentButtonsColor: action.payload.percentButtonsColor,
                // keysSet1Color: action.payload.keysSet1Color,
                // keysSet2Color: action.payload.keysSet2Color,
                // buttonSmallsColor: action.payload.buttonSmallsColor
            }

            break


 
        default: return state 
    }

}










const saveSkinDataToLocalStorage = async (passedInObject) => {

    //dont save the statuses of colorpicking mode etc... they must be
    //false at startup
    let objToSave = 
    {
        ...passedInObject,
        //overide these object's keys with these
        showColorPickerStatus: false,
        skinSelectionModeActiveStatus: false,
        currentComponentSkinToBeChanged: '',
    }
 

 //console.log('AT SKIN REDUCER, OBJECT TO SAVE IS: ',objToSave)

    try {
        await AsyncStorage.setItem('skinData', JSON.stringify(objToSave))
    }
    catch(error) {
     //console.log(error)
    }
}




export default skinDataReducer