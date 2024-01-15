import {combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import FileReducer from "./FileReducer";
import FolderReducer from "./FolderReducer";
import BufferReducer from "./BufferReducer";
import FilterReducer from "./FilterReducer";
import SettingsReducer from "./SettingsReducer";
import SelectedItemsReducer from "./SelectedItemsReducer";

const RootReducers = combineReducers({
    auth:AuthReducer, 
    Folders: FolderReducer,
    Files:FileReducer,
    SelectedItems:SelectedItemsReducer,
    Buffer:BufferReducer,
    FilterFiles:FilterReducer,
    Settings:SettingsReducer,

}); 

export default RootReducers;