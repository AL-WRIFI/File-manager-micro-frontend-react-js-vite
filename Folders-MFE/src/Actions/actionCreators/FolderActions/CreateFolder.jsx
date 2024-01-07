import { addToParentSubFolders } from "Shared/SharedActions"
import fire from "../../../config/firebase";
import { addFolder } from "./ActionsFolderReducer";


export const createFolder =  (data) => async (dispatch)=>{
  
  const newfolder = await fire.firestore().collection('folders').add(data);
     
    addToParentSubFolders(newfolder.id,data.parent);
    await dispatch(addFolder({ data:data , docId:newfolder.id}));

  return newfolder;
};


export default createFolder;