import * as types from "../actionsTypes/SelectedItemsActionsTypes"

export const setSelectItemsMode = (payload) => ({
    type: types.SET_SELECTED_ITEMS_MODE,
    payload 
});

export const toggleItemSelection = (payload) => ({
    type: types.TOGGLE_ITEMS_SELECTION,
    payload
});

export const clearSelectedItems = () =>({
    type: types.CLEAR_SELECTED_ITEMS,
});