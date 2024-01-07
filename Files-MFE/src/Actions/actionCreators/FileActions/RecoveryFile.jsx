import fire from "../../../config/firebase"
import { addFile } from "./ActionsFileReducer";


export const recoveryFile = (file) =>(dispatch) =>{
    fire.firestore().collection("files").doc(file.docId).update({
        show:true,
    }).then(async ()=>{
       await dispatch(addFile(file));
    })
}