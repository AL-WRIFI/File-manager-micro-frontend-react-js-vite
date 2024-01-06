import { toast } from "react-toastify";
import fire from "../../../../config/firebase";
import { addToDeletedFiles, removeFile } from "./ActionsFileReducer";
import { removeFromParentSubFiles } from "../SharedActions/SharedActions";






export const deleteFile = (file) => async (dispatch) => {
    try {

    const DB = fire.firestore();
    const fileId = file.docId;
    DB.collection("files").doc(fileId).update({
      show:false,
    }).then(() =>{
       dispatch(removeFile(fileId));
       dispatch(addToDeletedFiles(file))
      toast.success('File Deleted successfully!');
    }).catch(()=>{
      toast.error('File Deleted Erorr!');
      
    })
      // const { url, thumbnailUrl } = file.data;
     
      // url && await fire.storage().refFromURL(url).delete();
      // thumbnailUrl && await fire.storage().refFromURL(thumbnailUrl).delete();
  
      // await fire.firestore().collection('files').doc(file.docId).delete();
      // await removeFromParentSubFiles(file.docId , file.data.parent);
      // dispatch(removeFile(file.docId));
      // toast.success("File Deleted Successfully");

    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete the file");
    }
  };