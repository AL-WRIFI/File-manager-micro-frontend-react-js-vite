import * as types from "../actionsTypes/FolderActionsType";

const initialState = {
    isLoading:true,
    currentFolder:"root",
    folderStack:["root"],
    userFolders:[],
    userDeletedFolders:[],
}


const FolderReducer = ( state=initialState,action) =>{
    switch(action.type){
       case types.CREATE_FOLDER:
        return{
            ...state,
            userFolders: [...state.userFolders,action.payload],
        };
       case types.ADD_FOLDER:
        const showTrueFolders = action.payload.filter((Folders)=> Folders.data.show == true)
        const showFalseFolders = action.payload.filter((Folders)=> Folders.data.show == false)
        return{
            ...state,
            userFolders: showTrueFolders,
            userDeletedFolders: showFalseFolders,
        };
       case types.SET_LOADING:
        return{
            ...state,
            isLoading: action.payload,
        };
        
        case types.CHANGE_FOLDER:
            const newCurrentFolder = action.payload;   
            return{
                ...state,
                folderStack: [...state.folderStack, newCurrentFolder],
                currentFolder: newCurrentFolder,
            };
        case types.GO_BACK:
            const newFolderStack = [...state.folderStack];
            newFolderStack.pop();
            return {
                ...state,
                folderStack: newFolderStack,
                currentFolder: newFolderStack[newFolderStack.length-1],
            };
        case types.REMOVE_FOLDER:
        const updateFolder = state.userFolders.filter(
            (folder)=> folder.docId !== action.payload);
        const updateDeletedFolders = state.userDeletedFolders.filter(
            (folder) => folder.docId !== action.payload)     
        return{
            ...state,
            userFolders: updateFolder,
            userDeletedFolders:updateDeletedFolders,
        }; 
        case types.RENAME_FOLDER:
            const renamedFolder = state.userFolders.find( (folder) =>folder.docId === action.payload.docId);
            renamedFolder.data.name = action.payload.name;
            return{
                ...state,
                userFolders: state.userFolders.map((folder) =>
                folder.docId === action.payload.docId ? renamedFolder : folder ),
            };
        case types.MOVE_FOLDER:
            const movedFolder = state.userFolders.find( (folder) =>folder.docId === action.payload.folderId);
            movedFolder.data = action.payload.data;
            return{
                ...state,
                userFolders: state.userFolders.map((folder) =>
                folder.docId === action.payload.folderId ? movedFolder : folder
                ),
            };
        case types.ADD_TO_DELETED_FOLDERS:
        const deletedFolder = action.payload;
        deletedFolder.data.show = false;
        return{
            ...state,
            userDeletedFolders:[...state.userDeletedFolders,deletedFolder]
        }
        case types.RECOVERY_FOLDER:
            const recoveryFolder = action.payload;
            recoveryFolder.data.show = true;
            const deletedFolders = state.userDeletedFolders.filter(
                (folder) => folder.docId !== action.payload.docId )
            return{
                ...state,
                userFolders: [...state.userFolders,recoveryFolder],
                userDeletedFolders: deletedFolders
            }
       default: return state;
    }
};

export default FolderReducer;