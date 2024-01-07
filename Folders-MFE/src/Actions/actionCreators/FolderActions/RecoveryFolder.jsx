import fire from "../../../config/firebase"
import { addFolder } from "./ActionsFolderReducer";

export const recoveryFolder = (folder) =>(dispatch) =>{
    fire.firestore().collection("folders").doc(folder.docId).update({
        show:true,
    }).then(async ()=>{
       await dispatch(addFolder(folder));
    })
}