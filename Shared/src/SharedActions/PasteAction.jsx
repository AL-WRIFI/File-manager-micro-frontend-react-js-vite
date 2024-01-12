// import React from "react";
// import { useDispatch,useSelector} from "react-redux";
// import { checkAlreadyExists } from "./ChecKAlreadyExists";

// import { MoveFolder , pasetFolder } from "Folders_MFE/actions"; 
// import { MoveFile , pasteFile } from "Files_MFE/actions"; 

// const dispatch = useDispatch();

// const {isLoading,childFolders ,childFiles ,currentFolder ,itemsBuffer ,currentFolderData , selectItemsMode ,actionBuffer} = useSelector((state)=>({
        
//     isLoading : state.Folders.isLoading, 
//     currentFolder : state.Folders.currentFolder,
//     itemsBuffer: state.Buffer.itemsBuffer,
//     actionBuffer: state.Buffer.action,
//     selectItemsMode : state.Buffer.selectItemsMode,
//     currentFolderData : state.Folders.userFolders.find(
//         (folder)=> folder.docId === state.Folders.currentFolder),

//     childFolders : state.Folders.userFolders.filter(
//         (folder)=> (folder.data.parent === state.Folders.currentFolder)),

//     childFiles : state.Files.userFiles.filter(
//         (file)=> (file.data.parent === state.Folders.currentFolder)),     
// }));

// const getTypeActions = (type) => {

//     const actions = type === "folder" ? 
//     {move:MoveFolder , paste:pasetFolder}: 
//     {move:MoveFile , paste:pasteFile};

//     return actions;
// }

// export const pasetAction = () =>{

//     itemsBuffer.map((el)=>{
//         const name = checkAlreadyExists(el.data.name);
//         const docId = el.docId;
//         const parentId = el.data.parent;
//         const path = currentFolder !== "root" ? [...currentFolderData.data.path,currentFolderData.docId]:[];
//         const data = {
//             ...el.data,
//             name : name,
//             path : path,
//             parent : currentFolder,
//         }
//         const actions = getTypeActions(el.data.type);
//         actionBuffer === "cut" ?
//         dispatch(actions.move(docId,data,parentId)):
//         dispatch(actions.paste(docId,data));
        
//     })
//     dispatch(clearBuffer())        
// }  