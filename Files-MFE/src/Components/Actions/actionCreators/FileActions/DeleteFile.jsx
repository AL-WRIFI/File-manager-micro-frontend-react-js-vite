import { toast } from "react-toastify";
import fire from "../../../../config/firebase";
import { removeFile } from "./ActionsFileReducer";
import { removeFromParentSubFiles } from "../SharedActions/SharedActions";



export const deleteFile = (file) => async (dispatch) => {
    try {
      fire.firestore().collection("files").doc(file.docId).update({
        show :false
      }).then(()=>{
        dispatch(removeFile(file.docId));
      })
      // const { url, thumbnailUrl } = file.data;
     
      // url && await fire.storage().refFromURL(url).delete();
      // thumbnailUrl && await fire.storage().refFromURL(thumbnailUrl).delete();
  
      // await fire.firestore().collection('files').doc(file.docId).delete();
      // await removeFromParentSubFiles(file.docId , file.data.parent);
      // dispatch(removeFile(file.docId));
      toast.success("File Deleted Successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete the file");
    }
  };