import { toast } from "react-toastify";
import fire from "../../../../config/firebase";
import { moveFile } from "./ActionsFileReducer";
import { addToParentSubFiles, removeFromParentSubFiles } from "../SharedActions/SharedActions";



export const MoveFile = (docId,data,oldParentId) => (dispatch)=>{
  fire.firestore().collection("files").doc(docId).update({
    name: data.name,
    path: data.path,
    parent : data.parent    
  }).then(() => {
    addToParentSubFiles(docId ,data.parent);
    removeFromParentSubFiles(docId , oldParentId);
    dispatch(moveFile({ docId , data }));
    toast.success("File moved successfully!");
  }).catch(() => {
    toast.error("Something went wrong!");
  });
}