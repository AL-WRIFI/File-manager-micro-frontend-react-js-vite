import * as types from "../actionsTypes/FolderActionsType";
import fire from "../../../config/firebase";
import { toast } from "react-toastify";



// FOLDERS
const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});
const addFolders = (payload) => ({
  type: types.ADD_FOLDER,
  payload,
});
const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

export const setChangeFolder=(payload)=>({
  type: types.CHANGE_FOLDER,
  payload,
});

const removeFolder = (folderId) => ({
  type: types.REMOVE_FOLDER,
  payload: folderId,
});
export const copyItemToBuffer = (payload) => ({
  type: types.COPY_ITEM_TOBUFFER,
  payload,
});

const moveFolder = (payload) => ({
  type: types.MOVE_FOLDER,
  payload,
});
// const renameFolder = (payload) => ({
//   type: types.RENAME_FOLDER,
//   payload,
// });

// FOLDERS
export const changeFolder = (folderId) => dispatch =>{
  dispatch(setChangeFolder(folderId));
};

export const createFolder =  (data ,setSuccess) => async (dispatch)=>{
   fire.firestore().collection('folders').add(data).then( async folder=>{
    const folderData = await (await folder.get()).data();
    const folderId = folder.id;
    folderData.parent !== "root" ? addToParentSubFolders(folder.id ,folderData.parent):"";
    dispatch(addFolder({ data:folderData , docId:folderId }));
    toast.success("Created Folder Successfully"+folder.name);
    setSuccess(true);
  }).catch((error)=>{
    console.log(error)
  });
};

export const addToParentSubFolders = async (folderId,parentId) =>{
   try{
    const folderRef = fire.firestore().collection("folders").doc(parentId);
    const folderSnapshot = await folderRef.get();
    const subfoldersArray = await folderSnapshot.get("subFolders") || [];

    await folderRef.update({
      subFolders : [...subfoldersArray , folderId],
    })

   }catch(error){
    console.error(error);
   }
}
const removeFromParentSubFolders = async (folderId,parentId) =>{
  try{
   const folderRef = fire.firestore().collection("folders").doc(parentId);
   const folderSnapshot = await folderRef.get();
   const subfoldersArray = await folderSnapshot.get("subFolders") || [];
   const subFolders = subfoldersArray.filter((folder)=> folder !== folderId)

   await folderRef.update({
     subFolders : subFolders,
   })

  }catch(error){
   console.error(error);
  }
}

export const cutActionFolder = (folderId,data) => async (dispatch) =>{

  try{
    const folderRef = fire.firestore().collection("folders").doc(folderId);
    const folderSnapshot = await folderRef.get();
    const parentId = await folderSnapshot.get("parent");
    console.log(parentId , folderId);
      
    await folderRef.update({
      name: data.name,
      path: data.path,
      parent : data.parent 
    }).then(async ()=>{
      await removeFromParentSubFolders(folderId,parentId);
      await data.parent !== "root" ? addToParentSubFolders(folderId ,data.parent):"";
      await dispatch(moveFolder({ folderId , data }));
      toast.success("Folder moved successfully!");
    }).catch(() => {
      toast.error("Something went wrong!");
    });
  
  }catch(error){
    toast.error(error);
  }
};

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



// export const pasetActionFolder = (docId,data) => async (dispatch) => {
//   const DB = fire.firestore();
//   const sourceFolderId = docId;

//   const copyFolder = async (sourceFolderRef, destinationParentId) => {

//     const batch = DB.batch();
//     try {
//       const sourceSnapshot = await sourceFolderRef.get();
//       const folderData = sourceSnapshot.data();
//       //console.log(folderData);
//       if (sourceSnapshot.exists) {
//         const destinationFolderData = {
//           ...folderData,
//           parent: destinationParentId,
//         };

//         const destinationFolderRef = await DB.collection('folders').add(destinationFolderData);
//         const destinationSnapshot = await destinationFolderRef.get();
//         const destinationData = destinationSnapshot.data();
//         dispatch(addFolder({ data:destinationData , docId:destinationFolderRef.id}));
//         const files = await DB.collection('files').where('parent', '==', sourceFolderRef.id).get();
//         files.forEach(async (file) => {
//          const isImage = file.data().type && file.data().type.startsWith('image');
//           if(isImage){
//           //   const sourceImageUrl = file.data().url; 
//           //   const imageBlob = await fetch(sourceImageUrl).then(response => response.blob());
  
