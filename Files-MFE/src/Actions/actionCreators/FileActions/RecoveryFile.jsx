import fire from "../../../config/firebase"
import { recoveryFiles } from "./ActionsFileReducer";


export const recoveryFile = (file) =>(dispatch) =>{
    fire.firestore().collection("files").doc(file.docId).update({
        show:true,
    }).then(async ()=>{
       await dispatch(recoveryFiles(file));
    })
}