import * as types from "../actionsTypes/BufferActionsTypes";

export const addActionBuffer = (payload) => ({
    type: types.ADD_ACTION_BUFFER,
    payload 
});

export const clearBuffer = () => ({
    type: types.CLEAR_BUFFER,
});

export const copyItemsToBuffer = (payload) => ({
    type: types.COPY_ITEMS_TO_BUFFER,
    payload,
});

export const addItemsToBuffer = (payload) => ({
    type: types.ADD_ITEMS_TO_BUFFER,
    payload,
});