//           //   const storageRef = fire.storage().ref();
//           //   const destinationImagePath = `files/${file.data().userId}/${file.data().name}`;
//           //   const destinationImageRef = storageRef.child(destinationImagePath);
//           //   await destinationImageRef.put(imageBlob);
//             const newFileData = {
//               ...file.data(),
//               // url : await destinationImageRef.getDownloadURL(),
//               parent: destinationFolderRef.id,
//             };
            
//             await DB.collection('files').add(newFileData);
//             const fullData = {
//               data : newFileData,
//               docId : file.id, 
//             }
//             await dispatch(addFile(fullData))
//           }else{
//             const newFileData = {
//               ...file.data(),
//               parent: destinationFolderRef.id,
//             };
            
//             await DB.collection('files').add(newFileData);
//             const fullData = {
//               data : newFileData,
//               docId : file.id, 
//             }
//             await dispatch(addFile(fullData))
//           }
          
          
//         });

//         const subfolders = await DB.collection('folders').where('parent', '==', sourceFolderRef.id).get();
//         subfolders.forEach(async (subfolder) => {
//           await copyFolder(DB.collection('folders').doc(subfolder.id), destinationFolderRef.id);
//         });

        
//         await batch.commit();
//       }
//     } catch (error) {
//       console.error('حدث خطأ أثناء عملية النسخ: ', error.message);
//       throw error;
//     }
//   };

//   const sourceFolderRef = DB.collection('folders').doc(sourceFolderId);

//   try {
//     await copyFolder(sourceFolderRef,data.parent);
//     toast.success("Folder copied successfully!");
//   } catch (error) {
//     console.error('حدث خطأ أثناء عملية النسخ: ', error.message);
//   }
// };






export const deleteFolderAndSubfolders = (folder) => async (dispatch) => {
  const DB = fire.firestore();
  const folderId = folder.docId;
  const deleteFolder = async (folderRef, batch) => {
    try {
      const snapshot = await folderRef.get();
      if (snapshot.exists) {
        const files = await DB.collection('files').where('parent', '==', folderRef.id).get();
        
        files.forEach(async (file) => {
          const isImage = file.data().type.startsWith('image');
          if (isImage) {
            const { url, thumbnailUrl } = file.data();
            url && (await fire.storage().refFromURL(url).delete());
            thumbnailUrl && (await fire.storage().refFromURL(thumbnailUrl).delete());
          }
          await DB.collection('files').doc(file.id).delete();
        });

        const subfolders = await DB.collection('folders').where('parent', '==', folderRef.id).get();
        subfolders.forEach(async (subfolder) => {
          const subfolderRef = DB.collection('folders').doc(subfolder.id);
          const subfolderBatch = DB.batch();
          await deleteFolder(subfolderRef, subfolderBatch);
          await subfolderBatch.commit();
          await dispatch(removeFolder(subfolder.id));
        });

        batch.delete(folderRef);
      }
    } catch (error) {
      console.error('حدث خطأ: ', error.message);
      throw error;
    }
  };

  const folderRef = DB.collection('folders').doc(folderId);
  const mainBatch = DB.batch(); 

  try {
    await deleteFolder(folderRef, mainBatch);
    await mainBatch.commit();
    await dispatch(removeFolder(folderId));
    toast.success("Folder Deleted successfully!");
  } catch (error) {
    console.error('حدث خطأ أثناء حذف المجلد: ', error.message);
  }
};





// export const deleteFolderAndSubfolders =  (folderId) => async (dispatch) => {
//   const DB = fire.firestore();

//   const deleteFolder = async (folderRef, batch) => {
//     try {
//       const snapshot = await folderRef.get();
//       if (snapshot.exists) {

//         const files = await DB.collection('files').where('parent', '==', folderRef.id).get();
//         files.forEach( async (file) => {
//           const isImage = file.data().type.startsWith('image');
//           if(isImage){

//             const { url, thumbnailUrl } = file.data();
//             url && await fire.storage().refFromURL(url).delete();
//             thumbnailUrl && await fire.storage().refFromURL(thumbnailUrl).delete();
            
//           }
//           const fileRef = DB.collection('files').doc(file.id);
//           batch.delete(fileRef);
//         });

