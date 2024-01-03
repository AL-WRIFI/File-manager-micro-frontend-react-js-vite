import {combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import FileReducer from "./FileReducer";
import FolderReducer from "./FolderReducer";

const RootReducers = combineReducers({ 
    // auth:AuthReducer, 
    Folders: FolderReducer,
    Files:FileReducer
}); 

export default RootReducers;