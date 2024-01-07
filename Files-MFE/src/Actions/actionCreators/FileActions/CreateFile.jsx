import fire from "../../../config/firebase";
import { addFile } from "./ActionsFileReducer";
import {addToParentSubFiles} from "../SharedActions/SharedActions"



export const createFile = (data) =>(dispatch)=>{
    
    fire.firestore().collection('files').add(data).then( async file =>{
      const fileData = await (await file.get()).data();
      const fileId = file.id;
      await addToParentSubFiles(file.id ,fileData.parent);
      dispatch(addFile({ data:fileData , docId:fileId }));
    }).catch(()=>{
       console.log("Error");
    });
  };

