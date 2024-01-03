import fire from "../../../config/firebase";
import { addFolders, setLoading } from "./ActionsFolderReducer";



export const gitFolders = (userId) => (dispatch)=>{
  dispatch(setLoading(true))
  fire.firestore().collection("folders").where("userId","==",userId).get().then(
    async (folders)=>{
      const foldersData = await folders.docs.map((folder)=>({
        data: folder.data(),
        docId: folder.id,
      })); 
      dispatch(setLoading(false)); 
      dispatch(addFolders(foldersData));
    });
};
