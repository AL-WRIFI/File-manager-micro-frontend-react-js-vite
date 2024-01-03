import {setChangeFolder} from './FolderAct'



const changeFolders = (folderId) => dispatch =>{
    console.log("yyyyyyyyyyyggggg");
    dispatch(setChangeFolder(folderId));
  };

export default changeFolders;
