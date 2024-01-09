
export const setSelectItemsMode = (payload) => {
    return{
        type: "SET_SELECTED_ITEMS_MODE",
        payload
    }
}

export const toggleItemSelection = (payload) => {
    return{
        type: "TOGGLE_ITEMS_SELECTION",
        payload
    }
}


