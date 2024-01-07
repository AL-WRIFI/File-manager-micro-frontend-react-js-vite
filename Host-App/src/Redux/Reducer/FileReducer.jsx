import * as types from "../actionsTypes/FileActionsType";

const initialState = {
    isLoading:true,
    currentFile:"",
    userFiles:[],
    userDeletedFiles:[],
}

const FileReducer = ( state=initialState,action) =>{
    switch(action.type){
        case types.SET_LOADING:
        return{
            ...state,
            isLoading: action.payload,
        };
        case types.CREATE_FILES:
        return{
            ...state,
            userFiles: [...state.userFiles,action.payload],
        };
        case types.ADD_FILES:
        const showTrueFiles = action.payload.filter((file)=> file.data.show == true)
        const showFalseFiles = action.payload.filter((file)=> file.data.show == false)
        return{
            ...state,
            userFiles: showTrueFiles,
            userDeletedFiles: showFalseFiles
        };
        case types.CHANGE_FILE:   
            return{
                ...state,
                currentFiles: action.payload,
            };
        case types.RENAME_FILE:
            const renamedFile = state.userFiles.find( (file) => file.docId === action.payload.docId);
            renamedFile.data.name = action.payload.name;
            return{
                ...state,
                userFiles: state.userFiles.map((file) =>
                file.docId === action.payload.docId ? renamedFile : file ),
            };
        case types.REMOVE_FILE:
        const updateFiles = state.userFiles.filter(
            (file) => file.docId !== action.payload);
        const updateDeletedFiles = state.userDeletedFiles.filter(
            (file) => file.docId !== action.payload)    

        return{
            ...state,
            userFiles: updateFiles,
            userDeletedFiles: updateDeletedFiles,
        };
        case types.MOVE_FILE:
            const movedfile = state.userFiles.find( (file) =>file.docId === action.payload.docId);
            movedfile.data = action.payload.data;
            return{
                ...state,
                userFiles: state.userFiles.map((file) =>
                file.docId === action.payload.docId ? movedfile : file
                ),
            };
        case types.ADD_TO_DELETED_FILES:
            const deletedFile = action.payload;
            deletedFile.data.show = false;
            return{
                ...state,
                userDeletedFiles:[...state.userDeletedFiles,deletedFile]
            }

        case types.RECOVERY_FILE:
            const recoveryFiles = action.payload;
            recoveryFiles.data.show = true;
            const deletedFiles = state.userDeletedFiles.filter(
                (Files) => Files.docId !== action.payload.docId )
            return{
                ...state,
                userFiles: [...state.userFiles,recoveryFiles],
                userDeletedFiles: deletedFiles
            }
        case types.SET_FILE_DATA:
            const { fileId, data } = action.payload;
            const allFiles = state.userFiles;
            const currentFile = allFiles.find((file) => file.docId === fileId);
            currentFile.data.data = data;
            return {
                ...state,
                userFiles: state.userFiles.map((file) =>
                file.docId === fileId ? currentFile : file
                ),
            }; 
        
       default: return state;
    }
};

export default FileReducer;