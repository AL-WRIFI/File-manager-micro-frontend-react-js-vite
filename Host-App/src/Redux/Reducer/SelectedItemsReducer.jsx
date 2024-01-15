import * as types from "../actionsTypes/SelectedItemsActionsTypes";

const initialState = {
    selectItemsMode:false,
    selectedItems:[],
}


const SelectedItemsReducer = ( state=initialState,action) =>{
    switch(action.type){
        case types.ADD_TO_SELECTED_ITEMS:
        return{
            ...state,
            selectedItems:[...state.selectedItems, action.payload,]
        };
        case types.TOGGLE_ITEMS_SELECTION:
            const item = action.payload;
            const selectedItems = state.selectedItems.includes(item)
                ? state.selectedItems.filter((buffItem) => buffItem !== item)
                : [...state.selectedItems, item];

            return { ...state, selectedItems };
        case types.CLEAR_SELECTED_ITEMS:
        return{
            selectItemsMode:false,
            selectedItems:[],
        };
        case types.SET_SELECTED_ITEMS_MODE:
        return{
            ...state,
            selectItemsMode: action.payload,
        };
       default: return state;
    }
};

export default SelectedItemsReducer;