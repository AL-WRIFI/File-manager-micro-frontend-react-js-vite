import { toast } from "react-toastify";
import fire from "../../../config/firebase";
import { addToParentSubFolders, removeFromParentSubFolders } from "../SharedActions/SharedActions";
import { moveFolder } from "./ActionsFolderReducer";



export const MoveFolder = (folderId,data,oldParentId) => async (dispatch) =>{
  try{
    const folderRef = fire.firestore().collection("folders").doc(folderId);  
    await folderRef.update({
      name: data.name,
      path: data.path,
      parent : data.parent 
    }).then(async ()=>{
      addToParentSubFolders(folderId ,data.parent);
      removeFromParentSubFolders(folderId,oldParentId);
      await dispatch(moveFolder({ folderId , data }));
      toast.success("Folder moved successfully!");
    }).catch(() => {
      toast.error("Something went wrong!");
    });
  
  }catch(error){
    toast.error(error);
  }
};