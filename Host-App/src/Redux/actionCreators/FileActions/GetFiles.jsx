import fire from "../../../config/firebase";
import { addFiles } from "./ActionsFileReducer";




export const gitFiles = (userId) => (dispatch)=>{
    // dispatch(setLoading(true))
    fire.firestore().collection("files").where("userId","==",userId).get().then(
      async (files)=>{
        const fileData = await files.docs.map((file)=>({
          data: file.data(),
          docId: file.id,
        })); 
        console.log(fileData);
        // dispatch(setLoading(false)); 
        dispatch(addFiles(fileData));
      });
  };