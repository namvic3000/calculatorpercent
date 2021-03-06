export const UPDATE_SKIN_DATA = 'UPDATE_SKIN_DATA'
export const INIT_WHOLE_SKIN_DATA_SET_WITH_LOCAL_STORAGE_DATA = 'INIT_WHOLE_SKIN_DATA_SET_WITH_LOCAL_STORAGE_DATA'


export const updateSkinData = (dataObject) => ({
        type: UPDATE_SKIN_DATA,
        payload: {
            showColorPickerStatus: dataObject.showColorPickerStatus,
            skinSelectionModeActiveStatus: dataObject.skinSelectionModeActiveStatus,
            currentComponentSkinToBeChanged: dataObject.currentComponentSkinToBeChanged,
            memoryBoxesColor: dataObject.memoryBoxesColor,
            memoryButtonsColor: dataObject.memoryButtonsColor,
            percentButtonsColor: dataObject.percentButtonsColor,
            keysSet1Color: dataObject.keysSet1Color,
            keysSet2Color: dataObject.keysSet2Color,
            buttonSmallsColor: dataObject.buttonSmallsColor
        }
    })

 