import * as types from "../actionsTypes/FolderActionsType";

const initialState = {
    selectItemsMode:false,
    action:"null",
    itemsBuffer:[],
}


const BufferReducer = ( state=initialState,action) =>{
    switch(action.type){
        case types.ADD_ITEM_TO_BUFFER:
        return{
            ...state,
            itemsBuffer:[...state.itemsBuffer, action.payload,]
        };
        case types.TOGGLE_ITEMS_SELECTION:
            const item = action.payload;
            const itemsBuffer = state.itemsBuffer.includes(item)
                ? state.itemsBuffer.filter((buffItem) => buffItem !== item)
                : [...state.itemsBuffer, item];

            return { ...state, itemsBuffer };
        // case types.DELETE_ITEM_FOM_BUFFER:
        //     const updateItemsBuffer = state.itemsBuffer.filter((item)=> item.docId === !action.payload.docId)               
        //     return{
        //         ...state,
        //         itemsBuffer: updateItemsBuffer,
        //     };
        case types.CLEAR_BUFFER:
        return{
            selectItemsMode:false,
            itemsBuffer:[],
            action:"null"
        };
        case types.SET_SELECTED_ITEMS_MODE:
        return{
            ...state,
            selectItemsMode: action.payload,
        };
        case types.ADD_ACTION_BUFFER:
        return{
            ...state,
            action: action.payload,
        };
       
        
       default: return state;
    }
};

export default BufferReducer;