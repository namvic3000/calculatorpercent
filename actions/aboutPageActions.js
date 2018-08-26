export const UPDATE_SHOW_ABOUT_PAGE_STATUS = 'UPDATE_SHOW_ABOUT_PAGE_STATUS'



export const updateShowAboutPageStatus = (status) => ({
    type: UPDATE_SHOW_ABOUT_PAGE_STATUS,
    payload: {
        status
    }
})