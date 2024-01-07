import { toast } from "react-toastify";
import fire from "../../../../config/firebase";
import { addToDeletedFiles, removeFile } from "./ActionsFileReducer";

export const softDeleteFile = (file) => async (dispatch) => {
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
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete the file");
    }
  };