import * as types from "../actionsTypes/BufferActionsTypes";

const initialState = {
    itemsBuffer:[],
    action:"",
}

const BufferReducer = ( state=initialState,action) =>{
    switch(action.type){
        case types.ADD_ITEMS_TO_BUFFER:
        return{
            ...state,
            itemsBuffer: action.payload
        };
        case types.CLEAR_BUFFER:
        return{
            selectItemsMode:false,
            itemsBuffer:[],
            action:""
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