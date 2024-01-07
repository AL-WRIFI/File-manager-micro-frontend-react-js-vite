import fire from "../../../../config/firebase"
import { renameFile } from "./ActionsFileReducer";


export const RenameFile = (data,docId) =>(dispatch) =>{
    fire.firestore().collection("files").doc(docId).update(data).then(async ()=>{
       await dispatch(renameFile( data.name , docId));
    })
}