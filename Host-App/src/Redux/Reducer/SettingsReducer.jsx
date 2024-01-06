import * as types from "../actionsTypes/SettingsActionsTypes"
const initialState = {
    darkMode:false,
    preferredColor:"#0d6efd",
}


const SettingsReducer = ( state=initialState,action) =>{
    switch(action.type){
        case types.CHANGE_THEME:
        return{
            ...state,
            darkMode: !state.darkMode,
        };
        case types.CHANGE_PREFERRED_COLOR:
        return{
            ...state,
            preferredColor: action.payload,
        };
        
       default: return state;
    }
};

export default SettingsReducer;