//         const subfolders = await DB.collection('folders').where('parent', '==', folderRef.id).get();
//         subfolders.forEach(async (subfolder) => {
//           const subfolderRef = DB.collection('folders').doc(subfolder.id);
//           const subfolderBatch = DB.batch();
//           await deleteFolder(subfolderRef, subfolderBatch);
//           await subfolderBatch.commit();
//           await dispatch(removeFolder(subfolder.id))
//         });

//         batch.delete(folderRef);
//       }
//     } catch (error) {
//       console.error('حدث خطأ: ', error.message);
//       throw error;
//     }
//   };

//   const folderRef = DB.collection('folders').doc(folderId);
//   const mainBatch = DB.batch(); 

//   try {
//     await deleteFolder(folderRef, mainBatch);
//     await mainBatch.commit();
//     await dispatch(removeFolder(folderId));
//   } catch (error) {
//     console.error('حدث خطأ أثناء حذف المجلد والمجلدات الفرعية: ', error.message);
  
//   }
// };


// export const deletefolder = (docId) => async (dispatch) => {

//   const fireStore = fire.firestore();
//   const fireStorage = fire.storage();
//   // const batch = fire.batch();
//   let childFolders;
//   let childFiles;
//   await fire.firestore().collection("folders").where("parent","==",docId).get().then(
//     (folders)=>{
//        childFolders = folders.docs.map((folder)=>({
//         data: folder.data(),
//         docId: folder.id,
//       })); 
//     });

//     await fire.firestore().collection("files").where("parent","==",docId).get().then(
//       (folders)=>{
//         childFiles = folders.docs.map((folder)=>({
//           data: folder.data(),
//           docId: folder.id,
//         })); 
//       });

    
   
      // await fire.firestore().collection('folders').doc(docId).delete();

      // await console.log("childFolders --------",childFolders)
      // await console.log("childFiles --------",childFiles)
      // const deleteChildFolders = (childFolders)=>{
      //   childFolders.map((sub)=>{
      //     deletefolder(sub.docId);
      //     console.log(sub.docId);
      //   }) 
      // }
      
      // childFolders.map(async(sub)=>{
      //      await deletefolder(sub.docId);
      //     console.log(sub.docId);
      //   }) 
      
      // deleteChildFolders(childFolders);
    // const deleteChildFiles = async (childFiles)=>{

    //   childFiles.map()
    // const { url, thumbnailUrl } = file.data;
   
    // url && await fire.storage().refFromURL(url).delete();
    // thumbnailUrl && await fire.storage().refFromURL(thumbnailUrl).delete();

    // await fire.firestore().collection('files').doc(file.docId).delete();

    // dispatch(removeFile(file.docId));
    // }



  // const folderRef = fireStore.collection("folders").doc(folder.docId);

  // const fileRef = fire.collection("files").where("parent","==",folderdocId);
  // const folderSnapshot = await folderRef.get();

  // console.log("---------------------",folderSnapshot);
  // const deleteFile = async (folderdocId) => {
  //   const fileRef = fire.collection("files").where("parent","==",folderdocId);
  //   const fileSnapshot = await fileRef.get();

  //   if (fileSnapshot.exists) {
  //     // Delete the file document from Firestore
  //     batch.delete(fileRef);

  //     const isImage = file.type.startsWith('image');
  //     // Delete the actual file from Firebase Storage
  //     const filePath = isImage ? `images/${fileId}` : `files/${fileId}`;
  //     const fileStorageRef = fireStorage.ref(filePath);
  //     batch.delete(fileStorageRef);

  //     if (isImage) {
  //       const thumbnailPath = `thumbnails/${fileId}`;
  //       const thumbnailStorageRef = fireStorage.ref(thumbnailPath);
  //       batch.delete(thumbnailStorageRef);
  //     }
  //   }
  //   };

  // const deleteFolder = async (folderRef) => {
  //   const snapshot = await folderRef.get();

  //   if (snapshot.exists) {
  //     batch.delete(folderRef);

  //     const files = snapshot.data().files || [];
  //     const subfolders = snapshot.data().subfolders || [];

  //     // Delete files in the folder
  //     files.forEach(async (fileId) => {
  //       await deleteFile(fileId, false);
  //     });

  //     // Delete subfolders and their content
  //     subfolders.forEach(async (subfolderId) => {
  //       const subfolderRef = fireStore.collection('folder_collection').doc(subfolderId);
  //       await deleteFolder(subfolderRef);
  //     });
  //   }
  //    };

  // const folderRef = fireStore.collection("folders").doc(folder.docId);
  // await deleteFolder(folderRef);

  // return batch.commit();

// };


