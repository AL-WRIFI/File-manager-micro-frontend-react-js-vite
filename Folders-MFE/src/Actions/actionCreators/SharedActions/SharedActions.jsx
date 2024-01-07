import fire from "../../../config/firebase";


export const addToParentSubFiles = async (fileId,parentId) =>{
    if(parentId === "root"){ return ;}
    
    try{
     const foldereRef = fire.firestore().collection("folders").doc(parentId);        
     await foldereRef.update({
      subFiles: fire.firebase.firestore.FieldValue.arrayUnion(fileId),
     }) 
     
    
    }catch(error){
     console.error(" error " ,error);
    }
  }

  export const removeFromParentSubFiles = async (fileId,parentId) =>{
   
    if(parentId === "root"){ return ;}

    try{
     const fileRef = fire.firestore().collection("folders").doc(parentId);
     
     await fileRef.update({
      subFiles: fire.firebase.firestore.FieldValue.arrayRemove(fileId),
     })
  
    }catch(error){
     console.error(" error " ,error);
    }
}  

export const addToParentSubFolders = async (folderId,parentId) =>{
  if(parentId === "root"){ return ;}
  try{
   const folderRef = fire.firestore().collection("folders").doc(parentId);
   await folderRef.update({
     subFolders : fire.firebase.firestore.FieldValue.arrayUnion(folderId),
   })

  }catch(error){
   console.error(error);
  }
}

export const removeFromParentSubFolders = async (folderId ,parentId) =>{
  if(parentId === "root"){ return ;}
  try{
   const folderRef = fire.firestore().collection("folders").doc(parentId);
   await folderRef.update({
     subFolders : fire.firebase.firestore.FieldValue.arrayRemove(folderId),
   })

  }catch(error){
   console.error(error);
  }
}

