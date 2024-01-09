import { toast } from "react-toastify";
import fire from "../../../config/firebase";
import { addToDeletedFolders, removeFolder } from "./ActionsFolderReducer";


export const softDeleteFolder = (folder) => async (dispatch) => {
 
  const DB = fire.firestore();
  const folderId = folder.docId; 
    DB.collection("folders").doc(folderId).update({ show:false })
    .then(()=>{
        dispatch(removeFolder(folderId));
        dispatch(addToDeletedFolders(folder))
        toast.success('Folder Deleted successfully!');
     })



  // const deleteFolder = async (folderRef, batch) => {
  //   try {
  //     const snapshot = await folderRef.get();
  //     if (snapshot.exists) {
        
  //       const subFiles = await snapshot.data().subFiles || [];
       
  //       subFiles.forEach(async (file) => {
  //         await DB.collection('files').doc(file).delete();
  //       });
  
        
  //       const subfoldersArray = snapshot.data().subFolders || [];
        
  //       subfoldersArray.forEach(async (subfolderId) => {
  //         const subfolderRef = DB.collection('folders').doc(subfolderId);
  //         const subfolderBatch = DB.batch();
  //         await deleteFolder(subfolderRef, subfolderBatch);
  //         await subfolderBatch.commit();
  //         await dispatch(removeFolder(subfolderId));
  //       });

  //       batch.delete(folderRef);
  //     }
  //   } catch (error) {
  //     console.error('حدث خطأ: ', error.message);
  //     throw error;
  //   }
  // };

  // const folderRef = DB.collection('folders').doc(folderId);
  // const mainBatch = DB.batch();

  // try {
  //   await deleteFolder(folderRef, mainBatch);
  //   await mainBatch.commit();
  //   await removeFromParentSubFolders(folderId ,folder.data.parent)
  //   await dispatch(removeFolder(folderId));
  //   toast.success('Folder Deleted successfully!');
  // } catch (error) {
  //   console.error('حدث خطأ أثناء حذف المجلد: ', error.message);
  // }
};


//  export const deleteFolderAndSubfolders = async (folderId) => {
//   try {
//     const DB = fire.firestore();
//     const folderRef = DB.collection('folders').doc(folderId);

//     const subfoldersSnapshot = await folderRef.collection('subFolders').get();

//     subfoldersSnapshot.forEach(async (subfolderDoc) => {
//       const subfolderId = subfolderDoc.id;
//       await deleteFolderAndSubfolders(subfolderId);
//     });

//     const filesSnapshot = await folderRef.collection('subFiles').get();

    
//     filesSnapshot.forEach(async (fileDoc) => {
//       const fileId = fileDoc.id;
//       await fileDoc.ref.delete();
//     });

//     const parentData = (await folderRef.get()).data();
//     if (parentData) {
//       const updatedSubFolders = parentData.subFolders.filter((subFolder) => subFolder !== folderId);
//       await folderRef.update({
//         subFolders: updatedSubFolders,
//       });
//     }

//     await folderRef.delete();

//     console.log(`Folder ${folderId} and its subfolders/files deleted successfully.`);
//   } catch (error) {
//     console.error('Error deleting folder and subfolders/files:', error.message);
//   }
// };





