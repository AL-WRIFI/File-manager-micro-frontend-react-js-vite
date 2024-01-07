import * as types from "../actionsTypes/FolderActionsType";

const initialState = {
    selectItems:false,
    itemsBuffer:[],
}


const BufferReducer = ( state=initialState,action) =>{
    switch(action.type){
        case types.COPY_ITEM_TOBUFFER:
        return{
            ...state,
            itemsBuffer:[...state.itemsBuffer, action.payload,]
        };
        case types.CLEAR_BUFFER:
        return{
            itemsBuffer:[]
        };
        case types.SET_SELECTED_ITEMS:
        return{
            ...state,
            selectItems: action.payload,
        };
        
       default: return state;
    }
};

export default BufferReducer;