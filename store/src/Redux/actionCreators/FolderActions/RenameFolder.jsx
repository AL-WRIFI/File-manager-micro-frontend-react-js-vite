import fire from "../../../config/firebase"
import { renameFolder } from "./ActionsFolderReducer";


export const RenameFolder = (data,docId) =>(dispatch) =>{
    fire.firestore().collection("folders").doc(docId).update(data).then(async ()=>{
       await dispatch(renameFolder( data.name , docId));
    })
}