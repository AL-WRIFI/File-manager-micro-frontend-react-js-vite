import * as types from "../actionsTypes/FolderActionsType";

const initialState = {
    itemsBuffer:[],
}


const BufferReducer = ( state=initialState,action) =>{
    switch(action.type){
        case types.COPY_ITEM_TOBUFFER:
        return{
            ...state,
            itemsBuffer:action.payload,
        };
        
       default: return state;
    }
};

export default BufferReducer;